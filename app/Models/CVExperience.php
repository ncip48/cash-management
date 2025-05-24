<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class CVExperience extends Model
{
    use HasUuids, Notifiable, HasFactory;

    protected $table = 'cv_experiences';

    protected $fillable = [
        'position',
        'company_name',
        'employment_type',
        'location',
        'start_date',
        'end_date',
        'description',
        'cv_id',
        'created_by',
        'updated_by',
    ];

    public function cv()
    {
        return $this->belongsTo(CV::class, 'cv_id', 'id');
    }

    public function getEmploymentTypeAttribute()
    {
        switch ($this->attributes['employment_type']) {
            case 'full-time':
                return 'Full Time';
            case 'part-time':
                return 'Part Time';
            case 'contract':
                return 'Contract';
            case 'internship':
                return 'Internship';
            case 'freelance':
                return 'Freelance';
            default:
                return $this->attributes['employment_type'];
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
