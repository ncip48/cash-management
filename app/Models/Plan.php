<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Plan extends Model
{
    use HasFactory, Notifiable, HasUuids, SoftDeletes;

    protected $appends = ['is_mine'];


    protected $fillable = [
        'name',
        'visibility',
        'estimation_date',
        'is_realized',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function sharedUsers()
    {
        return $this->belongsToMany(User::class, 'plan_user');
    }

    public function isAccessibleBy(User $user): bool
    {
        return match ($this->visibility) {
            'shared_all' => true,
            'shared_users' => $this->sharedUsers->contains($user->id),
            default => $this->created_by === $user->id,
        };
    }

    public function items()
    {
        return $this->hasMany(PlanItem::class);
    }

    public function getIsMineAttribute()
    {
        return auth()->id() === $this->created_by;
    }
}
