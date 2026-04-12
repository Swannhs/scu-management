<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\AdminConfigController;

Route::get('resolve-domain', [TenantController::class, 'resolveDomain']);
Route::apiResource('tenants', TenantController::class);
Route::get('admin/settings', [AdminConfigController::class, 'settings']);

Route::prefix('v1/admin')->group(function () {
    // Terms
    Route::get('terms', [AdminConfigController::class, 'terms']);
    Route::post('terms', [AdminConfigController::class, 'terms']);
    Route::patch('terms/{id}', [AdminConfigController::class, 'terms']);

    // Departments
    Route::get('departments', [AdminConfigController::class, 'departments']);
    Route::post('departments', [AdminConfigController::class, 'departments']);
    Route::patch('departments/{id}', [AdminConfigController::class, 'departments']);

    // Programs
    Route::get('programs', [AdminConfigController::class, 'programs']);
    Route::post('programs', [AdminConfigController::class, 'programs']);
    Route::patch('programs/{id}', [AdminConfigController::class, 'programs']);

    // User Roles
    Route::post('users/{userId}/roles', [AdminConfigController::class, 'userRoles']);
});
