<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HostelController;

Route::get('/hostels', [HostelController::class, 'listHostels']);
Route::post('/hostels', [HostelController::class, 'storeHostel']);
Route::post('/allotments', [HostelController::class, 'allotRoom']);
