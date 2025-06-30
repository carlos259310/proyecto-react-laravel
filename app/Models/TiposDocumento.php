<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TiposDocumento extends Model
{
    use HasFactory;

    protected $table = 'tipos_documentos'; // Nombre de la tabla
    protected $fillable = ['documento', 'codigo']; // Campos asignables
   /**
     * Relación con la tabla `clientes`.
     * Un tipo de documento puede tener muchos clientes.
     */
    public function clientes()
    {
        return $this->hasMany(contribuyentes::class, 'tipo_documento', 'id');
    }
}
