<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\NoteResource;
use App\Models\User;
use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        $notes = Note::where('user_id', $request->user()->id)->latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();
        return Inertia::render('Admin/Notes/Notes', ['notes' => NoteResource::collection($notes)]);
    }

    public function create()
    {
        return Inertia::render('Admin/Notes/Note');
    }
    public function edit(Request $request, $id)
    {
        $note = Note::where('user_id', $request->user()->id)->findOrFail($id);
        $noteResource = new NoteResource($note);
        $noteResource->wrap(null);
        return Inertia::render('Admin/Notes/Note', ['note' => $noteResource]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'nullable|string'
        ]);

        $request->merge(['user_id' => $request->user()->id]);
        $note = Note::create($request->all());

        return redirect()->route('notes.edit', $note->id)->with(['flash_type' => 'success', 'flash_message' => 'Noted successfully', 'flash_description' => $note->title]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'nullable|string'
        ]);
        $note = Note::where('user_id', $request->user()->id)->findOrFail($id);
        $note->fill($request->all());
        $note->save();
        return redirect()->route('notes.edit', $id)->with(['flash_type' => 'success', 'flash_message' => 'Note updated successfully', 'flash_description' => $note->title]);
    }
}
