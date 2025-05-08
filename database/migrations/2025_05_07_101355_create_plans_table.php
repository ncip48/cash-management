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
        Schema::create('plans', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->enum('visibility', ['private', 'shared_all', 'shared_users'])->default('private');
            $table->date('estimation_date')->nullable();
            $table->boolean('is_realized')->default(false);
            $table->timestamps();
            $table->softDeletes();
            $table->creatorAndUpdater();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
