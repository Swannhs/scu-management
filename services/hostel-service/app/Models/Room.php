<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
class Room extends Model {
    use HasUuids;
    protected $fillable = ['tenant_id', 'hostel_id', 'room_number', 'room_type', 'capacity', 'monthly_rent', 'status'];
    public function hostel() { return $this->belongsTo(Hostel::class); }
}
