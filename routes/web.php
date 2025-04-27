<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\PermissionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Role & Permission
    Route::prefix('/role-permission')->group(function () {
        Route::resource('permissions', PermissionController::class);
    });

    // Category
    Route::resource('category', CategoryController::class);

    // Finance
    Route::resource('finance', FinanceController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
