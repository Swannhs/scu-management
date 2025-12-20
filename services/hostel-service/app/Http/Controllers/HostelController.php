<?php

namespace App\Http\Controllers;

use App\Models\Hostel;
use App\Models\Room;
use App\Models\Allotment;
use Illuminate\Http\Request;

class HostelController extends Controller
{
    private function getTenantId(Request $request) { return $request->header('X-Tenant-ID'); }

    public function listHostels(Request $request)
    {
        return response()->json(Hostel::where('tenant_id', $this->getTenantId($request))->with('rooms')->get());
    }

    public function storeHostel(Request $request)
    {
        $tenantId = $this->getTenantId($request);
        $hostel = Hostel::create(array_merge($request->all(), ['tenant_id' => $tenantId]));
        return response()->json($hostel, 201);
    }

    public function allotRoom(Request $request)
    {
        $tenantId = $this->getTenantId($request);
        // Basic check
        $room = Room::where('id', $request->room_id)->where('tenant_id', $tenantId)->firstOrFail();
        if ($room->status === 'FULL') {
            return response()->json(['error' => 'Room is full'], 400);
        }

        $allotment = Allotment::create(array_merge($request->all(), ['tenant_id' => $tenantId]));
        
        // Update room status if needed (simplified)
        // $room->update(['status' => 'FULL']); 

        return response()->json($allotment, 201);
    }
}
