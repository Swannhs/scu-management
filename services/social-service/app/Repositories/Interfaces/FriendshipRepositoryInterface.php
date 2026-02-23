<?php

namespace App\Repositories\Interfaces;

use Illuminate\Database\Eloquent\Collection;

interface FriendshipRepositoryInterface
{
    public function getPendingRequests(string $userId): Collection;
    public function findById(string $id);
    public function createOrUpdateStatus(string $userId, string $friendId, string $status);
    public function updateStatus(string $id, string $status);
    public function delete(string $userId, string $friendId): bool;
}
