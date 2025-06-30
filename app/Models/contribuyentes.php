<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class contribuyentes extends Model
{
    protected $table = 'contribuyentes';

    //declarar la clave primaria
    protected $primaryKey = 'id_contribuyente';
    public $incrementing = true; // Asegurarse de que la clave primaria sea auto-incremental

    protected $fillable = [
        'nombres',
        'apellidos',
        'nombre_completo',
        'tipo_documento',
        'documento',
        'email',
        'telefono',
        'direccion',
        'ciudad',
        'departamento',
        'id_tipo_documento',
        'id_ciudad',
        'id_departamento'
    ];

    /**
     * Relación con la tabla `ciudades`.
     * Un cliente pertenece a una ciudad.
     */
    public function ciudad()
    {
        return $this->belongsTo(Ciudades::class, 'id_ciudad', 'id_ciudad');
    }

    /**
     * Relación con la tabla `departamentos`.
     * Un cliente pertenece a un departamento.
     */
    public function departamento()
    {
        return $this->belongsTo(Departamentos::class, 'id_departamento', 'id_departamento');
    }
    /**
     * Relación con la tabla `tipos_documentos`.
     * Un cliente tiene un tipo de documento.
     */
    public function tipoDocumento()
    {
        return $this->belongsTo(TiposDocumento::class, 'id_tipo_documento', 'id');
    }
}
