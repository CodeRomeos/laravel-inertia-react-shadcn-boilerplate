<?php

namespace App\Models;

use App\Traits\ActivityLoggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Menu extends Model
{
    use HasFactory, SoftDeletes, ActivityLoggable;

    protected $fillable = [
        'name',
        'slug',
        'user_id',
        'items',
    ];

    protected $casts = [
        'items' => 'array',
    ];

    public function setSlugAttribute($value)
    {
        $this->attributes['slug'] = str()->of(strtolower($value))->slug('-');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
