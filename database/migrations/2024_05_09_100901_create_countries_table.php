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
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('name', 36);
            $table->string('iso3', 5);
            $table->string('iso2', 5);
            $table->integer('numeric_code');
            $table->string('phone_code', 16);
            $table->string('capital', 20)->nullable();
            $table->string('currency', 5);
            $table->string('currency_name', 39);
            $table->string('currency_symbol', 6);
            $table->string('tld', 3);
            $table->string('region', 8)->nullable();
            $table->string('subregion', 25)->nullable();
            $table->decimal('latitude', 13, 8);
            $table->decimal('longitude', 13, 8);
            $table->string('emoji', 4);
            $table->string('emojiU', 15);
            $table->boolean('status')->default(1);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('countries');
    }
};
