<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Models\SettingGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function view(Request $request, $groupKey = 'general')
    {
        $settingGroups = SettingGroup::with('children.settings.settingGroup')->whereNull('parent_id')->orderBy('order', 'ASC')->orderBy('name', 'ASC')->get();
        $settingGroup = $settingGroups->where('key', $groupKey)->first();
        $fieldTypes = Setting::$fieldTypes;
        $settings = $settingGroup->children->pluck('settings')->flatten();

        return Inertia::render('Admin/Settings/View', [
            'settings' => $settings,
            'fieldTypes' => $fieldTypes,
            'settingGroups' => $settingGroups,
            'settingGroup' => $settingGroup
        ]);
    }

    public function update(Request $request, $groupKey = 'general')
    {
        $settings = $request->all();
        foreach ($settings as $key => $value) {
            $setting = Setting::where('key', $key)->first();
            if ($setting) {
                if($setting->type == 'image' || $setting->type == 'file') {
                    $file = $request->file($key);
                    if($file)
                        $value = '/storage/' . $file->storePubliclyAs('', $key . '-' . $file->getClientOriginalName());
                }
                $setting->value = $value;
                $setting->save();
            }
        }

        Cache::forget('settings.' . $groupKey);

        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Settings updated successfully']);
    }
}
