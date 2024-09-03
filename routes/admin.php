<?php

use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\BankAccountController;
use App\Http\Controllers\Admin\CardController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\CommentController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\NoteController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\PaymentMethodController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\Role\RoleController;
use App\Http\Controllers\Admin\Users\UserController;
use Illuminate\Support\Facades\Route;




Route::prefix('admin')->name('admin.')->middleware(['web', 'auth'])->group(function() {
    Route::prefix('users')->name('users.')->controller(UserController::class)->group(function () {
        Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit users']);
        Route::post('store', 'store')->name('store')->middleware(['can:create users']);
        Route::get('create', 'create')->name('create')->middleware(['can:create users']);
        Route::get('{id}', 'edit')->name('edit')->middleware(['can:edit users']);
        Route::get('', 'index')->name('index')->middleware(['can:view users']);
    });

    Route::prefix('roles')->name('roles.')->controller(RoleController::class)->group(function () {
        Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit roles']);
        Route::post('store', 'store')->name('store')->middleware(['can:create roles']);
        Route::get('create', 'create')->name('create')->middleware(['can:create roles']);
        Route::get('{id}', 'edit')->name('edit')->middleware(['can:edit roles']);
        Route::get('', 'index')->name('index')->middleware(['can:view roles']);
    });

    Route::prefix('categories')->name('categories.')->controller(CategoryController::class)->group(function () {
        Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit categories']);
        Route::post('store', 'store')->name('store')->middleware(['can:create categories']);
        Route::get('create', 'create')->name('create')->middleware(['can:create categories']);
        Route::get('{id}', 'edit')->name('edit')->middleware(['can:edit categories']);
        Route::get('', 'index')->name('index')->middleware(['can:view categories']);
    });

    Route::prefix('payment-methods')->name('paymentMethods.')->controller(PaymentMethodController::class)->group(function () {
        Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit payment methods']);
        Route::post('store', 'store')->name('store')->middleware(['can:create payment methods']);
        Route::get('create', 'create')->name('create')->middleware(['can:create payment methods']);
        Route::get('{id}', 'edit')->name('edit')->middleware(['can:edit payment methods']);
        Route::get('', 'index')->name('index')->middleware(['can:view payment methods']);
    });

    Route::prefix('bank-accounts')->name('bankAccounts.')->controller(BankAccountController::class)->group(function () {
        Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit bank accounts']);
        Route::post('store', 'store')->name('store')->middleware(['can:create bank accounts']);
        Route::get('create', 'create')->name('create')->middleware(['can:create bank accounts']);
        Route::get('{id}', 'edit')->name('edit')->middleware(['can:edit bank accounts']);
        Route::get('', 'index')->name('index')->middleware(['can:view bank accounts']);
    });

    Route::prefix('pages')->name('pages.')->controller(PageController::class)->group(function () {
        Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit pages']);
        Route::post('store', 'store')->name('store')->middleware(['can:create pages']);
        Route::get('create', 'create')->name('create')->middleware(['can:create pages']);
        Route::get('{id}', 'edit')->name('edit')->middleware(['can:edit pages']);
        Route::get('', 'index')->name('index')->middleware(['can:view pages']);
    });

    Route::prefix('posts')->name('posts.')->controller(PostController::class)->group(function () {
        Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit posts']);
        Route::post('store', 'store')->name('store')->middleware(['can:create posts']);
        Route::get('create', 'create')->name('create')->middleware(['can:create posts']);
        Route::get('{id}', 'edit')->name('edit')->middleware(['can:edit posts']);
        Route::get('', 'index')->name('index')->middleware(['can:view posts']);
    });

    Route::prefix('cards')->name('cards.')->controller(CardController::class)->group(function () {
        Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit cards']);
        Route::post('store', 'store')->name('store')->middleware(['can:create cards']);
        Route::get('create', 'create')->name('create')->middleware(['can:create cards']);
        Route::get('{id}', 'edit')->name('edit')->middleware(['can:edit cards']);
        Route::get('', 'index')->name('index')->middleware(['can:view cards']);
    });

    Route::prefix('activity-logs')->name('activityLogs.')->controller(ActivityController::class)->group(function () {
        Route::get('', 'index')->name('index')->middleware(['can:view activity logs']);
    });


    Route::prefix('notes')->name('notes.')->controller(NoteController::class)->group(function () {
        Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit notes']);
        Route::post('store', 'store')->name('store')->middleware(['can:create notes']);
        Route::get('create', 'create')->name('create')->middleware(['can:create notes']);
        Route::get('{id}', 'edit')->name('edit')->middleware(['can:view notes']);
        Route::get('', 'index')->name('index')->middleware(['can:view notes']);
    });

    Route::prefix('clients')->name('clients.')->controller(ClientController::class)->group(function () {
        Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit clients']);
        Route::post('store', 'store')->name('store')->middleware(['can:create clients']);
        Route::get('create', 'create')->name('create')->middleware(['can:create clients']);
        Route::get('{id}', 'edit')->name('edit')->middleware(['can:edit clients']);
        Route::get('', 'index')->name('index')->middleware(['can:view clients']);
    });

    Route::prefix('menus')->name('menus.')->controller(MenuController::class)->group(function () {
        Route::post('{id}', 'update')->name('update')->middleware(['can:edit menus']);
        Route::get('create', 'create')->name('create')->middleware(['can:create menus']);
        Route::get('{id}', 'edit')->name('edit')->middleware(['can:edit menus']);
        Route::post('', 'store')->name('store')->middleware(['can:create menus']);
        Route::get('', 'index')->name('index')->middleware(['can:view menus']);
    });


    Route::prefix('comments')->name('comments.')->controller(CommentController::class)->group(function () {
        Route::post('store', 'store')->name('store')->middleware(['can:create comments']);
    });

    Route::get('/dashboard', DashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');

    Route::redirect('/', '/dashboard');
});