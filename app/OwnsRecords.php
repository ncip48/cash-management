<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;

trait OwnsRecords
{
    // Add local scope
    public function scopeOwned(Builder $query, $userId = null)
    {
        return $query->where('created_by', $userId ?? Auth::id());
    }
}
