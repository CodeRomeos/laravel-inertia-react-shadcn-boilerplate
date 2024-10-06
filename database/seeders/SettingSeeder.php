<?php

namespace Database\Seeders;

use App\Models\Setting;
use App\Models\SettingGroup;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('setting_groups')->truncate();
        DB::table('settings')->truncate();
        
        $settingGroups = [
            [
                'id' => 1,
                'parent_id' => null,
                'key' => 'general',
                'name' => 'General',
                'description' => 'General settings',
                'order' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'parent_id' => 1,
                'key' => 'site_identity',
                'name' => 'Site Identity',
                'description' => 'Site identity settings',
                'order' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'parent_id' => 1,
                'key' => 'site_footer',
                'name' => 'Site Footer',
                'description' => 'Site footer settings',
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        $settings = [
            [
                'setting_group_id' => 2,
                'name' => 'App Name',
                'description' => 'Application name',
                'key' => 'app_name',
                'value' => 'Laravel',
                'type' => 'text',
                'order' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'setting_group_id' => 2,
                'name' => 'Logo',
                'description' => 'Application logo',
                'key' => 'app_logo',
                'value' => '',
                'type' => 'image',
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'setting_group_id' => 2,
                'name' => 'Favicon',
                'description' => 'Application Favicon',
                'key' => 'app_favicon',
                'value' => '',
                'type' => 'image',
                'order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'setting_group_id' => 3,
                'name' => 'Footer Text',
                'description' => 'Footer text below the logo',
                'key' => 'app_footer_logo_text',
                'value' => '',
                'type' => 'textarea',
                'order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        SettingGroup::insert($settingGroups);
        Setting::insert($settings);
    }
}
