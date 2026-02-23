<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SocialProfile;
use App\Models\Post;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(Request $request, $id)
    {
        $viewerId = $request->header('X-User-Id');
        $tenantId = $request->header('X-Tenant-Id');

        $profile = SocialProfile::where('id', $id)
            ->where('tenant_id', $tenantId)
            ->firstOrFail();

        // Check if viewing self
        if ($viewerId === $id) {
            $profile->is_friend = false;
        } else {
            // Check friendship status
            $viewer = SocialProfile::find($viewerId);
            $profile->is_friend = $viewer ? $viewer->friends()->where('friend_id', $id)->exists() : false;
        }

        return response()->json($profile);
    }

    public function update(Request $request)
    {
        $userId = $request->header('X-User-Id');

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'bio' => 'sometimes|string|max:500',
            'avatar_url' => 'sometimes|url',
            'cover_url' => 'sometimes|url',
            'privacy_settings' => 'sometimes|array'
        ]);

        $profile = SocialProfile::where('id', $userId)->first();

        if (!$profile) {
            return response()->json(['error' => 'Profile not found'], 404);
        }

        $profile->update($validated);

        return response()->json($profile);
    }
}
