<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class PlanUser extends Model
{
    use HasFactory, HasUuids, SoftDeletes, Notifiable;

    protected $fillable = [
        'plan_id',
        'user_id',
    ];

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }
}
