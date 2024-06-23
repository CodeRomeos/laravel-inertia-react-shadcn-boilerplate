<?php

namespace App\Models;

use App\Enums\ModelStatus;
use App\Traits\ActivityLoggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Status extends Model
{
    use HasFactory, ActivityLoggable, SoftDeletes;

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'status' => ModelStatus::class,
        ];
    }

    function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    function statusable() : MorphTo {
        return $this->morphTo();
    }
}
