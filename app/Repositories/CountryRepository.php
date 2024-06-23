<?php

namespace App\Repositories;

use App\Models\Country;
use Illuminate\Support\Facades\Log;

class CountryRepository extends BaseRepository {
    public $model;

    function __construct(Country $model)
    {
        $this->model = $model;
    }

    public function getPhoneCodeOptions() {
        $countries = $this->model->query()->distinct('phone_code')->get();
        $options = [];
        foreach ($countries as $country) {
            $options[] = ['id' => $country->id, 'key' => $country->id, 'phone_code' => $country->phone_code, 'value' => $country->phone_code, 'label' => $country->phone_code, 'country_name' => $country->name];
        }
        return $options;
    }
}