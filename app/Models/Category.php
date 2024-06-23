<?php

namespace App\Models;

use App\Traits\ActivityLoggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes, ActivityLoggable;

    protected $fillable = ['name', 'slug'];

    function parent() : BelongsTo {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    function children() : HasMany {
        return $this->hasMany(Category::class, 'parent_id');
    }
}
