<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ciudades;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class CiudadeseApiController extends Controller
{
    public function index(Request $request)
    {
        // Filtros estrictos

        //obtener todos los registros de la tabla cliente
        $clientes = Ciudades::all();

        $data = [
            'status' => true,
            'code' => 200,
            'data' => $clientes
        ];
        //obtener lista de estudiantes
        return response()->json($data, 200);
    }

    public function porDepartamento($departamentoId)
    {
        // Ajusta los nombres de columna según tu base de datos
        $ciudades = Ciudades::where('id_departamento', $departamentoId)
            ->get(['id_ciudad', 'ciudad']);
    }
}
