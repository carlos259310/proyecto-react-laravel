<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ciudades;
use App\Models\Contribuyente;
use App\Models\contribuyentes;
use App\Models\Departamentos;
use App\Models\TiposDocumento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ContribuyenteApiController extends Controller
{

public function index(Request $request)
{
   
    $contribuyentes = contribuyentes::with(['tipoDocumento' => function($query) {
        $query->select('id', 'documento', 'codigo');
    }])->get();
    
   
    $data = [
        'status' => true,
        'code' => 200,
        'data' => $contribuyentes->map(function ($contribuyente) {
            return [
                'id_contribuyente' => $contribuyente->id_contribuyente,
                'nombres' => $contribuyente->nombres,
                'apellidos' => $contribuyente->apellidos,
                'nombre_completo' => $contribuyente->nombre_completo,
                'id_tipo_documento' => $contribuyente->id_tipo_documento,
                'tipo_documento_codigo' => $contribuyente->tipoDocumento->codigo ?? null,
                'tipo_documento_nombre' => $contribuyente->tipoDocumento->documento ?? null,
                'id_ciudad' => $contribuyente->id_ciudad,
                'id_departamento' => $contribuyente->id_departamento,
                'documento' => $contribuyente->documento,
                'email' => $contribuyente->email,
                'telefono' => $contribuyente->telefono,
                'direccion' => $contribuyente->direccion,
                'created_at' => $contribuyente->created_at,
                'updated_at' => $contribuyente->updated_at
            ];
        })
    ];
    
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
               'email' => [
        'required',
        'email',
        'max:100',
      Rule::unique('contribuyentes')
    ],
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
            'email' => 'required|email|max:100|unique:contribuyentes,email,' . $id_contribuyente . ',id_contribuyente',
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


}
