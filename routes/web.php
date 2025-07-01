<?php

use App\Http\Controllers\ContribuyenteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::resource('contribuyentes',ContribuyenteController::class)
    ->middleware(['auth']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
