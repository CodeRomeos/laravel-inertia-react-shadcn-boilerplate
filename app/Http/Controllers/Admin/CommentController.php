<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AccountResource;
use App\Models\Client;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'body' => 'required|string',
            'model_type' => 'required|string|in:clients',
            'model_id' => 'required|integer',
        ]);

        $user = auth()->user();
        $model = null;

        if($request->model_type == 'clients') {
            $model = Client::findOrFail($request->model_id);
        }

        if(!$model) {
            return redirect()->back()->with(['flash_type' => 'error', 'flash_message' => 'Invalid data while creating comment.']);
        }

        $model->comments()->create(['body' => $request->body, 'user_id' => auth()->id() ]);

        if ($request->model_type == 'clients') {
            activity()
                ->causedBy($user)
                ->performedOn($model)
                ->event('attachment_uploaded')
                ->log('Comment added - Clients - ' . $model->title . ' (#' . $model->id . '). By User : ' . $user->full_name . ' (#' . $user->id . ')');
        }

        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Comment added successfully']);
    }
}
