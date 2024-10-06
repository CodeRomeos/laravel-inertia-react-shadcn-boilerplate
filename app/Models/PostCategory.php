<?php

namespace App\Models;

use App\Traits\ActivityLoggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class PostCategory extends Model
{
    use HasFactory, SoftDeletes, ActivityLoggable;

    protected $guarded = ['id'];

    public function posts()
    {
        return $this->belongsToMany(Post::class, 'post_post_category', 'post_category_id', 'post_id')->latest();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    function image(): MorphOne
    {
        return $this->morphOne(Attachment::class, 'attachmentable')->where('relation_type', 'image')->latestOfMany();
    }
}
