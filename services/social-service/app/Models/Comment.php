<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Comment extends Model
{
    protected $guarded = [];

    public function author()
    {
        return $this->belongsTo(SocialProfile::class, 'user_id');
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
