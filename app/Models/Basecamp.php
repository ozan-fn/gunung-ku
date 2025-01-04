<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Basecamp extends Model
{
    use HasFactory;

    protected $table = 'basecamps';
    protected $fillable = ['gunung_id', 'user_id', 'nama', 'alamat', 'harga', 'deskripsi', 'kuota', 'telepon', 'gmaps_link'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function gunung()
    {
        return $this->belongsTo(Gunung::class, 'gunung_id');
    }

    public function photos()
    {
        return $this->hasMany(BasecampPhoto::class, 'basecamp_id');
    }
}
