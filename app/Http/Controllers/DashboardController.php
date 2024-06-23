<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();
       if($user->hasRole('admin')) {
            return redirect()->intended(route('admin.dashboard'));
        }
        return Inertia::render('Welcome', []);
    }
}
