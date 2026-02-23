<?php

namespace App\Services;

use App\Repositories\Interfaces\FriendshipRepositoryInterface;
use Illuminate\Validation\ValidationException;

class FriendshipService
{
    protected $friendshipRepository;
    protected $notificationService;

    public function __construct(
        FriendshipRepositoryInterface $friendshipRepository,
        NotificationService $notificationService
    ) {
        $this->friendshipRepository = $friendshipRepository;
        $this->notificationService = $notificationService;
    }

    public function sendRequest(string $userId, string $friendId)
    {
        $friendship = $this->friendshipRepository->createOrUpdateStatus($userId, $friendId, 'pending');

        if ($friendship->wasRecentlyCreated) {
            $this->notificationService->sendNotification([
                'type' => 'friend_request',
                'from_user_id' => $userId,
                'to_user_id' => $friendId
            ]);
        }

        return $friendship;
    }

    public function acceptRequest(string $userId, string $friendshipId)
    {
        $friendship = $this->friendshipRepository->findById($friendshipId);

        if ($friendship->friend_id !== $userId && $friendship->user_id !== $userId) {
            throw ValidationException::withMessages(['error' => 'Unauthorized']);
        }

        // Update original to accepted
        $this->friendshipRepository->updateStatus($friendshipId, 'accepted');

        // Create reverse connection for 2-way graph lookups
        $this->friendshipRepository->createOrUpdateStatus($friendship->friend_id, $friendship->user_id, 'accepted');

        return $friendship;
    }

    public function declineRequest(string $userId, string $friendshipId)
    {
        $friendship = $this->friendshipRepository->findById($friendshipId);

        if ($friendship->friend_id !== $userId) {
            throw ValidationException::withMessages(['error' => 'Unauthorized']);
        }

        $this->friendshipRepository->updateStatus($friendshipId, 'declined');
    }

    public function unfriend(string $userId, string $friendId)
    {
        $this->friendshipRepository->delete($userId, $friendId);
        $this->friendshipRepository->delete($friendId, $userId);
    }

    public function blockUser(string $userId, string $userIdToBlock)
    {
        $this->friendshipRepository->createOrUpdateStatus($userId, $userIdToBlock, 'blocked');
        $this->friendshipRepository->delete($userIdToBlock, $userId);
    }

    public function getPendingRequests(string $userId)
    {
        return $this->friendshipRepository->getPendingRequests($userId);
    }
}
