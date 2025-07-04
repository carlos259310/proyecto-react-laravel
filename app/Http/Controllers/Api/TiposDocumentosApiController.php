<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ciudades;
use App\Models\Departamentos;
use App\Models\TiposDocumento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class TiposDocumentosApiController extends Controller
{
    public function index(Request $request)
    {
        // Filtros estrictos

        //obtener todos los registros de la tabla cliente
        $tiposDocumentos = TiposDocumento::all();

        $data = [
            'status' => true,
            'code' => 200,
            'data' => $tiposDocumentos
        ];
        //obtener lista de estudiantes
        return response()->json($data, 200);
    }


}
