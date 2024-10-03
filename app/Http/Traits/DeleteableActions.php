<?php

namespace App\Http\Traits;

use Inertia\Inertia;

trait DeleteableActions
{
    public function trashed()
    {
        $collection = $this->repository->model->onlyTrashed()->latest()->paginate(config('app.pagination_limit'));
        $totalCount = $this->repository->model->count();
        $totalTrashedCount = $this->repository->model->onlyTrashed()->count();
        return Inertia::render($this->indexComponent, [
            'collection' => $this->resource::collection($collection),
            'totalCount' => $totalCount,
            'totalTrashedCount' => $totalTrashedCount,
        ]);
    }

    public function delete($id)
    {
        $model = $this->model->findOrFail($id);
        $id = $model->id;
        $model->delete();
        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => $this->singularName . ' deleted successfully', 'flash_description' => 'With id ' . $id]);
    }

    public function deletePermanently($id)
    {
        $model = $this->model->withTrashed()->findOrFail($id);
        $id = $model->id;
        $model->forceDelete();
        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => $this->singularName . ' deleted permanently.', 'flash_description' => 'With id ' . $id]);
    }

    public function restore($id)
    {
        $model = $this->model->withTrashed()->findOrFail($id);
        $id = $model->id;
        $model->restore();
        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => $this->singularName . ' restored successfully.', 'flash_description' => 'With id ' . $id]);
    }
}