<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PaymentMethodResource;
use Inertia\Inertia;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{
    public function index(Request $request)
    {
        $paymentMethods = PaymentMethod::latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();
        return Inertia::render('Admin/PaymentMethods/PaymentMethods', ['paymentMethods' => PaymentMethodResource::collection($paymentMethods)]);
    }

    public function create()
    {
        return Inertia::render('Admin/PaymentMethods/PaymentMethod');
    }

    public function edit($id)
    {
        $paymentMethod = PaymentMethod::findOrFail($id);
        $paymentMethodResource = new PaymentMethodResource($paymentMethod);
        $paymentMethodResource->wrap(null);
        return Inertia::render('Admin/PaymentMethods/PaymentMethod', ['paymentMethod' => $paymentMethodResource]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'slug' => 'required|string|unique:payment_methods,slug',
        ]);

        $paymentMethod = PaymentMethod::create($request->all());

        return redirect()->route('paymentMethods.edit', $paymentMethod->id)->with(['flash_type' => 'success', 'flash_message' => 'Payment Method created successfully', 'flash_description' => $paymentMethod->name]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'slug' => 'sometimes|string|unique:payment_methods,slug,' . $id,
        ]);

        $paymentMethod = PaymentMethod::findOrFail($id);
        $paymentMethod->fill($request->all());
        $paymentMethod->save();

        return redirect()->route('paymentMethods.edit', $id)->with(['flash_type' => 'success', 'flash_message' => 'Payment Method updated successfully', 'flash_description' => $paymentMethod->name]);
    }
}
