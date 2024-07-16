<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    function __invoke($slug) 
    {
        
        $page = Page::where('slug', $slug)->published()->firstOrFail();
        $page->increment('views');

        return Inertia::render('Page', ['page' => $page]);
    }
}
