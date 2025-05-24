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
        Schema::create('cv_educations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('cv_id');
            $table->enum('degree', ['high-school-a', 'high-school-b', 'associate', 'bachelor-a', 'bachelor-b', 'master', 'doctorate', 'other']);
            $table->string('school_name');
            $table->string('location')->nullable();
            $table->date('start_date');
            $table->date('end_date')->nullable(); // null means "Present"
            $table->decimal('gpa', 3, 2)->nullable(); // example: 3.75
            $table->text('description')->nullable(); // multiline string, split by newline
            $table->timestamps();
            $table->creatorAndUpdater();
        });
        Schema::table('cv_educations', function (Blueprint $table) {
            $table->foreign('cv_id')->references('id')->on('cvs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cv_educations');
    }
};
