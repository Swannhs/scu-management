<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ParentController;
use App\Http\Controllers\ParentChildController;

Route::prefix('v1')->group(function () {
    Route::get('/parents/me', [ParentController::class, 'getProfile']);
    Route::post('/parents', [ParentController::class, 'store']);

    // Parent Portal Features
    Route::post('/parents/links', [ParentChildController::class, 'requestLink']);
    Route::get('/parents/children', [ParentChildController::class, 'index']);
    Route::post('/parents/links/{id}/approve', [ParentChildController::class, 'approveLink']);
    Route::get('/parents/children/{childId}/updates', [ParentChildController::class, 'show']);
});
