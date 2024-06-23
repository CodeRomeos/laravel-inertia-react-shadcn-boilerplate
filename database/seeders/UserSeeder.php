<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        activity()->disableLogging();
        Schema::disableForeignKeyConstraints();
        DB::table('users')->truncate();
        $superAdmin = User::create([
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('123456789'),  
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ]);
        $manager = User::create([
            'first_name' => 'Manager',
            'last_name' => '',
            'email' => 'manager@example.com',
            'password' => bcrypt('123456789'),  
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ]);
        $agent = User::create([
            'first_name' => 'Agent',
            'last_name' => 'Manager',
            'email' => 'agent@example.com',
            'password' => bcrypt('123456789'),  
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ]);
        $support = User::create([
            'first_name' => 'support',
            'last_name' => 'User',
            'email' => 'support@example.com',
            'password' => bcrypt('123456789'),  
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ]);

        $superAdmin->assignRole('admin');
        $manager->assignRole('manager');
        $agent->assignRole('agent');
        $support->assignRole('support');
        
        Schema::disableForeignKeyConstraints();
        activity()->enableLogging();
    }
}
