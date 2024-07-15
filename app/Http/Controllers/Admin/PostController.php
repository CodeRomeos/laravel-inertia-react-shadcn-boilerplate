<?php

namespace App\Http\Controllers\Admin;

use App\Enums\PersonTitle;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Post;
use App\Http\Resources\PostResource;
use App\Models\Country;
use App\Repositories\CountryRepository;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();
        return Inertia::render('Admin/Posts/Posts', ['posts' => PostResource::collection($posts)]);
    }

    public function create(CountryRepository $countryRepository)
    {
        return Inertia::render('Admin/Posts/PostPage', ['personTitles' => PersonTitle::cases(), 'phoneCodes' => $countryRepository->getPhoneCodeOptions()]);
    }

    public function edit($id, CountryRepository $countryRepository)
    {
        $post = Post::findOrFail($id);
        $postResource = new PostResource($post);
        $postResource->wrap(null);
        return Inertia::render('Admin/Posts/PostPage', ['post' => $postResource, 'personTitles' => PersonTitle::cases(), 'phoneCodes' => $countryRepository->getPhoneCodeOptions()]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string|unique:posts,slug',
            'body' => 'nullable|string',
            'status' => 'required|in:0,1',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string'
        ]);

        $request->merge(['user_id' => auth()->user()->id]);

        $post = Post::create($request->all());

        return redirect()->route('admin.posts.edit', $post->id)->with(['flash_type' => 'success', 'flash_message' => 'Post created successfully', 'flash_description' => $post->title]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string|unique:posts,slug,' . $id,
            'body' => 'nullable|string',
            'status' => 'required|in:0,1',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string'
        ]);
        $post = Post::findOrFail($id);
        $post->fill($request->all());
        $post->save();
        return redirect()->route('admin.posts.edit', $id)->with(['flash_type' => 'success', 'flash_message' => 'Post updated successfully', 'flash_description' => $post->title]);
    }
}
