<?php

namespace App\Http\Controllers;

use App\Models\ParentProfile;
use Illuminate\Http\Request;

class ParentController extends Controller
{
    private function getTenantId(Request $request) { return $request->header('X-Tenant-ID'); }

    public function getProfile(Request $request)
    {
        $tenantId = $this->getTenantId($request);
        // Assuming we look up by Keycloak ID in real world
        return response()->json(ParentProfile::where('tenant_id', $tenantId)->get());
    }

    public function store(Request $request)
    {
        $tenantId = $this->getTenantId($request);
        $parent = ParentProfile::create(array_merge($request->all(), ['tenant_id' => $tenantId]));
        return response()->json($parent, 201);
    }
}
