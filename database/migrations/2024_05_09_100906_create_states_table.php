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
        Schema::create('states', function (Blueprint $table) {
            $table->id();
            $table->string('name', 56);
            $table->foreignId('country_id')->constrained('countries')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string("country_code", 10);
            $table->string("country_name", 36);
            $table->string("state_code", 5);
            $table->string("type", 45)->nullable();
            $table->decimal('latitude', 13, 8)->nullable();
            $table->decimal('longitude', 13, 8)->nullable();
            $table->string("gst_code", 3)->nullable();
            $table->boolean("status")->default(1);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('states');
    }
};
