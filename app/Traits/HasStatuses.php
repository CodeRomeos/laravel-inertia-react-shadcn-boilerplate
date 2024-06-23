<?php

namespace App\Traits;

use App\Models\Status;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

trait HasStatuses {

    function statuses() : MorphMany {
        return $this->morphMany(Status::class, 'statusable')->latest();
    }

    function latestStatus() : MorphOne {
        return $this->morphOne(Status::class, 'statusable')->latestOfMany();
    }
}