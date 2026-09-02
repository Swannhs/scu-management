<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
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

    private function keycloakAdmin(Request $request)
    {
        $this->validateAdmin($request);
        return Http::withToken($request->bearerToken())
            ->acceptJson()
            ->baseUrl(rtrim(config('services.keycloak.url'), '/') . '/admin/realms/scu');
    }

    public function keycloakUsers(Request $request)
    {
        $response = $this->keycloakAdmin($request)->get('users', [
            'search' => $request->query('search'),
            'first' => $request->query('first', 0),
            'max' => min((int) $request->query('max', 50), 100),
        ]);
        return response()->json($response->json(), $response->status());
    }

    public function createKeycloakUser(Request $request)
    {
        $payload = $request->validate([
            'username' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'firstName' => ['required', 'string', 'max:255'],
            'lastName' => ['required', 'string', 'max:255'],
            'temporaryPassword' => ['required', 'string', 'min:12'],
            'roles' => ['array'],
            'roles.*' => ['string'],
            'tenantId' => ['required', 'string'],
        ]);
        $client = $this->keycloakAdmin($request);
        $created = $client->post('users', [
            'username' => $payload['username'], 'email' => $payload['email'],
            'firstName' => $payload['firstName'], 'lastName' => $payload['lastName'],
            'enabled' => true, 'attributes' => ['tenant_id' => [$payload['tenantId']]],
            'credentials' => [['type' => 'password', 'value' => $payload['temporaryPassword'], 'temporary' => true]],
        ]);
        if (!$created->successful()) return response()->json($created->json(), $created->status());
        $location = $created->header('Location'); $userId = basename((string) $location);
        if (!empty($payload['roles'])) $this->syncKeycloakRoles($client, $userId, $payload['roles']);
        return response()->json(['id' => $userId], 201);
    }

    public function replaceKeycloakUserRoles(Request $request, $userId)
    {
        $roles = $request->validate(['roles' => ['required', 'array'], 'roles.*' => ['string']])['roles'];
        $client = $this->keycloakAdmin($request);
        $this->syncKeycloakRoles($client, $userId, $roles);
        return response()->json(['id' => $userId, 'roles' => array_values($roles)]);
    }

    private function syncKeycloakRoles($client, string $userId, array $roleNames): void
    {
        $available = collect($client->get("users/{$userId}/role-mappings/realm/available")->json());
        $roles = $available->filter(fn ($role) => in_array($role['name'], $roleNames))->values()->all();
        if (!empty($roles)) $client->post("users/{$userId}/role-mappings/realm", $roles);
    }

    public function settings(Request $request)
    {
        $this->validateAdmin($request);

        $tenantId = $this->getTenantId($request);
        if (!$tenantId) {
            return response()->json([
                'message' => 'X-Tenant-ID header is required',
            ], 400);
        }

        $tenant = Tenant::with(['campuses', 'domains'])->find($tenantId);
        if (!$tenant) {
            return response()->json([
                'message' => 'Tenant not found',
            ], 404);
        }

        return response()->json([
            'tenant' => [
                'id' => $tenant->id,
                'name' => $tenant->name,
                'status' => $tenant->status,
                'config' => $tenant->config ?? $tenant->db_config ?? [],
            ],
            'campuses' => $tenant->campuses->map(fn ($campus) => [
                'id' => $campus->id,
                'name' => $campus->name,
                'code' => $campus->code ?? null,
                'address' => $campus->address,
                'contact_info' => $campus->contact_info ?? null,
                'is_main' => $campus->is_main ?? false,
            ])->values(),
            'domains' => $tenant->domains->map(fn ($domain) => [
                'id' => $domain->id,
                'domain' => $domain->domain ?? $domain->hostname,
                'is_primary' => $domain->is_primary,
            ])->values(),
        ]);
    }
}
