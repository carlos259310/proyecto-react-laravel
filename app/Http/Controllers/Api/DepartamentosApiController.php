<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ciudades;
use App\Models\Departamentos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class DepartamentosApiController extends Controller
{
    public function index(Request $request)
    {
        // Filtros estrictos

        //obtener todos los registros de la tabla cliente
        $departamentos = Departamentos::all();

        $data = [
            'status' => true,
            'code' => 200,
            'data' => $departamentos
        ];
        //obtener lista de estudiantes
        return response()->json($data, 200);
    }


}
