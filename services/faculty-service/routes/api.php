<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FacultyController;

Route::apiResource('faculties', FacultyController::class);
