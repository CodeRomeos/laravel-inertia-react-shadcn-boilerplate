<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Taggable extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = ['id'];

    public function taggable(): MorphTo
    {
        return $this->morphTo();
    }
}
