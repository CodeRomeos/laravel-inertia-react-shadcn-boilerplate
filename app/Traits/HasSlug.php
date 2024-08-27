<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasSlug {

    public function scopeSlug($q, $slug)
    {
        return $q->where('slug', $slug);
    }

    public function setSlugAttribute($value)
    {
        if($this->id == null) {
            $count = $this->where('slug', 'like', $value.'%')->count();
        } else {
            if($value == $this->slug) return;
            
            $count = $this->where('slug', 'like', $value.'%')->where('id', '!=', $this->id)->count();
        }
        
        if($count == 0) {
            $this->attributes['slug'] = $value;
        }
        else {
            $count++;
            $this->attributes['slug'] = $count ? "{$value}-{$count}" : $value;
        }
    }
}