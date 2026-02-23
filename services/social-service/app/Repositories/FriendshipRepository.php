<?php

namespace App\Repositories;

use App\Models\Friendship;
use App\Repositories\Interfaces\FriendshipRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class FriendshipRepository implements FriendshipRepositoryInterface
{
    public function getPendingRequests(string $userId): Collection
    {
        return Friendship::where('friend_id', $userId)
            ->where('status', 'pending')
            ->get();
    }

    public function findById(string $id)
    {
        return Friendship::findOrFail($id);
    }

    public function createOrUpdateStatus(string $userId, string $friendId, string $status)
    {
        return Friendship::updateOrCreate(
            ['user_id' => $userId, 'friend_id' => $friendId],
            ['status' => $status]
        );
    }

    public function updateStatus(string $id, string $status)
    {
        return Friendship::where('_id', $id)->update(['status' => $status]);
    }

    public function delete(string $userId, string $friendId): bool
    {
        $deleted = Friendship::where('user_id', $userId)->where('friend_id', $friendId)->delete();
        return $deleted > 0;
    }
}
