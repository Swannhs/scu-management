<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Like extends Model
{
    protected $guarded = [];

    public function likable()
    {
        return $this->morphTo();
    }
}
