<?php

namespace App\Http\Controllers\Admin\Users;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();
        return Inertia::render('Admin/Users/Users', ['users' => UserResource::collection($users)]);
    }

    public function create()
    {
        $roles = Role::latest()->get();
        return Inertia::render('Admin/Users/User', ['roles' => $roles]);
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);
        $userResource = new UserResource($user);
        $userResource->wrap(null);
        $roles = Role::latest()->get();
        return Inertia::render('Admin/Users/User', ['user' => $userResource, 'roles' => $roles]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'nullable|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role_ids.*' => 'required|integer|exists:roles,id',
        ]);

        $request->merge(['password' => bcrypt($request->password)]);

        $user = User::create($request->all());
        $roles = Role::whereIn('id', $request->role_ids)->get();
        $user->syncRoles($roles);

        return redirect()->route('users.edit', $user->id)->with(['flash_type' => 'success', 'flash_message' => 'User created successfully', 'flash_description' => $user->name]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'nullable|string',
            'email' => 'nullable|email|unique:users,email,' . $id,
            'role_ids.*' => 'required|integer|exists:roles,id',
            'password' => 'nullable|string|min:8',
        ]);

        if ($request->has('password')) {
            $request->merge(['password' => bcrypt($request->password)]);
        } else {
            $request->except(['password']);
        }

        $user = User::findOrFail($id);
        $user->fill($request->all());
        $user->save();

        $roles = Role::whereIn('id', $request->role_ids)->get();
        $user->syncRoles($roles);

        return redirect()->route('users.edit', $id)->with(['flash_type' => 'success', 'flash_message' => 'User updated successfully', 'flash_description' => $user->name]);
    }
}
