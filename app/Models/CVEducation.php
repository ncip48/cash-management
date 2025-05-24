<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class CVEducation extends Model
{
    use HasUuids, Notifiable, HasFactory;

    protected $table = 'cv_educations';

    protected $fillable = [
        'cv_id',
        'degree',
        'school_name',
        'location',
        'start_date',
        'end_date',
        'gpa',
        'description',
        'created_by',
        'updated_by',
    ];

    public function cv()
    {
        return $this->belongsTo(CV::class);
    }

    public function getDegreeAttribute()
    {
        switch ($this->attributes['degree']) {
            case 'high-school-a':
                return 'SMA';
            case 'high-school-b':
                return 'SMK';
            case 'associate':
                return 'D3';
            case 'bachelor-a':
                return 'D4';
            case 'bachelor-b':
                return 'S1';
            case 'master':
                return 'S2';
            case 'doctorate':
                return 'S3';
            case 'other':
                return 'Other';
        }
    }

    public function getEndDateAttribute()
    {
        if (!$this->attributes['end_date']) {
            return 'Sekarang';
        }
        return date('F Y', strtotime($this->attributes['end_date']));
    }

    public function getStartDateAttribute()
    {
        if (!$this->attributes['start_date']) {
            return 'Sekarang';
        }
        return date('F Y', strtotime($this->attributes['start_date']));
    }
}
