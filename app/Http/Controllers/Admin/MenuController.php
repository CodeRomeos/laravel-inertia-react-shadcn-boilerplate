<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\MenuResource;
use App\Models\Menu;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{

    public function index(Request $request)
    {
        $menus = Menu::latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();;
        return Inertia::render('Admin/Menu/Index', [
            'menus' => MenuResource::collection($menus),
        ]);
    }

    public function create()
    {
        $pages = Page::select('id', 'slug', 'title', 'status', 'created_at')->published()->latest()->orderBy('title')->get();
        return Inertia::render('Admin/Menus/Menu', [
            'pages' => $pages
        ]);
    }
}
