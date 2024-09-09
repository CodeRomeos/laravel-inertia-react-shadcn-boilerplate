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
        $menus = Menu::latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();

        return Inertia::render('Admin/Menus/Menus', [
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

    public function edit(Menu $menu)
    {
        $pages = Page::select('id', 'slug', 'title', 'status', 'created_at')->published()->latest()->orderBy('title')->get();

        $menuResource = new MenuResource($menu);
        $menuResource->wrap(null);

        return Inertia::render('Admin/Menus/Menu', [
            'pages' => $pages,
            'menu' => $menuResource,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'slug' => 'required|unique:menus,slug',
        ]);

        $request->merge(['user_id' => auth()->user()->id]);
        $menu = Menu::create($request->all());

        return redirect()->route('admin.menus.edit', $menu->id)->with(['flash_type' => 'success', 'flash_message' => 'Menu created successfully', 'flash_description' => $menu->name]);
    }

    public function update(Request $request, Menu $menu)
    {
        $request->validate([
            'name' => 'required',
            'slug' => 'required|unique:menus,slug,' . $menu->id,
        ]);

        $menu->update($request->all());
        $menu->refresh();

        return redirect()->route('admin.menus.edit', $menu->id)->with(['flash_type' => 'success', 'flash_message' => 'Menu updated successfully', 'flash_description' => $menu->name]);
    }
}
