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
    // Profiles
    Route::get('/profiles/{id}', [\App\Http\Controllers\Api\ProfileController::class, 'show']);
    Route::put('/profiles/me', [\App\Http\Controllers\Api\ProfileController::class, 'update']);

    // Friendships
    Route::post('/friends/request', [FriendshipController::class, 'store']);
    Route::get('/friends/requests/pending', [FriendshipController::class, 'pending']);
    Route::put('/friends/requests/{id}/accept', [FriendshipController::class, 'accept']);
    Route::put('/friends/requests/{id}/decline', [FriendshipController::class, 'decline']);
    Route::delete('/friends/{id}', [FriendshipController::class, 'destroy']);
    Route::post('/friends/{id}/block', [FriendshipController::class, 'block']);

    // Posts
    Route::get('/feed', [PostController::class, 'index']); // Global feed
    Route::post('/posts', [PostController::class, 'store']);
    Route::get('/posts/{id}', [PostController::class, 'show']);
    Route::put('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);

    // Engagement
    Route::post('/posts/{id}/react', [\App\Http\Controllers\Api\ReactionController::class, 'react']);
    Route::get('/posts/{id}/comments', [\App\Http\Controllers\Api\CommentController::class, 'index']);
    Route::post('/posts/{id}/comments', [\App\Http\Controllers\Api\CommentController::class, 'store']);
    Route::delete('/comments/{id}', [\App\Http\Controllers\Api\CommentController::class, 'destroy']);

    // Groups
    Route::post('/groups', [\App\Http\Controllers\Api\GroupController::class, 'store']);
    Route::get('/groups', [\App\Http\Controllers\Api\GroupController::class, 'index']);
    Route::get('/groups/{id}', [\App\Http\Controllers\Api\GroupController::class, 'show']);
    Route::post('/groups/{id}/join', [\App\Http\Controllers\Api\GroupController::class, 'join']);
    Route::get('/groups/{id}/members/pending', [\App\Http\Controllers\Api\GroupController::class, 'pending']);
    Route::put('/groups/{id}/members/{userId}/approve', [\App\Http\Controllers\Api\GroupController::class, 'approve']);
    Route::put('/groups/{id}/roles/{userId}', [\App\Http\Controllers\Api\GroupController::class, 'role']);
    Route::delete('/groups/{id}/members/{userId}', [\App\Http\Controllers\Api\GroupController::class, 'leave']);

    // Messages
    Route::get('/conversations', [MessageController::class, 'index']);
    Route::post('/conversations', [MessageController::class, 'createConversation']);
    Route::get('/conversations/{id}/messages', [MessageController::class, 'showMessages']);
    Route::post('/conversations/{id}/messages', [MessageController::class, 'store']);
    Route::put('/messages/{id}/read', [MessageController::class, 'markAsRead']);

    // Media
    Route::post('/media/upload', [\App\Http\Controllers\Api\MediaController::class, 'upload']);
});
