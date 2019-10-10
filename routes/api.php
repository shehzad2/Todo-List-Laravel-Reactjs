<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/
Route::any('/get-task','TaskController@getTask');
Route::any('/save-add-task','TaskController@saveAddTask');
Route::any('/change-status','TaskController@changeStatus');
Route::any('/login','UsersController@login');
Route::any('/get-login','UsersController@getLogin');
Route::any('/save-register','UsersController@saveRegister');
Route::any('/logout','UsersController@logout');