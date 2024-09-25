<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\MenuResource;
use App\Models\Menu;
use App\Repositories\MenuRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class MenuController extends Controller
{

    public function index(Request $request)
    {
        $menus = Menu::select('id', 'name', 'slug', 'created_at', 'updated_at')->latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();

        return Inertia::render('Admin/Menus/Menus', [
            'menus' => MenuResource::collection($menus),
        ]);
    }

    public function create(MenuRepository $menuRepository)
    {
        return Inertia::render('Admin/Menus/Menu', [
            'pages' => $menuRepository->getPageListForMenu(),
        ]);
    }

    public function edit(Menu $menu, MenuRepository $menuRepository)
    {
        $menuResource = new MenuResource($menu);
        $menuResource->wrap(null);

        return Inertia::render('Admin/Menus/Menu', [
            'pages' => $menuRepository->getPageListForMenu(),
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
        
        Cache::forget("menus.{$menu->slug}");
        $menu->update($request->all());
        $menu->refresh();

        return redirect()->route('admin.menus.edit', $menu->id)->with(['flash_type' => 'success', 'flash_message' => 'Menu updated successfully', 'flash_description' => $menu->name]);
    }
}
