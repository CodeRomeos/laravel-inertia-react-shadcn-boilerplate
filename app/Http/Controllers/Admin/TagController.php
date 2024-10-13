<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\TagResource;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagController extends Controller
{

    public function index(Request $request)
    {
        $tags = Tag::latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();
        return Inertia::render('Admin/Tags/Tags', ['tags' => TagResource::collection($tags)]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $tag = Tag::create($request->all());

        return redirect()->route('admin.tags.index', $tag->id)->with(['flash_type' => 'success', 'flash_message' => 'Tag created successfully', 'flash_description' => $tag->name]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $tag = Tag::findOrFail($id);
        $tag->fill($request->all());
        $tag->save();

        return redirect()->route('admin.tags.index', $tag->id)->with(['flash_type' => 'success', 'flash_message' => 'Tag updated successfully', 'flash_description' => $tag->name]);
    }
}
