<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
class ParentProfile extends Model {
    use HasUuids;
    protected $table = 'parents';
    protected $fillable = ['tenant_id', 'keycloak_id', 'first_name', 'last_name', 'email', 'phone'];
}
