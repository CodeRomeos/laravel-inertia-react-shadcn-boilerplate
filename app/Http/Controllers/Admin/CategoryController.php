<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Category;
use App\Http\Resources\CategoryResource;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();
        return Inertia::render('Admin/Categories/Categories', ['categories' => CategoryResource::collection($categories)]);
    }


    public function create()
    {
        return Inertia::render('Admin/Categories/Category');
    }

    public function edit($id)
    {
        $category = Category::findOrFail($id);
        $categoryResource = new CategoryResource($category);
        $categoryResource->wrap(null);
        return Inertia::render('Admin/Categories/Category', ['category' => $categoryResource]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'slug' => 'required|string|unique:categories,slug',
            'description' => 'nullable|string'
        ]);

        $category = Category::create($request->all());

        return redirect()->route('categories.edit', $category->id)->with(['flash_type' => 'success', 'flash_message' => 'Category created successfully', 'flash_description' => $category->name]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'slug' => 'sometimes|string|unique:categories,slug,' . $id,
            'description' => 'nullable|string'
        ]);
        $category = Category::findOrFail($id);
        $category->fill($request->all());
        $category->save();
        return redirect()->route('categories.edit', $id)->with(['flash_type' => 'success', 'flash_message' => 'Category updated successfully', 'flash_description' => $category->name]);
    }
}
