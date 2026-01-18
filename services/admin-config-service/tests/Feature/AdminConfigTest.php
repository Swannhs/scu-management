<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class AdminConfigTest extends TestCase
{
    // use RefreshDatabase; // No DB interaction directly needed for proxy tests

    protected function setUp(): void
    {
        parent::setUp();
        putenv('KEYCLOAK_REALM_PUBLIC_KEY=MOCK_PUBLIC_KEY');
    }

    private function getHeaders($role = 'TENANT_ADMIN')
    {
        $payload = [
            'sub' => 'admin-123',
            'exp' => time() + 3600,
            'realm_access' => ['roles' => [$role]]
        ];

        $encodedPayload = base64_encode(json_encode($payload));
        $token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.$encodedPayload.signature";

        return [
            'X-Tenant-ID' => 'tenant-1',
            'Authorization' => "Bearer $token"
        ];
    }

    public function test_can_proxy_terms_request()
    {
        Http::fake([
            'course-service:3000/v1/terms' => Http::response(['terms' => []], 200),
        ]);

        $response = $this->getJson('/api/v1/admin/terms', $this->getHeaders());

        $response->assertStatus(200);
    }

    public function test_proxy_requires_tenant_admin_role()
    {
        $response = $this->getJson('/api/v1/admin/terms', $this->getHeaders('STUDENT'));

        $response->assertStatus(403);
    }

    public function test_can_proxy_user_role_assignment()
    {
        Http::fake([
            'user-service:3000/users/user-123/roles' => Http::response(['status' => 'ok'], 201),
        ]);

        $response = $this->postJson('/api/v1/admin/users/user-123/roles', ['role' => 'FACULTY'], $this->getHeaders());

        $response->assertStatus(201);
    }
}
