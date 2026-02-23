<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\StorePostRequest;
use App\Http\Requests\Post\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\SocialProfile;
use App\Services\NotificationService;
use App\Services\PostService;
use Illuminate\Http\Request;

class PostController extends Controller
{
    protected $notificationService;
    protected $postService;

    public function __construct(
        NotificationService $notificationService,
        PostService $postService
    ) {
        $this->notificationService = $notificationService;
        $this->postService = $postService;
    }

    public function index(Request $request)
    {
        $userId = $request->header('X-User-Id');

        $user = SocialProfile::find($userId);
        if (!$user) {
            return response()->json(['error' => 'User profile not found'], 404);
        }

        $posts = $this->postService->getFeedForUser($user);

        return PostResource::collection($posts);
    }

    public function store(StorePostRequest $request)
    {
        $userId = $request->header('X-User-Id');

        $user = SocialProfile::find($userId);
        if (!$user) {
            return response()->json(['error' => 'User profile not found'], 404);
        }

        $post = $this->postService->createPost($user, $request->validated());

        // Dispatch Event for Notification
        $this->notificationService->sendNotification([
            'type' => 'post_created',
            'user_id' => $userId,
            'post_id' => $post->id,
            'tenant_id' => $user->tenant_id
        ]);

        return new PostResource($post);
    }

    public function show(Request $request, $id)
    {
        $tenantId = $request->header('X-Tenant-Id');

        $post = Post::with(['author'])->findOrFail($id);

        if ($post->tenant_id !== $tenantId) {
            return response()->json(['error' => 'Not found'], 404);
        }

        return new PostResource($post);
    }

    public function update(UpdatePostRequest $request, $id)
    {
        $userId = $request->header('X-User-Id');

        $post = Post::findOrFail($id);

        if ($post->user_id !== $userId) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $post->update($request->validated());

        return new PostResource($post);
    }

    public function destroy(Request $request, $id)
    {
        $userId = $request->header('X-User-Id');

        $post = Post::findOrFail($id);

        if ($post->user_id !== $userId) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }
}
