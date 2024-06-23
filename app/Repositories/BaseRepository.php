<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Log;

abstract class BaseRepository {
    
    public $model;

    function __construct($model) {
        $this->model = $model;    
    }

    function model() {
        return $this->model;
    }

    function latest() {
        return $this->model->latest();
    }

    function all() {
        return $this->model->all();
    }

    function get() {
        return $this->model->get();
    }

    function find($id) {
        return $this->model->find($id);
    }
    
    function findOrFail($id) {
        return $this->model->findOrFail($id);
    }

    function create($data) {
        return $this->model->create($data);
    }

    function update($id, $data) {
        return $this->model->find($id)->update($data);
    }

    function delete($id) {
        return $this->model->find($id)->delete();
    }

    function paginate($limit) {
        return $this->model->paginate($limit);
    }

    function where($column, $value) {
        return $this->model->where($column, $value);
    }

    function whereIn($column, $value) {
        return $this->model->whereIn($column, $value);
    }

    function whereNotIn($column, $value) {
        return $this->model->whereNotIn($column, $value);
    }

    function orderBy($column, $order) {
        return $this->model->orderBy($column, $order);
    }

    function first() {
        return $this->model->first();
    }

    function uploadAttachments($model, $request)
    {
        $count = 0;
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                try {
                    $this->uploadAttachment($model, $file);
                    $count++;
                } catch (\Throwable $th) {
                    Log::error($th);
                }
            }
        }

        return $count;
    }

    function uploadAttachment($model, $file) {
        try {
            $url = $file->store('public/attachments');
            if ($url) {
                $model->attachments()->create([
                    'user_id' => auth()->user()->id,
                    'name' => $file->getClientOriginalName(),
                    'path' => $file->hashName(),
                    'extension' => $file->getClientOriginalExtension(),
                    'size' => $file->getSize(),
                    'mime_type' => $file->getMimeType(),
                    'url' => $file->store('attachments'),
                ]);
            }
        } catch (\Throwable $th) {
            Log::error($th);
        }
    }
}