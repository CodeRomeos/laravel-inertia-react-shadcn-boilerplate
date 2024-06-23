<?php

namespace App\Models;

use App\Traits\ActivityLoggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Note extends Model
{
    use HasFactory, ActivityLoggable;

    protected $fillable = ['title', 'content', 'user_id'];

    function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }
}
