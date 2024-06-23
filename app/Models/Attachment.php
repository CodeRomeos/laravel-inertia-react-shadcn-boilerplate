<?php

namespace App\Models;

use App\Traits\ActivityLoggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attachment extends Model
{
    use HasFactory, SoftDeletes, ActivityLoggable;

    protected $guarded = [];

    function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    function attachmentable() : MorphTo {
        return $this->morphTo();
    }
}
