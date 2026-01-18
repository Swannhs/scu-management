<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParentStudentLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'tenant_id',
        'parent_user_id',
        'student_id',
        'status',
    ];
}
