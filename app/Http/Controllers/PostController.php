<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::latest()->published()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();
        
        return Inertia::render('Blog/Blog', ['posts' => PostResource::collection($posts)]);
    }

    public function show($slug)
    {
        $post = Post::where('slug', $slug)->published()->firstOrFail();
        
        return Inertia::render('Blog/Post', ['post' => new PostResource($post)]);
    }
}
