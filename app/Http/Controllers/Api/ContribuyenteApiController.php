<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ciudades;
use App\Models\Contribuyente;
use App\Models\contribuyentes;
use App\Models\Departamentos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ContribuyenteApiController extends Controller
{
    public function index(Request $request)
    {
        // Filtros estrictos

        //obtener todos los registros de la tabla cliente
        $clientes = contribuyentes::all();

        $data = [
            'status' => true,
            'code' => 200,
            'data' => $clientes
        ];
        //obtener lista de estudiantes
        return response()->json($data, 200);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        // Validación de email y campos requeridos
        $validator = Validator::make($data, [
            'id_tipo_documento' => 'required|integer|exists:tipos_documentos,id',
            'documento' => 'required|string',
            'nombres' => 'nullable|string',
            'apellidos' => 'nullable|string',
            'direccion' => 'required|string',
            'telefono' => 'required|string',
            'celular' => 'nullable|string',
            'email' => 'required|email|unique:contribuyentes,email',
            'usuario' => 'required|string',
            'id_ciudad' => 'required|string|max:10',
            'id_departamento' => 'required|string|max:10'
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Lógica especial para NIT
        if ($data['id_tipo_documento'] === 6) {
            $razon = explode(' ', $data['nombres']);
            $data['nombres'] = array_shift($razon);
            $data['apellidos'] = implode(' ', $razon) . ' ' . $data['apellidos'];
        }

        // Nombre completo
        $data['nombre_completo'] = trim($data['nombres'] . ' ' . $data['apellidos']);

        $contribuyente = contribuyentes::create($data);
        return response()->json($contribuyente, 201);
    }

    public function show($id)
    {
        return response()->json(contribuyentes::findOrFail($id));
    }



    public function update(Request $request, $id_contribuyente)
    {
        $contribuyente = contribuyentes::findOrFail($id_contribuyente);
        $data = $request->all();

        $validator = Validator::make($data, [
            'id_tipo_documento' => 'required|integer|exists:tipos_documentos,id',
            'documento' => 'required|string',
            'nombres' => 'nullable|string',
            'apellidos' => 'nullable|string',
            'direccion' => 'required|string',
            'telefono' => 'required|string',
            'celular' => 'nullable|string',
            'email' => [
                'required',
                'email',
                'max:100',
                Rule::unique('contribuyentes')->ignore($id_contribuyente, 'id_contribuyente')
            ],
            'usuario' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($data['id_tipo_documento'] === 6) {
            $razon = explode(' ', $data['nombres']);
            $data['nombres'] = array_shift($razon);
            $data['apellidos'] = implode(' ', $razon) . ' ' . $data['apellidos'];
        }

        $data['nombre_completo'] = trim($data['nombres'] . ' ' . $data['apellidos']);

        $contribuyente->update($data);

        return response()->json($contribuyente);
    }

    public function destroy($id)
    {
        $contribuyente = contribuyentes::findOrFail($id);
        $contribuyente->delete();
        return response()->json(null, 204);
    }


    // En tu controlador API
    public function getDepartamentos()
    {
        $departamentos = Departamentos::all();
        return response()->json($departamentos);
    }

    public function getCiudades(Request $request)
    {
        $departamentoId = $request->query('departamento');
        $ciudades = Ciudades::where('id_departamento', $departamentoId)->get();
        return response()->json($ciudades);
    }
}
