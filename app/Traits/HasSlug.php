<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasSlug {
    public function setSlugAttribute($value)
    {
        $count = $this->where('slug', 'like', $value.'%')->where('id', '!=', $this->id)->count();

        $this->attributes['slug'] = $count ? "{$value}-{$count}" : $value;
    }
}