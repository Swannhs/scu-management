<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class SocialProfile extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    protected $guarded = [];

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class, 'user_id');
    }

    public function friends(): BelongsToMany
    {
        return $this->belongsToMany(SocialProfile::class, 'friendships', 'user_id', 'friend_id')
            ->wherePivot('status', 'accepted');
    }

    public function groups(): BelongsToMany
    {
        return $this->belongsToMany(Group::class, 'group_members', 'user_id', 'group_id');
    }
}
