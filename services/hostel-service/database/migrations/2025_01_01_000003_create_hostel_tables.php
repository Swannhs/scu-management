<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hostels', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('tenant_id')->index();
            $table->string('name');
            $table->string('type'); // BOYS, GIRLS, MIXED
            $table->string('address')->nullable();
            $table->integer('capacity')->default(0);
            $table->timestamps();
        });

        Schema::create('rooms', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('tenant_id')->index();
            $table->foreignUuid('hostel_id')->constrained()->onDelete('cascade');
            $table->string('room_number');
            $table->string('room_type'); // SINGLE, DOUBLE, TRIPLE
            $table->integer('capacity');
            $table->decimal('monthly_rent', 10, 2);
            $table->enum('status', ['AVAILABLE', 'FULL', 'MAINTENANCE'])->default('AVAILABLE');
            $table->timestamps();
        });

        Schema::create('allotments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('tenant_id')->index();
            $table->foreignUuid('room_id')->constrained();
            $table->uuid('student_id'); // From student-service
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->enum('status', ['ACTIVE', 'COMPLETED', 'CANCELLED'])->default('ACTIVE');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('allotments');
        Schema::dropIfExists('rooms');
        Schema::dropIfExists('hostels');
    }
};
