<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
class Hostel extends Model {
    use HasUuids;
    protected $fillable = ['tenant_id', 'name', 'type', 'address', 'capacity'];
    public function rooms() { return $this->hasMany(Room::class); }
}
