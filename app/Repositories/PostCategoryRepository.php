<?php

namespace App\Repositories;

use App\Models\PostCategory;
use Illuminate\Support\Facades\Log;

class PostCategoryRepository extends BaseRepository
{
    public $model;

    function __construct(PostCategory $model)
    {
        $this->model = $model;
    }
}
