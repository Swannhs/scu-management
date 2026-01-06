<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Social Profiles (Synced from User Service)
        Schema::create('social_profiles', function (Blueprint $table) {
            $table->uuid('id')->primary(); // User ID from User Service
            $table->string('name');
            $table->string('email')->unique();
            $table->string('avatar_url')->nullable();
            $table->string('role')->nullable(); // student, teacher, etc.
            $table->string('tenant_id'); // University ID
            $table->text('bio')->nullable();
            $table->timestamps();
        });

        // 2. Friendships
        Schema::create('friendships', function (Blueprint $table) {
            $table->id();
            $table->uuid('user_id');
            $table->uuid('friend_id');
            $table->string('status')->default('pending'); // pending, accepted, blocked
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('social_profiles')->onDelete('cascade');
            $table->foreign('friend_id')->references('id')->on('social_profiles')->onDelete('cascade');
            $table->unique(['user_id', 'friend_id']);
        });

        // 3. Groups
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('type'); // club, course, department, batch
            $table->string('tenant_id');
            $table->uuid('creator_id')->nullable();
            $table->string('course_id')->nullable(); // Link to Course Service ID if type=course
            $table->timestamps();

            $table->foreign('creator_id')->references('id')->on('social_profiles')->onDelete('set null');
        });

        // 4. Group Members
        Schema::create('group_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('group_id')->constrained()->onDelete('cascade');
            $table->uuid('user_id');
            $table->string('role')->default('member'); // member, admin, moderator
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('social_profiles')->onDelete('cascade');
            $table->unique(['group_id', 'user_id']);
        });

        // 5. Posts
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->uuid('user_id');
            $table->string('tenant_id'); // Optimization for multi-tenant filtering
            $table->foreignId('group_id')->nullable()->constrained()->onDelete('cascade');
            $table->text('content')->nullable();
            $table->json('media_urls')->nullable(); // Array of URLs
            $table->string('visibility')->default('public'); // public, friends, group
            $table->integer('likes_count')->default(0);
            $table->integer('comments_count')->default(0);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('social_profiles')->onDelete('cascade');
            $table->index(['tenant_id', 'visibility']); // Index for feed queries
        });

        // 6. Comments
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_id')->constrained()->onDelete('cascade');
            $table->uuid('user_id');
            $table->foreignId('parent_id')->nullable()->references('id')->on('comments')->onDelete('cascade');
            $table->text('content');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('social_profiles')->onDelete('cascade');
        });

        // 7. Likes
        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            $table->uuid('user_id');
            $table->morphs('likable'); // likable_type (Post/Comment), likable_id
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('social_profiles')->onDelete('cascade');
            $table->unique(['user_id', 'likable_type', 'likable_id']);
        });

        // 8. Conversations (Chat)
        Schema::create('conversations', function (Blueprint $table) {
            $table->id();
            $table->string('type')->default('private'); // private, group
            $table->string('name')->nullable(); // For group chats
            $table->timestamps();
        });

        Schema::create('conversation_participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained()->onDelete('cascade');
            $table->uuid('user_id');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('social_profiles')->onDelete('cascade');
            $table->unique(['conversation_id', 'user_id']);
        });

        // 9. Messages
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained()->onDelete('cascade');
            $table->uuid('sender_id');
            $table->text('content')->nullable();
            $table->string('type')->default('text'); // text, image, file, call
            $table->string('attachment_url')->nullable();
            $table->timestamp('read_at')->nullable();
            $table->timestamps();

            $table->foreign('sender_id')->references('id')->on('social_profiles')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
        Schema::dropIfExists('conversation_participants');
        Schema::dropIfExists('conversations');
        Schema::dropIfExists('likes');
        Schema::dropIfExists('comments');
        Schema::dropIfExists('posts');
        Schema::dropIfExists('group_members');
        Schema::dropIfExists('groups');
        Schema::dropIfExists('friendships');
        Schema::dropIfExists('social_profiles');
    }
};
