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
        $posts = Post::with('image', 'categories')->latest()->published();
        if($request->has('category')) {
            $posts->whereHas('categories', function($query) use ($request) {
                $query->where('slug', $request->get('category'));
            });
        }
        $posts = $posts->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();
        
        return Inertia::render('Blog/Blog', ['posts' => PostResource::collection($posts)]);
    }

    public function show($slug)
    {
        $post = Post::with('image', 'categories')->where('slug', $slug)->published()->firstOrFail();
        
        return Inertia::render('Blog/Post', ['post' => new PostResource($post)]);
    }
}
