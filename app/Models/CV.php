<?php

namespace App\Models;

use App\OwnsRecords;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CV extends Model
{
    use SoftDeletes, OwnsRecords, HasUuids;

    protected $primaryKey = 'id';

    protected $table = 'cvs';

    protected $fillable = [
        'name',
        'owner_name',
        'owner_email',
        'owner_phone',
        'owner_address',
        'owner_linkedin',
        'owner_website',
        'owner_summary',
        'template_id',
        'created_by',
        'updated_by',
    ];

    public function template()
    {
        return $this->belongsTo(CVTemplate::class, 'template_id');
    }

    public function created_by()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function experience()
    {
        return $this->hasMany(CvExperience::class, 'cv_id', 'id')->orderBy('created_at', 'desc');
    }

    public function education()
    {
        return $this->hasMany(CvEducation::class, 'cv_id', 'id')->orderBy('created_at', 'desc');
    }

    public function certifications()
    {
        return $this->hasMany(CvCertification::class, 'cv_id', 'id')->orderBy('created_at', 'desc');
    }
}
