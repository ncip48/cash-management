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
        Schema::create('plan_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('plan_id');
            $table->string('name');
            $table->decimal('budget', 15, 2); // Example: up to 999 trillion
            $table->text('description')->nullable();
            $table->boolean('is_realized')->default(false);
            $table->timestamps();
            $table->softDeletes();
            $table->creatorAndUpdater();
        });
        Schema::table('plan_items', function (Blueprint $table) {
            $table->foreign('plan_id')->references('id')->on('plans')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plan_items');
    }
};
