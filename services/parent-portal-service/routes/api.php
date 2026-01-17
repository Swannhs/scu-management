<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ParentController;
use App\Http\Controllers\ParentChildController;

Route::get('/parents/me', [ParentController::class, 'getProfile']);
Route::post('/parents', [ParentController::class, 'store']);

// Parent Portal Features
Route::get('/parents/children', [ParentChildController::class, 'index']);
Route::get('/parents/children/{childId}/updates', [ParentChildController::class, 'show']);
