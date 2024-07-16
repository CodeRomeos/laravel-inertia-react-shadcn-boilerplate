<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();
        $totalPostsCount = Post::count();
        $publishedPostCount = Post::published()->count();
        $totalPagesCount = Page::count();
        $publishedPageCount = Page::published()->count();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalPostsCount' => $totalPostsCount,
                'publishedPostCount' => $publishedPostCount,
                'totalPagesCount' => $totalPagesCount,
                'publishedPageCount' => $publishedPageCount
            ]
        ]);
    }
}
