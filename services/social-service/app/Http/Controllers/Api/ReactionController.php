<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class ReactionController extends Controller
{
    public function react(Request $request, $postId)
    {
        $userId = $request->header('X-User-Id');

        $validated = $request->validate([
            'type' => 'required|in:like,love,haha,sad,angry,wow'
        ]);

        $post = Post::findOrFail($postId);

        $reactions = $post->reactions ?? [];
        $existingIndex = collect($reactions)->search(fn($r) => $r['user_id'] === $userId);

        if ($existingIndex !== false) {
            // Already reacted: toggle off if same type, else change type
            if ($reactions[$existingIndex]['type'] === $validated['type']) {
                unset($reactions[$existingIndex]);
            } else {
                $reactions[$existingIndex]['type'] = $validated['type'];
            }
            $reactions = array_values($reactions); // Re-index array
        } else {
            // Add new reaction
            $reactions[] = [
                'user_id' => $userId,
                'type' => $validated['type']
            ];
        }

        $post->update(['reactions' => $reactions]);

        return response()->json([
            'message' => 'Reaction updated',
            'reactions' => $reactions
        ]);
    }
}
