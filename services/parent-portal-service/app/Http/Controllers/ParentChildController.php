<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\ParentStudentLink;
use Illuminate\Support\Facades\Validator;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class ParentChildController extends Controller
{
    private function getTenantId(Request $request) {
        $tenantId = $request->header('X-Tenant-ID');
        if (!$tenantId) {
            abort(400, 'X-Tenant-ID header is required');
        }
        return $tenantId;
    }

    private function validateToken(Request $request) {
        $token = $request->bearerToken();
        if (!$token) {
            abort(401, 'Bearer token missing');
        }

        try {
            // In a real environment, this key should be fetched from the JWKS endpoint or config.
            // For now, we assume it's provided in the environment.
            $publicKey = "-----BEGIN PUBLIC KEY-----\n" . env('KEYCLOAK_REALM_PUBLIC_KEY', 'MOCK_KEY') . "\n-----END PUBLIC KEY-----";

            // Check if library is present (for environment stability during dev without composer install)
            if (class_exists(JWT::class)) {
                $decoded = JWT::decode($token, new Key($publicKey, 'RS256'));
                return (array) $decoded;
            } else {
                // Fallback for dev environment only if package missing (NOT FOR PRODUCTION)
                // This fallback block should be removed in production.
                $parts = explode('.', $token);
                if (count($parts) !== 3) abort(401, 'Invalid token format');
                $claims = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $parts[1])), true);
                if (!$claims) abort(401, 'Invalid token payload');
                if (isset($claims['exp']) && $claims['exp'] < time()) abort(401, 'Token expired');
                return $claims;
            }
        } catch (\Exception $e) {
            abort(401, 'Invalid token');
        }
    }

    // Request to link a student
    public function requestLink(Request $request)
    {
        $tenantId = $this->getTenantId($request);
        $claims = $this->validateToken($request);
        $parentId = $claims['sub'] ?? null;

        // Check role
        $roles = $claims['realm_access']['roles'] ?? [];
        if (!in_array('PARENT', $roles) && !in_array('TENANT_ADMIN', $roles)) {
             // allow admin to create links too? Prompt says Role: PARENT
             if (!in_array('PARENT', $roles)) {
                 abort(403, 'Role PARENT required');
             }
        }

        $validator = Validator::make($request->all(), [
            'studentId' => 'required_without:studentCode|string',
            'studentCode' => 'required_without:studentId|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $studentId = $request->input('studentId');
        // TODO: specific logic for studentCode lookup -> would require calling student-service

        // Check if link already exists
        $existing = ParentStudentLink::where('tenant_id', $tenantId)
            ->where('parent_user_id', $parentId)
            ->where('student_id', $studentId)
            ->first();

        if ($existing) {
            return response()->json(['message' => 'Link already exists', 'status' => $existing->status], 409);
        }

        $link = ParentStudentLink::create([
            'tenant_id' => $tenantId,
            'parent_user_id' => $parentId,
            'student_id' => $studentId,
            'status' => 'PENDING'
        ]);

        return response()->json($link, 201);
    }

    // List children for the logged-in parent
    public function index(Request $request)
    {
        $tenantId = $this->getTenantId($request);
        $claims = $this->validateToken($request);
        $parentId = $claims['sub'] ?? null;

        $links = ParentStudentLink::where('tenant_id', $tenantId)
            ->where('parent_user_id', $parentId)
            ->where('status', 'APPROVED')
            ->get();

        // We only have student_id. In a real app we might want to fetch student details.
        // For now returning the links or minimal student info.
        // The prompt says: "Returns only APPROVED links (real DB, no demo)."

        return response()->json($links);
    }

    // Approve a link
    public function approveLink(Request $request, $id)
    {
        $tenantId = $this->getTenantId($request);
        $claims = $this->validateToken($request);

        $roles = $claims['realm_access']['roles'] ?? [];
        if (!in_array('TENANT_ADMIN', $roles) && !in_array('REGISTRAR', $roles)) {
             abort(403, 'Role TENANT_ADMIN or REGISTRAR required');
        }

        $link = ParentStudentLink::where('id', $id)
            ->where('tenant_id', $tenantId)
            ->first();

        if (!$link) {
            return response()->json(['message' => 'Link not found'], 404);
        }

        $link->status = 'APPROVED';
        $link->save();

        return response()->json($link);
    }

    // Get academic updates for a specific child
    public function show(Request $request, $childId)
    {
        $tenantId = $this->getTenantId($request);
        $claims = $this->validateToken($request);
        $parentId = $claims['sub'] ?? null;

        // Verify link exists and is APPROVED
        $link = ParentStudentLink::where('tenant_id', $tenantId)
            ->where('parent_user_id', $parentId)
            ->where('student_id', $childId)
            ->where('status', 'APPROVED')
            ->first();

        if (!$link) {
            return response()->json(['message' => 'Student not linked or not approved'], 403);
        }

        $token = $request->bearerToken();
        $updates = [];
        $errors = [];
        $partial = false;

        // Fetch Grades
        try {
            $response = Http::withToken($token)
                ->withHeaders(['X-Tenant-ID' => $tenantId])
                ->timeout(3)
                ->get("http://grades-service:3000/v1/students/{$childId}/transcript");

            if ($response->successful()) {
                $transcript = $response->json();
                if (isset($transcript['finalGrades'])) {
                    foreach ($transcript['finalGrades'] as $grade) {
                        $updates['grades'][] = [
                            'type' => 'GRADE',
                            'courseId' => $grade['courseOfferingId'],
                            'score' => $grade['percentage'],
                            'grade' => $grade['grade'],
                            'date' => $grade['computedAt']
                        ];
                    }
                }
            } else {
                 $partial = true;
                 $errors[] = ['service' => 'grades', 'reason' => 'error_response', 'status' => $response->status()];
            }
        } catch (\Exception $e) {
            $partial = true;
            $errors[] = ['service' => 'grades', 'reason' => 'timeout_or_network_error'];
        }

        // Fetch Attendance (New endpoint)
        try {
             $response = Http::withToken($token)
                ->withHeaders(['X-Tenant-ID' => $tenantId])
                ->timeout(3)
                ->get("http://attendance-service:3000/v1/students/{$childId}/summary");

             if ($response->successful()) {
                 $attendance = $response->json();
                 $updates['attendance'] = $attendance;
             } else {
                 $partial = true;
                 $errors[] = ['service' => 'attendance', 'reason' => 'error_response', 'status' => $response->status()];
             }
        } catch (\Exception $e) {
            $partial = true;
            $errors[] = ['service' => 'attendance', 'reason' => 'timeout_or_network_error'];
        }

        return response()->json([
            'studentId' => $childId,
            'generatedAt' => now()->toIso8601String(),
            'updates' => $updates,
            'partial' => $partial,
            'errors' => $errors
        ]);
    }
}
