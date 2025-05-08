<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class PlanItem extends Model
{
    use HasFactory, HasUuids, SoftDeletes, Notifiable;

    protected $fillable = [
        'plan_id',
        'name',
        'budget',
        'description',
        'is_realized',
        'created_by',
    ];

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }
}
