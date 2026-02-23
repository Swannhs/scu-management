<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'tenant_id' => $this->tenant_id,
            'group_id' => $this->group_id,
            'content' => $this->content,
            'media_urls' => $this->media_urls ?? [],
            'visibility' => $this->visibility,
            'comments_count' => $this->comments_count ?? 0,
            'recent_comments' => $this->recent_comments ?? [],
            'reactions' => $this->reactions ?? [],
            'author' => new ProfileResource($this->whenLoaded('author')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
