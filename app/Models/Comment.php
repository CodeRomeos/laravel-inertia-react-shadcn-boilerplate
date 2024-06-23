<?php

namespace App\Models;

use App\Traits\ActivityLoggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Comment extends Model
{
    use HasFactory, ActivityLoggable;

    protected $fillable = ['user_id', 'body'];

    function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    function commentable() : MorphTo {
        return $this->morphTo();
    }
}
