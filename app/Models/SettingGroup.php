<?php

namespace App\Models;

use App\Traits\ActivityLoggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SettingGroup extends Model
{
    use HasFactory, SoftDeletes, ActivityLoggable;

    protected $fillable = [
        'parent_id',
        'key',
        'name',
        'description',
        'order',
    ];


    public function parent()
    {
        return $this->belongsTo(SettingGroup::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(SettingGroup::class, 'parent_id')->orderBy('order', 'ASC')->orderBy('name', 'ASC');
    }

    public function settings()
    {
        return $this->hasMany(Setting::class)->orderBy('order', 'ASC')->orderBy('name', 'ASC');
    }
}
