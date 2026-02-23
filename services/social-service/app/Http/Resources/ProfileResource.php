<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'tenant_id' => $this->tenant_id,
            'name' => $this->name,
            'avatar_url' => $this->avatar_url,
            'cover_url' => $this->cover_url,
            'bio' => $this->bio,
            'is_friend' => $this->when(isset($this->is_friend), $this->is_friend),
        ];
    }
}
