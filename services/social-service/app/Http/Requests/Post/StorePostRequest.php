<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'content' => 'required|string',
            'group_id' => 'nullable|exists:groups,id',
            'media_urls' => 'nullable|array',
            'visibility' => 'in:public,friends,group'
        ];
    }
}
