<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;
class TaskController extends Controller
{
    public function getTask(Request $request)
      {
      	 $token = $request->header('x-access-token');
        if(empty($token)){
             return response()->json(['code'=>401,'message'=>'You not authorized to do this action']);
        }else{
            $count = Task::where('user_id',$token)->count();
            if($count > 0){
            $task = Task::where('user_id',$token)->get();
            return response()->json(['code'=>200,'message'=>'authorized user','data'=>$task]);
          }else{
            return response()->json(['code'=>401,'message'=>'You not authorized to do this action']);
          }
        }
      }

     public function saveAddTask(Request $request)
      {
      	 $validatedData = $request->validate([
          'title' => 'required',
          'description' => 'required',
        ]);
      	$data = $request->all();
		date_default_timezone_set('Asia/Dubai');
		$_id = Task::count();
      	$_id = time().uniqid().($_id+1);
      	$task = array(
      		'_id'=>$_id,
      		'title'=>$data['title'],
      		'description'=>$data['description'],
      		'user_id'=>$data['token'],
      		'status'=>1
      	);
      	Task::create($task);
      	$getTast = Task::where('user_id',$data['token'])->get();
      	return response()->json($getTast);
      }


  public function changeStatus(Request $request){
    $data = $request->all();
   Task::where('_id',$data['_id'])->update(['status'=>$data['status']]);
    $task = Task::where('user_id',$data['user_id'])->get();
     return response()->json(['code'=>200,'message'=>'authorized user','data'=>$task]);
  }
}
