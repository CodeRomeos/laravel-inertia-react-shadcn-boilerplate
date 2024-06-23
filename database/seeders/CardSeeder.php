<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('cards')->truncate();
        DB::table('cards')->insert([
            'id' => '1',
            'name' => 'HDFC Debit Account',
            'last_four_digits' => '1234',
            'issuer_name' => 'HDFC',
            'debit_credit' => -1,
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ]);
        DB::table('cards')->insert([
            'id' => '2',
            'name' => 'HDFC Debit Account',
            'last_four_digits' => '7890',
            'issuer_name' => 'HDFC',
            'debit_credit' => -1,
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ]);
        Schema::disableForeignKeyConstraints();
    }
}
