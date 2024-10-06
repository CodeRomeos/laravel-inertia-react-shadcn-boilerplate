<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Log;

abstract class BaseRepository
{

    public $model;

    function __construct($model)
    {
        $this->model = $model;
    }

    function model()
    {
        return $this->model;
    }

    function latest()
    {
        return $this->model->latest();
    }

    function all()
    {
        return $this->model->all();
    }

    function get()
    {
        return $this->model->get();
    }

    function find($id)
    {
        return $this->model->find($id);
    }

    function findOrFail($id)
    {
        return $this->model->findOrFail($id);
    }

    function create($data)
    {
        return $this->model->create($data);
    }

    function update($id, $data)
    {
        return $this->model->find($id)->update($data);
    }

    function delete($id)
    {
        return $this->model->find($id)->delete();
    }

    function paginate($limit)
    {
        return $this->model->paginate($limit);
    }

    function where($column, $value)
    {
        return $this->model->where($column, $value);
    }

    function whereIn($column, $value)
    {
        return $this->model->whereIn($column, $value);
    }

    function whereNotIn($column, $value)
    {
        return $this->model->whereNotIn($column, $value);
    }

    function orderBy($column, $order)
    {
        return $this->model->orderBy($column, $order);
    }

    function first()
    {
        return $this->model->first();
    }

    function uploadAttachments($model, $request, $relationType = 'attachment')
    {
        $count = 0;
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                try {
                    $this->uploadAttachment($model, $file, $relationType);
                    $count++;
                } catch (\Throwable $th) {
                    Log::error($th);
                }
            }
        }

        return $count;
    }

    function uploadAttachment($model, $file, $relationType = 'attachment')
    {
        try {
            $url = $file->store('attachments');
            if ($url) {
                $model->attachments()->create([
                    'user_id' => auth()->user()->id,
                    'name' => $file->getClientOriginalName(),
                    'path' => $file->hashName(),
                    'extension' => $file->getClientOriginalExtension(),
                    'size' => $file->getSize(),
                    'mime_type' => $file->getMimeType(),
                    'url' => $file->store('attachments'),
                    'relation_type' => $relationType,
                ]);
            }
        } catch (\Throwable $th) {
            Log::error($th);
        }
    }

    function uploadImage($model, $request, $relationType = 'image')
    {
        if (!$request->hasFile('image')) {
            return false;
        }
        $file = $request->file('image');

        try {
            $url = $file->store('images');
            if ($url) {
                $model->image()->create([
                    'user_id' => auth()->user()->id,
                    'name' => $file->getClientOriginalName(),
                    'path' => $file->hashName(),
                    'extension' => $file->getClientOriginalExtension(),
                    'size' => $file->getSize(),
                    'mime_type' => $file->getMimeType(),
                    'url' => $file->store('images'),
                    'relation_type' => $relationType,
                ]);
            }
        } catch (\Throwable $th) {
            Log::error($th);
        }
    }

    public function getOptionsForSelect()
    {
        $records = $this->model->all();
        $options = [];

        foreach ($records as $record) {
            $options[] = [
                'id' => $record->id,
                'key' => $record->id,
                'name' => $record->name,
                'value' => $record->id,
                'label' => $record->name,
                'record_name' => $record->name
            ];
        }

        return $options;
    }

    public function getMonthOptionsForSelect()
    {
        $records = range(1, 12);
        $options = [];

        foreach ($records as $record) {
            $month = date('F', mktime(0, 0, 0, $record, 10));
            $options[] = [
                'id' => $record,
                'key' => $record,
                'name' => $month,
                'value' => $record,
                'label' => $month,
                'record_name' => $month
            ];
        }

        return $options;
    }

    public function getPriorityOptionsForSelect()
    {
        $records = ['General Query', 'Hot Query'];
        $options = [];

        foreach ($records as $key => $record) {
            $options[] = [
                'id' => $key,
                'key' => $key,
                'name' => $record,
                'value' => $key,
                'label' => $record,
                'record_name' => $record
            ];
        }

        return $options;
    }
}
