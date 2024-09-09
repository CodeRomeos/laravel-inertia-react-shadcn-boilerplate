<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomepageController extends Controller
{
    public function __invoke()
    {
        $page = Page::slug('home')->firstOrFail();
        $page->increment('views');

        return Inertia::render('Homepage', ['page' => $page]);
    }
}
