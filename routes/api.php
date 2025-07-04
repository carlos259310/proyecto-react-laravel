<?php

use App\Http\Controllers\Api\CiudadeseApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContribuyenteApiController;
use App\Http\Controllers\Api\DepartamentosApiController;
use App\Http\Controllers\Api\TiposDocumentosApiController;
use App\Models\Ciudades;
use App\Models\Departamentos;
use App\Models\TiposDocumento;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

/*
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('contribuyentes', ContribuyenteApiController::class);
});*/

//Route::apiResource('contribuyentes', ContribuyenteApiController::class);
//Route::apiResource('ciudades', CiudadeseApiController::class);
//Route::apiResource('departamentos', DepartamentosApiController::class);
//Route::apiResource('tipos-documentos', TiposDocumentosApiController::class);


Route::apiResource('contribuyentes', ContribuyenteApiController::class);

// Ciudades
Route::get('/ciudades', function () {
    return Ciudades::select('id_ciudad', 'ciudad', 'id_departamento')->get();
});

// Departamentos
Route::get('/departamentos', function () {
    return Departamentos::select('id_departamento', 'departamento')->get();
});

//ciudades
Route::get('ciudades/{IdDepartamento}',[CiudadeseApiController::class,'porDepartamento']);

Route::get('/tipos-documento', function () {
    return TiposDocumento::select('id', 'codigo', 'documento')->get();
});
