<?php

namespace App\Http\Controllers\Admin;

use App\Enums\PersonTitle;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Client;
use App\Http\Resources\ClientResource;
use App\Models\Country;
use App\Repositories\CountryRepository;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $clients = Client::latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();
        return Inertia::render('Admin/Clients/Clients', ['clients' => ClientResource::collection($clients)]);
    }

    public function create(CountryRepository $countryRepository)
    {
        return Inertia::render('Admin/Clients/Client', ['personTitles' => PersonTitle::cases(), 'phoneCodes' => $countryRepository->getPhoneCodeOptions()]);
    }

    public function edit($id, CountryRepository $countryRepository)
    {
        $client = Client::findOrFail($id);
        $clientResource = new ClientResource($client);
        $clientResource->wrap(null);
        return Inertia::render('Admin/Clients/Client', ['client' => $clientResource, 'personTitles' => PersonTitle::cases(), 'phoneCodes' => $countryRepository->getPhoneCodeOptions()]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'email' => 'nullable|string',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'company_name' => 'nullable|string',
        ]);

        $client = Client::create($request->all());

        return redirect()->route('clients.edit', $client->id)->with(['flash_type' => 'success', 'flash_message' => 'Client created successfully', 'flash_description' => $client->name]);
    }

    public function update(Request $request, $id)
    {
        $request->validate(['name' => 'required|string',
            'name' => 'nullable|string',
            'email' => 'nullable|string',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'company_name' => 'nullable|string',
        ]);
        $client = Client::findOrFail($id);
        $client->fill($request->all());
        $client->save();
        return redirect()->route('clients.edit', $id)->with(['flash_type' => 'success', 'flash_message' => 'Client updated successfully', 'flash_description' => $client->name]);
    }
}
