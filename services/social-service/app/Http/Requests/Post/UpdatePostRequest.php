<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'content' => 'sometimes|string',
            'media_urls' => 'sometimes|array',
            'visibility' => 'sometimes|in:public,friends,group'
        ];
    }
}
