<?php

namespace App\Repositories;

use App\Models\Menu;
use App\Models\Page;

class MenuRepository extends BaseRepository
{
    public $model;

    function __construct(Menu $model)
    {
        $this->model = $model;
    }

    public function getPageListForMenu()
    {
        $pages = Page::select('id', 'slug', 'title', 'status', 'created_at')->published()->latest()->orderBy('title')->get();
        $pages->transform(function ($page) {
            return [
                'id' => $page->id,
                'url' => $page->url,
                'label' => $page->title,
                'title' => $page->title,
                'link_type' => 'page',
                'route_name' => 'page',
                'slug' => $page->slug,
                'route_params' => ['slug' => $page->slug],
            ];
        });
        $pages->prepend([
            'id' => 'blog-page',
            'url' => '/blog',
            'label' => 'Blog',
            'title' => 'Blog',
            'link_type' => 'blog',
            'route_name' => 'blog.index',
            'slug' => 'blog',
            'route_params' => [],
        ]);

        return $pages;
    }
}
