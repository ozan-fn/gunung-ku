<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gunung extends Model
{
    protected $table = 'gunungs';
    protected $fillable = ['nama', 'tinggi', 'lokasi', 'gambar', 'deskripsi'];
}
