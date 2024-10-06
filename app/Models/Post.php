<?php

namespace App\Models;

use App\Traits\ActivityLoggable;
use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, ActivityLoggable, SoftDeletes, HasSlug;

    protected $guarded = ['id'];

    public function casts()
    {
        return [
            'created_at' => 'datetime:Y-m-d H:i:s',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function categories()
    {
        return $this->belongsToMany(PostCategory::class, 'post_post_category', 'post_id', 'post_category_id');
    }

    function scopePublished($posts)
    {
        return $posts->where('status', 1);
    }

    function image(): MorphOne
    {
        return $this->morphOne(Attachment::class, 'attachmentable')->where('relation_type', 'image')->latestOfMany();
    }
}
