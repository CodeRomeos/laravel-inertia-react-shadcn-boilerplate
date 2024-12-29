<?php

namespace Database\Seeders;

use App\Helpers\PermissionsHelper;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        activity()->disableLogging();
        Schema::disableForeignKeyConstraints();
        DB::table('permissions')->truncate();
        DB::table('role_has_permissions')->truncate();
        DB::table('model_has_permissions')->truncate();

        $now = now();
        $permissionGroups = [
            [
                'name' => 'dashboard',
                'permissions' => [
                    'dashboard overview stats',
                    'dashboard overview grouped stats'
                ]
            ],
            [
                'name' => 'categories',
                'permissions' => PermissionsHelper::genCrudPermissions('categories'),
            ],
            [
                'name' => 'roles',
                'permissions' => PermissionsHelper::genCrudPermissions('roles', ['update role permissions']),
            ],
            [
                'name' => 'users',
                'permissions' => PermissionsHelper::genCrudPermissions('users'),
            ],
            [
                'name' => 'clients',
                'permissions' => PermissionsHelper::genCrudPermissions('clients'),
            ],
            [
                'name' => 'comments',
                'permissions' => PermissionsHelper::genCrudPermissions('comments', [], ['edit', 'delete', 'export', 'screenshot & copy'])
            ],
            [
                'name' => 'notes',
                'permissions' => PermissionsHelper::genCrudPermissions('notes')
            ],
            [
                'name' => 'activity logs',
                'permissions' => PermissionsHelper::genCrudPermissions('activity logs', [], ['create', 'edit', 'delete'])
            ]
        ];

        foreach ($permissionGroups as $group) {
            foreach($group['permissions'] as $permission) {
                DB::table('permissions')->insert([
                    'name' => $permission,
                    'group_name' => $group['name'],
                    'guard_name' => 'web',
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }

        Schema::disableForeignKeyConstraints();
        activity()->enableLogging();
    }
}
