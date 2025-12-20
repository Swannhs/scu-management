<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TenantController;

Route::get('resolve-domain', [TenantController::class, 'resolveDomain']);
Route::apiResource('tenants', TenantController::class);
