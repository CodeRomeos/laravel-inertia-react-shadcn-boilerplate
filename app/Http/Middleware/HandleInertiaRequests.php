<?php

namespace App\Http\Middleware;

use App\Enums\ModelStatus;
use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'appName' => config('app.name'),
            'primaryMenu' => Menu::getMenu('primary'),
            'auth' => [
                'user' => $request->user(),
                'userRoles' => $request->user() ? $request->user()->roles->pluck('name') : [],
                'userPermissions' => $request->user() ? $request->user()->getPermissionsViaRoles()->pluck('name') : [],
            ],
            'flash' => [
                'type' => fn () => $request->session()->get('flash_type'),
                'message' => fn () => $request->session()->get('flash_message'),
                'description' => fn () => $request->session()->get('flash_description'),
            ]
        ];
    }
}
