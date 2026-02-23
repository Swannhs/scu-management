<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function store(Request $request)
    {
        $userId = $request->header('X-User-Id');
        $tenantId = $request->header('X-Tenant-Id');

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'privacy_level' => 'required|in:public,private,secret'
        ]);

        $group = Group::create([
            'tenant_id' => $tenantId,
            'title' => $validated['title'],
            'description' => $validated['description'],
            'privacy_level' => $validated['privacy_level'],
        ]);

        // Add creator as admin
        $group->members()->attach($userId, ['role' => 'admin', 'joined_at' => now()]);

        return response()->json($group, 201);
    }

    public function join(Request $request, $id)
    {
        $userId = $request->header('X-User-Id');
        $group = Group::findOrFail($id);

        if ($group->privacy_level === 'secret') {
            return response()->json(['error' => 'Group not found'], 404);
        }

        $role = $group->privacy_level === 'public' ? 'member' : 'pending';

        // Use syncWithoutDetaching or a raw MongoDB push to avoid duplicates
        $group->members()->syncWithoutDetaching([
            $userId => ['role' => $role, 'joined_at' => now()]
        ]);

        return response()->json(['message' => 'Join request processed', 'status' => $role]);
    }

    public function index(Request $request)
    {
        $tenantId = $request->header('X-Tenant-Id');

        $groups = Group::where('tenant_id', $tenantId)
            ->whereIn('privacy_level', ['public', 'private'])
            ->paginate(20);

        return response()->json($groups);
    }

    public function show(Request $request, $id)
    {
        $tenantId = $request->header('X-Tenant-Id');
        $userId = $request->header('X-User-Id');

        $group = Group::with('members')->findOrFail($id);

        if ($group->tenant_id !== $tenantId) {
            return response()->json(['error' => 'Not found'], 404);
        }

        if ($group->privacy_level === 'secret') {
            $isMember = $group->members()->where('user_id', $userId)->exists();
            if (!$isMember) {
                return response()->json(['error' => 'Group not found'], 404);
            }
        }

        return response()->json($group);
    }

    public function pending(Request $request, $id)
    {
        $adminId = $request->header('X-User-Id');
        $group = Group::findOrFail($id);

        $isAdmin = $group->members()->where('user_id', $adminId)->whereIn('role', ['admin', 'moderator'])->exists();
        if (!$isAdmin) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $pendingMembers = $group->members()->wherePivot('role', 'pending')->get();

        return response()->json($pendingMembers);
    }

    public function approve(Request $request, $id, $userIdToApprove)
    {
        $adminId = $request->header('X-User-Id');
        $group = Group::findOrFail($id);

        // Verify admin
        $isAdmin = $group->members()->where('user_id', $adminId)->whereIn('role', ['admin', 'moderator'])->exists();
        if (!$isAdmin) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $group->members()->updateExistingPivot($userIdToApprove, ['role' => 'member']);

        return response()->json(['message' => 'User approved']);
    }

    public function role(Request $request, $id, $userIdToUpdate)
    {
        $adminId = $request->header('X-User-Id');
        $group = Group::findOrFail($id);

        $validated = $request->validate([
            'role' => 'required|in:admin,moderator,member'
        ]);

        $isAdmin = $group->members()->where('user_id', $adminId)->where('role', 'admin')->exists();
        if (!$isAdmin) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $group->members()->updateExistingPivot($userIdToUpdate, ['role' => $validated['role']]);

        return response()->json(['message' => 'User role updated']);
    }

    public function leave(Request $request, $id, $userIdToLeave)
    {
        $userId = $request->header('X-User-Id');
        $group = Group::findOrFail($id);

        // Allow user to leave themselves or allow admin to kick
        if ($userId !== $userIdToLeave) {
            $isAdmin = $group->members()->where('user_id', $userId)->whereIn('role', ['admin', 'moderator'])->exists();
            if (!$isAdmin) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }
        }

        $group->members()->detach($userIdToLeave);

        return response()->json(['message' => 'Member removed']);
    }
}
