<?php

namespace App\Models;

use App\Traits\ActivityLoggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    use HasFactory, SoftDeletes, ActivityLoggable;

    public static $fieldTypes = [
        'text',
        'textarea',
        'number',
        'select',
        'checkbox',
        'radio',
    ];



    public static function getValues($groupKey = 'general')
    {
        return Cache::rememberForever('settings.' . $groupKey, function() use($groupKey) {
            $settingGroup = SettingGroup::with('children.settings')->where('key', $groupKey)->first();
            $settings = $settingGroup->children->pluck('settings')->flatten();
            $values = [];
            foreach ($settings as $setting) {
                $values[$setting->key] = $setting->value;
            }
            return $values;
        });
        
    }

    public function settingGroup()
    {
        return $this->belongsTo(SettingGroup::class);
    }
}
