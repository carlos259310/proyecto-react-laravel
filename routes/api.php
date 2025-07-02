<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContribuyenteApiController;
use App\Models\Ciudades;
use App\Models\Departamentos;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

/*
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('contribuyentes', ContribuyenteApiController::class);
});*/

Route::apiResource('contribuyentes', ContribuyenteApiController::class);


Route::get('/departamentos', function () {
    return Departamentos::select('id', 'nombre')->get();
});

Route::get('/ciudades', function () {
    return Ciudades::select('id', 'nombre', 'id_departamento')->get();
});
