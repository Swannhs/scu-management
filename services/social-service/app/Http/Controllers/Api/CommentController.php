<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index($postId)
    {
        $comments = Comment::where('post_id', $postId)
            ->with('author')
            ->orderBy('created_at', 'asc')
            ->paginate(50);

        return response()->json($comments);
    }

    public function store(Request $request, $postId)
    {
        $userId = $request->header('X-User-Id');
        $tenantId = $request->header('X-Tenant-Id');

        $validated = $request->validate([
            'content' => 'required|string|max:1000',
            'parent_comment_id' => 'nullable|exists:comments,_id'
        ]);

        $post = Post::findOrFail($postId); // Ensure post exists

        $comment = Comment::create([
            'post_id' => $postId,
            'user_id' => $userId,
            'tenant_id' => $tenantId,
            'content' => $validated['content'],
            'parent_comment_id' => $validated['parent_comment_id'] ?? null,
            'reactions' => []
        ]);

        // Increment total comment count on the post
        $post->increment('comments_count');

        // Feature: Embed recent comments (up to 3) directly on the post
        $recentComments = $post->recent_comments ?? [];

        // Push the new comment formatting
        array_unshift($recentComments, [
            '_id' => (string) $comment->id,
            'user_id' => $userId,
            'content' => $validated['content'],
            'created_at' => now()->toISOString()
        ]);

        // Keep only the latest 3
        if (count($recentComments) > 3) {
            array_pop($recentComments);
        }

        $post->update(['recent_comments' => $recentComments]);

        return response()->json($comment, 201);
    }

    public function destroy(Request $request, $id)
    {
        $userId = $request->header('X-User-Id');
        $comment = Comment::findOrFail($id);

        if ($comment->user_id !== $userId) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $postId = $comment->post_id;
        $comment->delete();

        // Decrement post
        $post = Post::find($postId);
        if ($post) {
            $post->decrement('comments_count');

            // Re-sync recent comments completely
            $recent = Comment::where('post_id', $postId)
                ->latest()
                ->take(3)
                ->get()
                ->map(fn($c) => [
                    '_id' => (string) $c->id,
                    'user_id' => $c->user_id,
                    'content' => $c->content,
                    'created_at' => $c->created_at->toISOString()
                ])->toArray();

            $post->update(['recent_comments' => $recent]);
        }

        return response()->json(['message' => 'Comment deleted']);
    }
}
