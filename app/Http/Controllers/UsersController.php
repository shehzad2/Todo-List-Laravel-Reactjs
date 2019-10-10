<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Users;
class UsersController extends Controller
{
    public function getLogin(Request $request){
    	$data = $request->all();
		$userCount = Users::where('email',$data['email'])->count();
		if($userCount > 0){
			$user = Users::where('email',$data['email'])->first();
			if(Hash::check($data['password'], $user->password)){
				return response()->json(['status'=>200,'message'=>'','data'=>$user]);
			}else{
			return response()->json(['status'=>1,'message'=>'Password does not match','data'=>[]]);
			}
		}else{
			return response()->json(['status'=>2,'message'=>'Email does not match','data'=>[]]);
		}
    }


    public function saveRegister(Request $request){
		$data = $request->all();
		date_default_timezone_set('Asia/Dubai');
		$password = Hash::make($data['password']);
		$userCount = Users::count();
      	$userId = time().uniqid().($userCount+1);
      	$userCount = Users::where('email',$data['email'])->count();
      	if($userCount > 0):
      		return response()->json(['status'=>2,'message'=>'User already exist']);
      	else:
		$users = array(
			'email'=>$data['email'],
			'password'=>$password,
			'token'=>$userId,
			'status'=>1
		);
		$id = Users::insertGetId($users);
		$user = Users::find($id);
		 return response()->json(['status'=>200,'message'=>'Register Successfully','data'=>$user]);
		endif;
	}
}
