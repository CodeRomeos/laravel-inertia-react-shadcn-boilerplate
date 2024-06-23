<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BankAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bank_accounts')->truncate();
        DB::table('bank_accounts')->insert([
            'id' => '1',
            'name' => 'Company HDFC Account',
            'bank_name' => 'HDFC',
            'branch' => 'NSP',
            'account_number' => '123456789',
            'ifsc' => 'HDFC0001234',
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ]);
        Schema::disableForeignKeyConstraints();
    }
}
