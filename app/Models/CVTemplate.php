<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CVTemplate extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $table = 'cv_templates';

    protected $fillable = [
        'name',
        'preview',
        'path',
        'is_active',
    ];
}
