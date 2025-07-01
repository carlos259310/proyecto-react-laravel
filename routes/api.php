<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContribuyenteApiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

/*
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('contribuyentes', ContribuyenteApiController::class);
});*/

Route::apiResource('contribuyentes', ContribuyenteApiController::class);
