<?php

namespace App\Models;

use App\Traits\ActivityLoggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use HasFactory, ActivityLoggable, SoftDeletes;

    protected $guarded = ['id'];

    protected $appends = ['full_name'];

    /**
     * Get the user's full name.
     */
    protected function getFullNameAttribute()
    {
        return ucfirst(trim($this->first_name . ' ' . $this->last_name));
    }
}
