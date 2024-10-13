<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Post;
use App\Http\Resources\PostResource;
use App\Models\PostCategory;
use App\Repositories\PostRepository;
use App\Http\Traits\DeleteableActions;
use Illuminate\Http\Request;

class PostController extends Controller
{
    use DeleteableActions;

    public $repository;
    public $resource = 'App\Http\Resources\PostResource';
    public $indexComponent = 'Admin/Posts/Posts';
    public $singular = 'post';
    public $plural = 'posts';

    public function __construct(PostRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index(Request $request)
    {
        $collection = $this->repository->model->with('image')->latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();
        $totalCount = $this->repository->model->count();
        $totalTrashedCount = Post::onlyTrashed()->count();
        return Inertia::render('Admin/Posts/Posts', [
            'collection' => PostResource::collection($collection),
            'totalCount' => $totalCount,
            'totalTrashedCount' => $totalTrashedCount,
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
            'category_ids.*' => 'exists:post_categories,id',
            'tag_ids' => 'sometimes|required|array',
            'tag_ids.*' => 'required|integer|exists:tags,id'
        ]);

        $request->merge(['user_id' => auth()->user()->id]);

        $post = Post::create($request->all());
        $postRepository->uploadImage($post, $request, 'image');
        $post->categories()->sync($request->get('category_ids'));
        $post->tags()->sync($request->get('tag_ids'));

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
            'category_ids.*' => 'exists:post_categories,id',
            'tag_ids' => 'sometimes|required|array',
            'tag_ids.*' => 'required|integer|exists:tags,id'
        ]);
        $post = Post::findOrFail($id);
        $post->fill($request->all());
        $post->save();
        $postRepository->uploadImage($post, $request, 'image');
        $post->categories()->sync($request->get('category_ids'));
        $post->tags()->sync($request->get('tag_ids'));
        return redirect()->route('admin.posts.edit', $id)->with(['flash_type' => 'success', 'flash_message' => 'Post updated successfully', 'flash_description' => $post->title]);
    }
}
