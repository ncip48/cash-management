<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CVController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\PlanItemController;
use App\Models\CV;
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

    // Plan
    Route::resource('plan', PlanController::class);
    Route::resource('plan-item', PlanItemController::class);

    // CV
    Route::resource('cv', CVController::class);
    Route::get('cv/{id}/print', [CVController::class, 'print'])->name('cv.print');
    Route::get('cv/{id}/copy', [CVController::class, 'copy'])->name('cv.copy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';


Route::get('cv/template/basic', function () {

    $cv = CV::with(['experiences', 'educations'])->first();

    return view('cv/template/template-basic', [
        'cv' => $cv,
    ]);
});
