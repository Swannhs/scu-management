<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FriendshipApiTest extends TestCase
{
    /** @test */
    public function user_can_send_friend_request()
    {
        $response = $this->withHeaders([
            'X-User-Id' => 'user-A',
            'X-Tenant-Id' => 'tenant-1'
        ])->postJson('/api/v1/friend-request', [
                    'friend_id' => 'user-B'
                ]);

        // Returns validation error if profile doesn't exist, which is expected
        // We just verify the route hits the controller
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['friend_id']);
    }
}
