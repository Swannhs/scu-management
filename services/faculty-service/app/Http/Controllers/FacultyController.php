<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FacultyController extends Controller
{
    private function getTenantId(Request $request)
    {
        return $request->header('X-Tenant-ID');
    }

    public function index(Request $request)
    {
        $tenantId = $this->getTenantId($request);
        if (!$tenantId) {
            return response()->json(['error' => 'Tenant context missing'], 400);
        }

        return response()->json(Faculty::where('tenant_id', $tenantId)->get());
    }

    public function store(Request $request)
    {
        $tenantId = $this->getTenantId($request);
        if (!$tenantId) {
            return response()->json(['error' => 'Tenant context missing'], 400);
        }

        $validator = Validator::make($request->all(), [
            'employee_id' => 'required|string|unique:faculties,employee_id',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email',
            'designation' => 'required|string',
            'department' => 'required|string',
            'joining_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $faculty = Faculty::create(array_merge(
            $request->all(),
            ['tenant_id' => $tenantId]
        ));

        return response()->json($faculty, 201);
    }

    public function show(Request $request, $id)
    {
        $tenantId = $this->getTenantId($request);
        $faculty = Faculty::where('id', $id)->where('tenant_id', $tenantId)->firstOrFail();
        return response()->json($faculty);
    }

    public function update(Request $request, $id)
    {
        $tenantId = $this->getTenantId($request);
        $faculty = Faculty::where('id', $id)->where('tenant_id', $tenantId)->firstOrFail();

        $faculty->update($request->all());
        return response()->json($faculty);
    }
}
