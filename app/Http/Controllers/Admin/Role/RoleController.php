<?php

namespace App\Http\Controllers\Admin\Role;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoleResource;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $roles = Role::withCount(['permissions', 'users'])->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();
        return Inertia::render('Admin/Roles/Roles', ['roles' => RoleResource::collection($roles)]);
    }

    public function create()
    {
        return Inertia::render('Admin/Roles/Role', [
            'groupedPermissions' => Permission::all()->groupBy('group_name'),
        ]);
    }

    public function edit($id)
    {
        $role = Role::with(['permissions', 'users'])->findOrFail($id);
        // if($role->name == 'admin')
        // {
        //     return redirect()->route('roles.index')->with(['flash_type' => 'error', 'flash_message' => 'Not allowed to edit', 'flash_description' => $role->name . ' role is not allowed to edit']);
        // }

        $groupedPermissions = Permission::all()->groupBy('group_name');

        $roleResource = new RoleResource($role);
        $roleResource->wrap(null);
        return Inertia::render('Admin/Roles/Role', [
            'role' => $roleResource,
            'groupedPermissions' => $groupedPermissions,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:roles',
            'permission_ids.*' => 'required|exists:permissions,id',
        ]);
        $role = Role::create($request->all());
        
        $permissions = Permission::whereIn('id', $request->permission_ids)->get();
        $role->syncPermissions($permissions);


        return redirect()->route('roles.edit', $role->id)->with(['flash_type' => 'success', 'flash_message' => 'Role created successfully', 'flash_description' => $role->title]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'permission_ids.*' => 'required|exists:permissions,id',
        ]);
        $permissions = Permission::whereIn('id', $request->permission_ids)->get();
        $role = Role::with('permissions')->findOrFail($id);

        $role->syncPermissions($permissions);
        // if ($role->name == 'admin') {
        //     return redirect()->route('roles.index')->with(['flash_type' => 'error', 'flash_message' => 'Not allowed to edit', 'flash_description' => $role->name . ' role is not allowed to edit']);
        // }

        return redirect()->route('roles.edit', $id)->with(['flash_type' => 'success', 'flash_message' => 'Role updated successfully', 'flash_description' => $role->title]);
    }
}
