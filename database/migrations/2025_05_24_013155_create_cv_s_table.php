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
        Schema::create('cvs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('template_id');
            $table->string('name');
            $table->string('owner_name');
            $table->string('owner_email');
            $table->string('owner_phone');
            $table->string('owner_address');
            $table->string('owner_linkedin');
            $table->string('owner_website');
            $table->longText('owner_summary');
            $table->enum('language', ['en', 'id']);
            $table->timestamps();
            $table->softDeletes();
            $table->creatorAndUpdater();
        });
        Schema::table('cvs', function (Blueprint $table) {
            $table->foreign('template_id')->references('id')->on('cv_templates')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cvs');
    }
};
