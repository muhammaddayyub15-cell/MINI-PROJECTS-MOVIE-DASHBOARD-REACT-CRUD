<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MovieController;
use App\Http\Middleware\AdminMiddleware;

/*
|--------------------------------------------------------------------------
| AUTH ROUTES (PUBLIC)
|--------------------------------------------------------------------------
*/

// 🆕 REGISTER
Route::post('/register', [AuthController::class, 'register']);

// 🔑 LOGIN
Route::post('/login', [AuthController::class, 'login']);


/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES (LOGIN REQUIRED)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // 👤 GET USER LOGIN
    Route::get('/me', function (Request $request) {
        return $request->user();
    });

    // 🚪 LOGOUT
    Route::post('/logout', [AuthController::class, 'logout']);


    /*
    |--------------------------------------------------------------------------
    | 👑 ADMIN ONLY ROUTES (NO KERNEL ALIAS)
    |--------------------------------------------------------------------------
    */

    Route::middleware([AdminMiddleware::class])->group(function () {

        // 👤 USERS ADMIN CRUD
        Route::get('/users', [UserController::class, 'index']);
        Route::get('/users/{id}', [UserController::class, 'show']);
        Route::put('/users/{id}', [UserController::class, 'update']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);

        // 🎬 MOVIES ADMIN CRUD
        Route::post('/movies', [MovieController::class, 'store']);
        Route::put('/movies/{id}', [MovieController::class, 'update']);
        Route::delete('/movies/{id}', [MovieController::class, 'destroy']);
    });


    /*
    |--------------------------------------------------------------------------
    | 👤 USER SELF SERVICE (OPTIONAL FITUR)
    |--------------------------------------------------------------------------
    */

    Route::put('/me', [UserController::class, 'updateSelf']);
    Route::delete('/me', [UserController::class, 'deleteSelf']);
});