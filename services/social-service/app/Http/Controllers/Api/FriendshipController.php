<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Friendship\StoreFriendRequest;
use App\Http\Resources\Friendship\FriendshipResource;
use App\Services\FriendshipService;
use Illuminate\Http\Request;

class FriendshipController extends Controller
{
    protected $friendshipService;

    public function __construct(FriendshipService $friendshipService)
    {
        $this->friendshipService = $friendshipService;
    }

    public function store(StoreFriendRequest $request)
    {
        $userId = $request->header('X-User-Id');

        $friendship = $this->friendshipService->sendRequest(
            $userId,
            $request->validated('friend_id')
        );

        return new FriendshipResource($friendship);
    }

    public function accept(Request $request, $id)
    {
        $userId = $request->header('X-User-Id');

        $this->friendshipService->acceptRequest($userId, $id);

        return response()->json(['message' => 'Friendship accepted']);
    }

    public function pending(Request $request)
    {
        $userId = $request->header('X-User-Id');

        $requests = $this->friendshipService->getPendingRequests($userId);

        return FriendshipResource::collection($requests);
    }

    public function decline(Request $request, $id)
    {
        $userId = $request->header('X-User-Id');

        $this->friendshipService->declineRequest($userId, $id);

        return response()->json(['message' => 'Request declined']);
    }

    public function destroy(Request $request, $friendId)
    {
        $userId = $request->header('X-User-Id');

        $this->friendshipService->unfriend($userId, $friendId);

        return response()->json(['message' => 'Friendship removed']);
    }

    public function block(Request $request, $userIdToBlock)
    {
        $userId = $request->header('X-User-Id');

        $this->friendshipService->blockUser($userId, $userIdToBlock);

        return response()->json(['message' => 'User blocked successfully']);
    }
}
