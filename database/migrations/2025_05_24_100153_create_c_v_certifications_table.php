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
        Schema::create('cv_certifications', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('cv_id');
            $table->string('title'); // e.g., Sertifikasi AWS
            $table->string('position')->nullable(); // e.g., Peserta, Trainer
            $table->string('location')->nullable(); // e.g., Online, Jakarta
            $table->date('start_date');
            $table->date('end_date')->nullable(); // null means "masih berlaku"
            $table->text('description')->nullable(); // multiline description
            $table->timestamps();
            $table->creatorAndUpdater();
        });
        Schema::table('cv_certifications', function (Blueprint $table) {
            $table->foreign('cv_id')->references('id')->on('cvs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cv_certifications');
    }
};
