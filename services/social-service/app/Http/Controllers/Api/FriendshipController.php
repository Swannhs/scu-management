<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Friendship;
use App\Services\NotificationService;
use Illuminate\Http\Request;

class FriendshipController extends Controller
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function store(Request $request)
    {
        $userId = $request->header('X-User-Id');

        $validated = $request->validate([
            'friend_id' => 'required|exists:social_profiles,id'
        ]);

        $friendship = Friendship::firstOrCreate([
            'user_id' => $userId,
            'friend_id' => $validated['friend_id']
        ], ['status' => 'pending']);

        // Notify friend
        if ($friendship->wasRecentlyCreated) {
            $this->notificationService->sendNotification([
                'type' => 'friend_request',
                'from_user_id' => $userId,
                'to_user_id' => $validated['friend_id']
            ]);
        }

        return response()->json($friendship);
    }

    public function accept($id)
    {
        $friendship = Friendship::findOrFail($id);
        $friendship->update(['status' => 'accepted']);

        // Create reverse record for 2-way
        Friendship::firstOrCreate([
            'user_id' => $friendship->friend_id,
            'friend_id' => $friendship->user_id
        ], ['status' => 'accepted']);

        return response()->json(['message' => 'Friendship accepted']);
    }
}
