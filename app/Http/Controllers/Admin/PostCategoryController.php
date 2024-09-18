<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Http\Resources\PostCategoryResource;
use App\Models\PostCategory;
use App\Repositories\PostCategoryRepository;
use Illuminate\Http\Request;

class PostCategoryController extends Controller
{
    public function index(Request $request)
    {
        $postCategories = PostCategory::with('image')->latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();
        return Inertia::render('Admin/PostCategories/PostCategories', ['postCategories' => PostCategoryResource::collection($postCategories)]);
    }

    public function create()
    {
        return Inertia::render('Admin/PostCategories/PostCategory');
    }

    public function edit($id)
    {
        $postCategory = PostCategory::with('image')->findOrFail($id);
        $postCategoryResource = new PostCategoryResource($postCategory);
        $postCategoryResource->wrap(null);
        return Inertia::render('Admin/PostCategories/PostCategory', ['postCategory' => $postCategoryResource]);
    }

    public function store(Request $request, PostCategoryRepository $postCategoryRepository)
    {
        $request->validate([
            'name' => 'required|string',
            'slug' => 'required|string',
            'description' => 'nullable|string',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
            'image' => 'nullable|image'
        ]);

        $request->merge(['user_id' => auth()->user()->id]);

        $postCategory = PostCategory::create($request->all());
        $postCategoryRepository->uploadImage($postCategory, $request, 'image');

        return redirect()->route('admin.postCategories.edit', $postCategory->id)->with(['flash_type' => 'success', 'flash_message' => 'Post category created successfully', 'flash_description' => $postCategory->name]);
    }

    public function update(Request $request, PostCategoryRepository $postCategoryRepository, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'slug' => 'required|string',
            'description' => 'nullable|string',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string'
        ]);
        
        $postCategory = PostCategory::findOrFail($id);
        $postCategory->fill($request->all());
        $postCategory->save();
        $postCategoryRepository->uploadImage($postCategory, $request, 'image');
        
        return redirect()->route('admin.postCategories.edit', $id)->with(['flash_type' => 'success', 'flash_message' => 'Post category updated successfully', 'flash_description' => $postCategory->name]);
    }
}
