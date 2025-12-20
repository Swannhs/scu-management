<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
class Allotment extends Model {
    use HasUuids;
    protected $fillable = ['tenant_id', 'room_id', 'student_id', 'start_date', 'end_date', 'status'];
    public function room() { return $this->belongsTo(Room::class); }
}
