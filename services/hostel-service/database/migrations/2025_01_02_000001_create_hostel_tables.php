<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Hostels
        Schema::create('hostels', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('tenant_id')->index();
            $table->string('name');
            $table->string('type'); // Boys, Girls, Co-ed
            $table->string('address')->nullable();
            $table->uuid('warden_id')->nullable(); // Staff/User ID

            $table->timestamps();
            $table->softDeletes();
        });

        // Rooms
        Schema::create('rooms', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('tenant_id')->index();
            $table->uuid('hostel_id');

            $table->string('room_number');
            $table->integer('capacity');
            $table->integer('floor')->default(0);
            $table->string('type')->default('standard'); // AC, Non-AC
            $table->decimal('fee_per_term', 12, 2)->default(0);

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('hostel_id')->references('id')->on('hostels')->onDelete('cascade');
            $table->unique(['tenant_id', 'hostel_id', 'room_number']);
        });

        // Allotments
        Schema::create('hostel_allotments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('tenant_id')->index();
            $table->uuid('student_id')->index();
            $table->uuid('room_id');

            $table->date('check_in_date');
            $table->date('check_out_date')->nullable();
            $table->string('status')->default('active'); // active, vacating, vacated

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('room_id')->references('id')->on('rooms');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hostel_allotments');
        Schema::dropIfExists('rooms');
        Schema::dropIfExists('hostels');
    }
};
