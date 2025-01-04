<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BasecampPhoto extends Model
{
    protected $table = 'basecamp_photos';
    protected $fillable = ['basecamp_id', 'path'];

    public function basecamp()
    {
        return $this->belongsToMany(Basecamp::class, 'basecamp_id');
    }
}
