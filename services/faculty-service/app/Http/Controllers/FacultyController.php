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

    private function authorizeRole(Request $request, array $allowedRoles)
    {
        // In a real environment, this would validate the JWT token or check specific headers injected by the gateway
        // For this implementation, we check the X-Realm-Access-Roles header
        $rolesHeader = $request->header('X-Realm-Access-Roles') ?? '';
        $userRoles = explode(',', $rolesHeader);

        foreach ($allowedRoles as $role) {
            if (in_array($role, $userRoles)) {
                return true;
            }
        }
        abort(403, 'Forbidden');
    }

    public function index(Request $request)
    {
        $this->authorizeRole($request, ['TENANT_ADMIN', 'FACULTY', 'STUDENT']);
        $tenantId = $this->getTenantId($request);
        if (!$tenantId) {
            return response()->json(['error' => 'Tenant context missing'], 400);
        }

        return response()->json(Faculty::where('tenant_id', $tenantId)->get());
    }

    public function store(Request $request)
    {
        $this->authorizeRole($request, ['TENANT_ADMIN']);
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
        $this->authorizeRole($request, ['TENANT_ADMIN', 'FACULTY', 'STUDENT']);
        $tenantId = $this->getTenantId($request);
        $faculty = Faculty::where('id', $id)->where('tenant_id', $tenantId)->firstOrFail();
        return response()->json($faculty);
    }

    public function update(Request $request, $id)
    {
        $this->authorizeRole($request, ['TENANT_ADMIN']);
        $tenantId = $this->getTenantId($request);
        $faculty = Faculty::where('id', $id)->where('tenant_id', $tenantId)->firstOrFail();

        $faculty->update($request->all());
        return response()->json($faculty);
    }
}
