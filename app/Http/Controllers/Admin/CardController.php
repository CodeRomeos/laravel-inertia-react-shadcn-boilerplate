<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CardResource;
use Inertia\Inertia;
use App\Models\Card;
use App\Models\CardType;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function index(Request $request)
    {
        $cards = Card::latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();
        return Inertia::render('Admin/Cards/Cards', ['cards' => CardResource::collection($cards)]);
    }

    public function create()
    {
        return Inertia::render('Admin/Cards/Card');
    }

    public function edit($id)
    {
        $card = Card::findOrFail($id);
        $cardResource = new CardResource($card);
        $cardResource->wrap(null);
        return Inertia::render('Admin/Cards/Card', ['card' => $cardResource]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $card = Card::create($request->all());

        return redirect()->route('cards.edit', $card->id)->with(['flash_type' => 'success', 'flash_message' => 'Card created successfully', 'flash_description' => $card->name]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'last_four_digits' => 'required|string|max:4',
        ]);

        $card = Card::findOrFail($id);
        $card->fill($request->all());
        $card->save();

        return redirect()->route('cards.edit', $id)->with(['flash_type' => 'success', 'flash_message' => 'Card updated successfully', 'flash_description' => $card->name]);
    }
}
