<?php

namespace App\Traits;

use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

trait ActivityLoggable {
    use LogsActivity;

    public function getActivitylogOptions(): LogOptions
    {
        $user = auth()->user();
        $title = $this->title ? $this->title : ($this->name ? $this->name : $this->full_name);
        $modelName = class_basename(get_class($this));
        return LogOptions::defaults()
        ->logAll()
        ->logExcept(['password'])
        ->setDescriptionForEvent(function(string $eventName) use($user, $title, $modelName) {
            $eventName = ucwords($eventName);
            return "{$eventName} - {$modelName} - {$title} (#{$this->id}). By User : {$user->full_name} (#{$user->id}).";
        });
    }
}