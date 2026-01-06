<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $guarded = [];

    public function members()
    {
        return $this->belongsToMany(SocialProfile::class, 'group_members', 'group_id', 'user_id')
                    ->withPivot('role');
    }
}
