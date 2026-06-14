<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FrontendController;

Route::post('auth/login', [AuthController::class, 'login']);

// Protected Auth Routes
Route::group(['middleware' => 'auth:api'], function () {
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::post('auth/refresh', [AuthController::class, 'refresh']);
    Route::get('auth/me', [AuthController::class, 'me']);
});

// Public Frontend Routes
Route::get('banners', [FrontendController::class, 'getBanners']);
Route::get('home', [FrontendController::class, 'getHomeData']);
Route::get('services', [FrontendController::class, 'getServices']);
Route::get('portfolio', [FrontendController::class, 'getPortfolio']);
Route::get('blogs', [FrontendController::class, 'getBlogs']);
Route::get('blogs/{slug}', [FrontendController::class, 'getBlog']);
Route::get('faqs', [FrontendController::class, 'getFaqs']);
Route::post('contact', [FrontendController::class, 'submitContact']);
Route::post('subscribe', [FrontendController::class, 'subscribeNewsletter']);
