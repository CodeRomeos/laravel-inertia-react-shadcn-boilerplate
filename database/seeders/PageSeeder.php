<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Page::firstOrCreate([
            'user_id' => 1,
            'title' => 'Home',
            'slug' => 'home',
            'body' => null,
            'puck_body' => null,
            'status' => 1
        ]);
    }
}