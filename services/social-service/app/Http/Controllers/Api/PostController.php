<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\SocialProfile;
use App\Services\NotificationService;
use Illuminate\Http\Request;

class PostController extends Controller
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function index(Request $request)
    {
        $userId = $request->header('X-User-Id');

        $user = SocialProfile::find($userId);
        if (!$user) {
            return response()->json(['error' => 'User profile not found'], 404);
        }

        // Get IDs for feed construction
        $friendIds = $user->friends()->pluck('social_profiles.id')->toArray();
        $groupIds = $user->groups()->pluck('groups.id')->toArray();

        $posts = Post::with(['author', 'comments', 'likes'])
            ->where('tenant_id', $user->tenant_id) // Strict Multi-tenancy
            ->where(function($query) use ($userId, $friendIds, $groupIds) {
                // 1. My posts
                $query->where('user_id', $userId)

                // 2. Public posts in my tenant
                ->orWhere(function($q) {
                    $q->where('visibility', 'public')
                      ->whereNull('group_id'); // Public timeline posts
                })

                // 3. Friend posts (friends visibility)
                ->orWhere(function($q) use ($friendIds) {
                    $q->whereIn('user_id', $friendIds)
                      ->where('visibility', 'friends');
                })

                // 4. Group posts (from my groups)
                ->orWhere(function($q) use ($groupIds) {
                    $q->whereIn('group_id', $groupIds);
                });
            })
            ->latest()
            ->paginate(20);

        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $userId = $request->header('X-User-Id');

        $user = SocialProfile::find($userId);
        if (!$user) {
            return response()->json(['error' => 'User profile not found'], 404);
        }

        $validated = $request->validate([
            'content' => 'required|string',
            'group_id' => 'nullable|exists:groups,id',
            'media_urls' => 'nullable|array',
            'visibility' => 'in:public,friends,group'
        ]);

        // If posting to a group, ensure user is a member
        if (!empty($validated['group_id'])) {
             // Logic to check membership could be added here
             $validated['visibility'] = 'group'; // Force visibility
        }

        $post = Post::create([
            'user_id' => $userId,
            'tenant_id' => $user->tenant_id,
            ...$validated
        ]);

        // Dispatch Event for Notification
        $this->notificationService->sendNotification([
            'type' => 'post_created',
            'user_id' => $userId,
            'post_id' => $post->id,
            'tenant_id' => $user->tenant_id
        ]);

        return response()->json($post, 201);
    }

    public function show($id)
    {
        // Should also check tenant_id matches current user
        return Post::with(['comments.author', 'likes'])->findOrFail($id);
    }
}
