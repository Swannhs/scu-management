<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'tenant_id',
        'keycloak_id',
        'employee_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'designation',
        'department',
        'specialization',
        'status',
        'joining_date',
    ];

    protected $casts = [
        'joining_date' => 'date',
    ];
}
