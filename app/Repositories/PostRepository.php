<?php

namespace App\Repositories;

use App\Models\Post;
use Illuminate\Support\Facades\Log;

class PostRepository extends BaseRepository
{
    public $model;

    function __construct(Post $model)
    {
        $this->model = $model;
    }
}
