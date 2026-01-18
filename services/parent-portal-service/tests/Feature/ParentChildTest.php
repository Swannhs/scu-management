<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;
use App\Models\ParentStudentLink;

class ParentChildTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Mock the JWT public key environment variable
        putenv('KEYCLOAK_REALM_PUBLIC_KEY=MOCK_PUBLIC_KEY');
    }

    private function getHeaders($role = 'PARENT', $sub = 'parent-123')
    {
        // Mock a valid token structure
        // Header: {"alg":"RS256","typ":"JWT"} -> eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9
        // Payload: {"sub":"...", "exp": ..., "realm_access": {"roles": [...]}}

        $payload = [
            'sub' => $sub,
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

    public function test_can_request_student_link()
    {
        $response = $this->postJson('/api/v1/parents/links', [
            'studentId' => 'student-456'
        ], $this->getHeaders());

        $response->assertStatus(201);
        $this->assertDatabaseHas('parent_student_links', [
            'parent_user_id' => 'parent-123',
            'student_id' => 'student-456',
            'status' => 'PENDING'
        ]);
    }

    public function test_can_approve_link()
    {
        $link = ParentStudentLink::create([
            'tenant_id' => 'tenant-1',
            'parent_user_id' => 'parent-123',
            'student_id' => 'student-456',
            'status' => 'PENDING'
        ]);

        $response = $this->postJson("/api/v1/parents/links/{$link->id}/approve", [], $this->getHeaders('TENANT_ADMIN', 'admin-1'));

        $response->assertStatus(200);
        $this->assertDatabaseHas('parent_student_links', [
            'id' => $link->id,
            'status' => 'APPROVED'
        ]);
    }

    public function test_can_get_updates_for_linked_child()
    {
        ParentStudentLink::create([
            'tenant_id' => 'tenant-1',
            'parent_user_id' => 'parent-123',
            'student_id' => 'student-456',
            'status' => 'APPROVED'
        ]);

        Http::fake([
            'grades-service:3000/*' => Http::response(['finalGrades' => []], 200),
            'attendance-service:3000/*' => Http::response(['overall' => ['percentage' => 90]], 200),
        ]);

        $response = $this->getJson('/api/v1/parents/children/student-456/updates', $this->getHeaders());

        $response->assertStatus(200)
            ->assertJsonStructure(['studentId', 'updates' => ['attendance', 'grades']]);
    }
}
