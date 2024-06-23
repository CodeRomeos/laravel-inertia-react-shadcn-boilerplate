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
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('first_name');
            $table->string('last_name')->nullable();
            $table->string('company_name')->nullable();

            $table->string('email')->nullable();
            $table->string('phone_code')->nullable();
            $table->string('phone')->nullable();

            $table->string('email2')->nullable();
            $table->string('phone2_code')->nullable();
            $table->string('phone2')->nullable();

            $table->foreignId('city_id')->nullOnDelete();
            $table->string('address')->nullable();

            $table->date('dob')->nullable();
            $table->date('marriage_anniversary')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }   

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
