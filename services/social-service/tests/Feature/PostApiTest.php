<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\SocialProfile;
use App\Models\Post;

class PostApiTest extends TestCase
{
    /** @test */
    public function unauthenticated_users_cannot_access_feed()
    {
        $response = $this->getJson('/api/v1/posts');
        // Because of multi-tenant header architecture, the actual auth is handled
        // at the Gateway, so this might return 404 for User Profile Not Found
        // if X-User-Id is missing.
        $response->assertStatus(404);
    }

    /** @test */
    public function user_can_create_a_post()
    {
        $user = SocialProfile::forceCreate([
            'id' => 'user-123',
            'tenant_id' => 'tenant-1'
        ]);

        $response = $this->withHeaders([
            'X-User-Id' => 'user-123',
            'X-Tenant-Id' => 'tenant-1'
        ])->postJson('/api/v1/posts', [
                    'content' => 'Hello World!',
                    'visibility' => 'public'
                ]);

        $response->assertStatus(201)
            ->assertJsonPath('content', 'Hello World!');
    }
}
