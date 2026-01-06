<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Events\MessageSent; // Will create this event

class MessageController extends Controller
{
    public function index(Request $request, $conversationId)
    {
        return Message::where('conversation_id', $conversationId)
            ->with('sender')
            ->latest()
            ->paginate(50);
    }

    public function store(Request $request, $conversationId)
    {
        $userId = $request->header('X-User-Id');

        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        $message = Message::create([
            'conversation_id' => $conversationId,
            'sender_id' => $userId,
            'content' => $validated['content']
        ]);

        // Broadcast to WebSocket
        broadcast(new MessageSent($message))->toOthers();

        return response()->json($message, 201);
    }
}
