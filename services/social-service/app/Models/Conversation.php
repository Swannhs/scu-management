<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Conversation extends Model
{
    protected $guarded = [];

    public function participants()
    {
        return $this->belongsToMany(SocialProfile::class, 'conversation_participants', 'conversation_id', 'user_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
