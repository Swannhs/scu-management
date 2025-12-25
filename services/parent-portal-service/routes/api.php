<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ParentController;

Route::get('/parents/me', [ParentController::class, 'getProfile']);
Route::post('/parents', [ParentController::class, 'store']);
