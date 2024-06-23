<?php

namespace App\Helpers;

class PermissionsHelper {
    public static function genCrudPermissions($name, $morePermissions = [], $except = []) {
        $ps = [
            'view',
            'create',
            'edit',
            'delete',
            'export',
            'screenshot & copy'
        ];

        $ps = array_diff($ps, $except);

        $permissions = [];
        foreach ($ps as $p) {
            $permissions[] = $p . ' ' . $name;
        }

        return array_merge($permissions, $morePermissions);
    }
}
