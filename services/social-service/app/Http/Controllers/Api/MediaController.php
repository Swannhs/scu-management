<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function upload(Request $request)
    {
        $userId = $request->header('X-User-Id');
        $tenantId = $request->header('X-Tenant-Id');

        $request->validate([
            'files' => 'required|array|max:5',
            'files.*' => 'image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max
        ]);

        $urls = [];

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                // Determine folder path structure inside logical storage bucket
                $path = "tenants/{$tenantId}/users/{$userId}/media";

                // You can adapt this 's3' or 'public' based on the filesystem disk config
                $filePath = $file->store($path, 'public');

                // Using standard Storage URL generator. Modify if custom CDN is used
                $urls[] = asset("storage/{$filePath}");
            }
        }

        return response()->json([
            'message' => 'Files uploaded successfully',
            'urls' => $urls
        ], 201);
    }
}
