<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AdminConfigController extends Controller
{
    private $courseServiceUrl = 'http://course-service:3000';
    private $userServiceUrl = 'http://user-service:3000';

    private function getTenantId(Request $request) {
        return $request->header('X-Tenant-ID');
    }

    private function validateAdmin(Request $request) {
        $token = $request->bearerToken();
        if (!$token) abort(401, 'Bearer token missing');

        try {
             // In a real environment, this key should be fetched from the JWKS endpoint or config.
            $publicKey = "-----BEGIN PUBLIC KEY-----\n" . env('KEYCLOAK_REALM_PUBLIC_KEY', 'MOCK_KEY') . "\n-----END PUBLIC KEY-----";

             if (class_exists(JWT::class)) {
                $decoded = (array) JWT::decode($token, new Key($publicKey, 'RS256'));
                $roles = $decoded['realm_access']->roles ?? [];
             } else {
                 // Fallback
                $parts = explode('.', $token);
                if (count($parts) !== 3) abort(401, 'Invalid token');
                $decoded = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $parts[1])), true);
                if (!$decoded) abort(401, 'Invalid token payload');
                if (isset($decoded['exp']) && $decoded['exp'] < time()) abort(401, 'Token expired');
                $roles = $decoded['realm_access']['roles'] ?? [];
             }

            if (!in_array('TENANT_ADMIN', $roles)) {
                abort(403, 'Role TENANT_ADMIN required');
            }
        } catch (\Exception $e) {
            abort(401, 'Invalid token');
        }
    }

    private function proxy(Request $request, $serviceUrl, $path)
    {
        $this->validateAdmin($request);
        $token = $request->bearerToken();
        $tenantId = $this->getTenantId($request);
        $method = strtolower($request->method());
        $url = "{$serviceUrl}/{$path}";

        $client = Http::withToken($token)
            ->withHeaders(['X-Tenant-ID' => $tenantId]);

        if ($method === 'get') {
            $response = $client->get($url, $request->query());
        } elseif ($method === 'post') {
            $response = $client->post($url, $request->all());
        } elseif ($method === 'patch') {
            $response = $client->patch($url, $request->all());
        } elseif ($method === 'delete') {
            $response = $client->delete($url, $request->all());
        } else {
            return response()->json(['message' => 'Method not supported'], 405);
        }

        return response()->json($response->json(), $response->status());
    }

    // Terms
    public function terms(Request $request, $id = null)
    {
        $path = 'v1/terms' . ($id ? "/{$id}" : '');
        return $this->proxy($request, $this->courseServiceUrl, $path);
    }

    // Departments
    public function departments(Request $request, $id = null)
    {
        $path = 'v1/departments' . ($id ? "/{$id}" : '');
        return $this->proxy($request, $this->courseServiceUrl, $path);
    }

    // Programs
    public function programs(Request $request, $id = null)
    {
        $path = 'v1/programs' . ($id ? "/{$id}" : '');
        return $this->proxy($request, $this->courseServiceUrl, $path);
    }

    // User Roles
    public function userRoles(Request $request, $userId)
    {
        return $this->proxy($request, $this->userServiceUrl, "users/{$userId}/roles");
    }
}
