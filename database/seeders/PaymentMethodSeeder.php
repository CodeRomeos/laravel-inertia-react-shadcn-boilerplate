<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('payment_methods')->truncate();
        DB::table('payment_methods')->insert([
            'id' => 1,
            'name' => 'Cash',
            'slug' => 'cash',
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ]);

        DB::table('payment_methods')->insert([
            'id' => 2,
            'name' => 'Cheque',
            'slug' => 'cheque',
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ]);
        DB::table('payment_methods')->insert([
            'id' => 3,
            'name' => 'Credit Card',
            'slug' => 'credit-card',
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ]);
        DB::table('payment_methods')->insert([
            'id' => 4,
            'name' => 'Debit Card',
            'slug' => 'debit-card',
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ]);
        DB::table('payment_methods')->insert([
            'id' => 5,
            'name' => 'Bank Transfer IMPS',
            'slug' => 'bank-transfer-imps',
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ]);
        DB::table('payment_methods')->insert([
            'id' => 6,
            'name' => 'Bank Transfer NEFT',
            'slug' => 'bank-transfer-neft',
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
