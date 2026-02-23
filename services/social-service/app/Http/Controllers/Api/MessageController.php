<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Events\MessageSent; // Will create this event

class MessageController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->header('X-User-Id');

        $conversations = Conversation::where('participants', $userId)
            ->with([
                'messages' => function ($query) {
                    $query->latest()->take(1); // Latest message snippet
                }
            ])
            ->orderBy('updated_at', 'desc')
            ->paginate(20);

        return response()->json($conversations);
    }

    public function createConversation(Request $request)
    {
        $userId = $request->header('X-User-Id');

        $validated = $request->validate([
            'participants' => 'required|array',
            'participants.*' => 'exists:social_profiles,id',
            'type' => 'required|in:direct,group',
            'name' => 'nullable|string'
        ]);

        $participants = array_unique(array_merge([$userId], $validated['participants']));

        // Check if direct conversation already exists
        if ($validated['type'] === 'direct' && count($participants) === 2) {
            $existing = Conversation::where('type', 'direct')
                ->where('participants', 'all', $participants) // MongoDB specific all check, simpler way:
                ->whereIn('participants', [$participants[0]])
                ->whereIn('participants', [$participants[1]])
                ->first();

            if ($existing)
                return response()->json($existing);
        }

        $conversation = Conversation::create([
            'type' => $validated['type'],
            'name' => $validated['name'] ?? null,
            'participants' => $participants
        ]);

        return response()->json($conversation, 201);
    }

    public function showMessages(Request $request, $conversationId)
    {
        $userId = $request->header('X-User-Id');

        // Security
        $conversation = Conversation::findOrFail($conversationId);
        if (!in_array($userId, $conversation->participants)) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $messages = Message::where('conversation_id', $conversationId)
            ->with('sender')
            ->orderBy('created_at', 'desc') // we paginate backwards usually
            ->paginate(50);

        return response()->json($messages);
    }

    public function store(Request $request, $conversationId)
    {
        $userId = $request->header('X-User-Id');
        $conversation = Conversation::findOrFail($conversationId);

        if (!in_array($userId, $conversation->participants)) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'content' => 'required|string',
            'media_urls' => 'nullable|array'
        ]);

        $message = Message::create([
            'conversation_id' => $conversationId,
            'sender_id' => $userId,
            'content' => $validated['content'],
            'media_urls' => $validated['media_urls'] ?? [],
            'read_by' => [$userId] // author has read it
        ]);

        $conversation->update(['updated_at' => now()]);

        // Broadcast to WebSocket (if Reverb/Pusher is configured)
        // broadcast(new MessageSent($message))->toOthers();

        return response()->json($message, 201);
    }

    public function markAsRead(Request $request, $messageId)
    {
        $userId = $request->header('X-User-Id');

        $message = Message::findOrFail($messageId);
        $readBy = $message->read_by ?? [];

        if (!in_array($userId, $readBy)) {
            $readBy[] = $userId;
            $message->update(['read_by' => $readBy]);
        }

        return response()->json(['message' => 'Marked as read']);
    }
}
