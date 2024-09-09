<?php

namespace App\Models;

use App\Traits\ActivityLoggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Cache;

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

    protected static function booted(): void
    {
        static::updated(function (Model $model) {
            Cache::forget("menus.{$model->slug}");
        });
    }

    public function setSlugAttribute($value)
    {
        $this->attributes['slug'] = str()->of(strtolower($value))->slug('-');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function getMenu($slug)
    {
        return Cache::rememberForever("menus.{$slug}", function () use ($slug) {
            return self::where('slug', $slug)->first();
        });
    }
}
