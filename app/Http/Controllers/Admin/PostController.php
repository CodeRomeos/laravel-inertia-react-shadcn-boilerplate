<?php

namespace App\Http\Controllers\Admin;

use App\Enums\PersonTitle;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Post;
use App\Http\Resources\PostResource;
use App\Models\PostCategory;
use App\Repositories\PostRepository;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::with('image')->latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();
        $totalPostCount = Post::count();
        $totalTrashedPostCount = Post::onlyTrashed()->count();
        return Inertia::render('Admin/Posts/Posts', [
            'posts' => PostResource::collection($posts),
            'totalPostCount' => $totalPostCount,
            'totalTrashedPostCount' => $totalTrashedPostCount,
        ]);
    }

    public function create()
    {
        $postCategories = PostCategory::select('id', 'name')->orderBy('name')->get();

        return Inertia::render('Admin/Posts/PostPage', ['postCategories' => $postCategories]);
    }

    public function edit($id)
    {
        $post = Post::with('image', 'categories')->findOrFail($id);
        $postResource = new PostResource($post);
        $postResource->wrap(null);
        $postCategories = PostCategory::select('id', 'name')->orderBy('name')->get();
        return Inertia::render('Admin/Posts/PostPage', ['post' => $postResource, 'postCategories' => $postCategories]);
    }

    public function store(Request $request, PostRepository $postRepository)
    {
        $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string',
            'body' => 'nullable|string',
            'status' => 'required|in:0,1',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
            'image' => 'nullable|image',
            'category_ids' => 'required|array',
            'category_ids.*' => 'exists:post_categories,id'
        ]);

        $request->merge(['user_id' => auth()->user()->id]);

        $post = Post::create($request->all());
        $postRepository->uploadImage($post, $request, 'image');
        $post->categories()->sync($request->get('category_ids'));

        return redirect()->route('admin.posts.edit', $post->id)->with(['flash_type' => 'success', 'flash_message' => 'Post created successfully', 'flash_description' => $post->title]);
    }

    public function update(Request $request, PostRepository $postRepository, $id)
    {
        $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string',
            'body' => 'nullable|string',
            'status' => 'required|in:0,1',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
            'image' => 'nullable|image',
            'category_ids' => 'required|array',
            'category_ids.*' => 'exists:post_categories,id'
        ]);
        $post = Post::findOrFail($id);
        $post->fill($request->all());
        $post->save();
        $postRepository->uploadImage($post, $request, 'image');
        $post->categories()->sync($request->get('category_ids'));
        return redirect()->route('admin.posts.edit', $id)->with(['flash_type' => 'success', 'flash_message' => 'Post updated successfully', 'flash_description' => $post->title]);
    }

    public function trashed()
    {
        $posts = Post::onlyTrashed()->latest()->paginate(config('app.pagination_limit'));
        $totalPostCount = Post::count();
        $totalTrashedPostCount = Post::onlyTrashed()->count();
        return Inertia::render('Admin/Posts/Posts', [
            'posts' => PostResource::collection($posts),
            'totalPostCount' => $totalPostCount,
            'totalTrashedPostCount' => $totalTrashedPostCount,
        ]);
    }

    public function delete($id)
    {
        $post = Post::findOrFail($id);
        $title = $post->title;
        $id = $post->id;
        $post->delete();
        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Post deleted successfully', 'flash_description' => $title . ' with id ' . $id]);
    }

    public function deletePermanently($id)
    {
        $post = Post::withTrashed()->findOrFail($id);
        $title = $post->title;
        $id = $post->id;
        $post->forceDelete();
        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Post deleted permanently.', 'flash_description' => $title . ' with id ' . $id]);
    }

    public function restore($id)
    {
        $post = Post::withTrashed()->findOrFail($id);
        $title = $post->title;
        $id = $post->id;
        $post->restore();
        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Post restored successfully.', 'flash_description' => $title . ' with id ' . $id]);
    }
}
