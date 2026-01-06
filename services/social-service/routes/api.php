<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\FriendshipController;
use App\Http\Controllers\Api\MessageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    // Posts
    Route::get('/posts', [PostController::class, 'index']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::get('/posts/{id}', [PostController::class, 'show']);

    // Friendships
    Route::post('/friend-request', [FriendshipController::class, 'store']);
    Route::put('/friendships/{id}/accept', [FriendshipController::class, 'accept']);

    // Messages
    Route::get('/conversations/{id}/messages', [MessageController::class, 'index']);
    Route::post('/conversations/{id}/messages', [MessageController::class, 'store']);
});
