<?php

namespace App\Services;

use App\Models\Post;
use App\Models\SocialProfile;

class PostService
{
    /**
     * Get the multi-tenant aggregated feed for a user.
     */
    public function getFeedForUser(SocialProfile $user, int $perPage = 20)
    {
        $friendIds = $user->friends()->pluck('social_profiles.id')->toArray();
        $groupIds = $user->groups()->pluck('groups.id')->toArray();

        return Post::with(['author'])
            ->where('tenant_id', $user->tenant_id)
            ->where(function ($query) use ($user, $friendIds, $groupIds) {
                // 1. My posts
                $query->where('user_id', $user->id)

                    // 2. Public posts
                    ->orWhere(function ($q) {
                    $q->where('visibility', 'public')
                        ->whereNull('group_id');
                })

                    // 3. Friend visible posts
                    ->orWhere(function ($q) use ($friendIds) {
                    $q->whereIn('user_id', $friendIds)
                        ->where('visibility', 'friends');
                })

                    // 4. Group posts
                    ->orWhere(function ($q) use ($groupIds) {
                    $q->whereIn('group_id', $groupIds);
                });
            })
            ->latest()
            ->paginate($perPage);
    }

    /**
     * Store a new post safely.
     */
    public function createPost(SocialProfile $user, array $data): Post
    {
        // Force visibility if posting to a group
        if (!empty($data['group_id'])) {
            $data['visibility'] = 'group';
        }

        return Post::create([
            'user_id' => $user->id,
            'tenant_id' => $user->tenant_id,
            ...$data
        ]);
    }
}
