<?php

namespace App\Http\Requests\Friendship;

use Illuminate\Foundation\Http\FormRequest;

class StoreFriendRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'friend_id' => 'required|exists:social_profiles,id'
        ];
    }
}
