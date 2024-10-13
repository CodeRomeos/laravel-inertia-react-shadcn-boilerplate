<?php

namespace App\Repositories;

use App\Models\Tag;
use Illuminate\Support\Facades\Log;

class TagRepository extends BaseRepository
{
    public $model;

    function __construct(Tag $model)
    {
        $this->model = $model;
    }
}
