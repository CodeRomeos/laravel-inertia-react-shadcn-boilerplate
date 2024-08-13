<?php

namespace App\Http\Controllers\Admin;

use App\Enums\PersonTitle;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Page;
use App\Http\Resources\PageResource;
use App\Models\Country;
use App\Repositories\CountryRepository;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index(Request $request)
    {
        $pages = Page::latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();
        return Inertia::render('Admin/Pages/Pages', ['pages' => PageResource::collection($pages)]);
    }

    public function create(CountryRepository $countryRepository)
    {
        return Inertia::render('Admin/Pages/PuckPage', ['personTitles' => PersonTitle::cases(), 'phoneCodes' => $countryRepository->getPhoneCodeOptions()]);
    }

    public function edit($id, CountryRepository $countryRepository)
    {
        $page = Page::findOrFail($id);
        $pageResource = new PageResource($page);
        $pageResource->wrap(null);
        return Inertia::render('Admin/Pages/PuckPage', ['page' => $pageResource, 'personTitles' => PersonTitle::cases(), 'phoneCodes' => $countryRepository->getPhoneCodeOptions()]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string|unique:pages,slug',
            'body' => 'nullable',
            'status' => 'required|in:0,1',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string'
        ]);

        $request->merge(['user_id' => auth()->user()->id]);

        $page = Page::create($request->all());

        return redirect()->route('admin.pages.edit', $page->id)->with(['flash_type' => 'success', 'flash_message' => 'Page created successfully', 'flash_description' => $page->title]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string|unique:pages,slug,' . $id,
            'body' => 'nullable',
            'puck_body' => 'nullable',
            'status' => 'required|in:0,1',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string'
        ]);
        $page = Page::findOrFail($id);
        $page->fill($request->all());
        $page->save();
        $page->refresh();
        return redirect()->route('admin.pages.edit', $id)->with(['flash_type' => 'success', 'flash_message' => 'Page updated successfully', 'flash_description' => $page->title]);
    }
}
