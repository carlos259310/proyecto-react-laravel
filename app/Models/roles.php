<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class roles extends Model
{

    use HasFactory;
    protected $table = 'roles';
    protected $primaryKey = 'id';
    //

    protected $fillable=['id','name'];

      //relacion uno a muchos inversa
  public function usuarios()
  {
      return $this->hasMany(User::class, 'id_rol', 'id');
  }
}
