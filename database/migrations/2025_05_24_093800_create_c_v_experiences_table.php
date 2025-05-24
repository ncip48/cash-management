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
        Schema::create('cv_experiences', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('cv_id');
            $table->string('position');
            $table->string('company_name');
            $table->enum('employment_type', ['full-time', 'part-time', 'contract', 'internship', 'freelance'])->nullable();
            $table->string('location')->nullable();
            $table->date('start_date');
            $table->date('end_date')->nullable(); // null means "Present"
            $table->text('description')->nullable(); // multiline string, split by newline
            $table->timestamps();
            $table->creatorAndUpdater();
        });
        Schema::table('cv_experiences', function (Blueprint $table) {
            $table->foreign('cv_id')->references('id')->on('cvs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cv_experiences');
    }
};
