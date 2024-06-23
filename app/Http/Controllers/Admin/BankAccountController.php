<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BankAccountResource;
use Inertia\Inertia;
use App\Models\BankAccount;
use App\Models\BankAccountType;
use Illuminate\Http\Request;

class BankAccountController extends Controller
{
    public function index(Request $request)
    {
        $bankAccounts = BankAccount::latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();
        return Inertia::render('Admin/BankAccounts/BankAccounts', ['bankAccounts' => BankAccountResource::collection($bankAccounts)]);
    }

    public function create()
    {
        return Inertia::render('Admin/BankAccounts/BankAccount');
    }

    public function edit($id)
    {
        $bankAccount = BankAccount::findOrFail($id);
        $bankAccountResource = new BankAccountResource($bankAccount);
        $bankAccountResource->wrap(null);
        return Inertia::render('Admin/BankAccounts/BankAccount', ['bankAccount' => $bankAccountResource]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $bankAccount = BankAccount::create($request->all());

        return redirect()->route('bankAccounts.edit', $bankAccount->id)->with(['flash_type' => 'success', 'flash_message' => 'Bank Account created successfully', 'flash_description' => $bankAccount->name]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $bankAccount = BankAccount::findOrFail($id);
        $bankAccount->fill($request->all());
        $bankAccount->save();

        return redirect()->route('bankAccounts.edit', $id)->with(['flash_type' => 'success', 'flash_message' => 'Bank Account updated successfully', 'flash_description' => $bankAccount->name]);
    }
}
