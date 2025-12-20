<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('faculties', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('tenant_id')->index();
            $table->string('keycloak_id')->nullable()->unique();
            $table->string('employee_id')->unique(); // Institutional identifier
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('designation'); // e.g. Assistant Professor, Lecturer
            $table->string('department'); // e.g. Computer Science
            $table->string('specialization')->nullable();
            $table->enum('status', ['ACTIVE', 'ON_LEAVE', 'INACTIVE'])->default('ACTIVE');
            $table->date('joining_date');
            $table->timestamps();

            $table->index(['tenant_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faculties');
    }
};
