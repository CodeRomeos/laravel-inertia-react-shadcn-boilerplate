<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);
        $data['created_at_string'] = $this->created_at->toDateTimeString();
        $data['updated_at_string'] = $this->updated_at->toDateTimeString();
        $this->whenLoaded('categories') && $data['categories'] = CategoryResource::collection($this->categories);
        return $data;
    }
}
