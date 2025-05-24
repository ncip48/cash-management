<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class CVCertification extends Model
{
    use HasUuids, Notifiable, HasFactory;

    protected $table = 'cv_certifications';

    protected $fillable = [
        'cv_id',
        'title',
        'position',
        'location',
        'start_date',
        'end_date',
        'description',
        'created_by',
        'updated_by',
    ];

    public function cv()
    {
        return $this->belongsTo(CV::class, 'cv_id', 'id');
    }

    public function getEndDateAttribute()
    {
        return $this->end_date ?? 'Sekarang';
    }
}
