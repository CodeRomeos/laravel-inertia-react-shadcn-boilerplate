<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ini_set('max_execution_time', 0);
        ini_set("memory_limit", "-1");
        $data = include 'cities.php';
        foreach ($data as $data) {
            $checkRecordExists = DB::table('cities')->find($data['id']);

            if (!$checkRecordExists) {
                DB::table('cities')->insert([
                    "id" => $data['id'],
                    "name" => $data['name'],
                    "state_id" => $data['state_id'],
                    "state_code" => $data['state_code'],
                    "state_name" => $data['state_name'],
                    "country_id" => $data['country_id'],
                    "country_code" => $data['country_code'],
                    "country_name" => $data['country_name'],
                    "latitude" => $data['latitude'] ?? null,
                    "longitude" => $data['longitude'] ?? null,
                    "wiki_data_id" => $data['wikiDataId'] ?? "",
                    "status" => 1,
                    "created_at" => now(),
                    "updated_at" => now(),
                ]);
            }
        }
    }
}
