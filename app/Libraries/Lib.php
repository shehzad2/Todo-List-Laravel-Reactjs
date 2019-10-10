<?php
namespace App\Libraries;
use Request;
class Lib 
{
	public static function asset($arg){
		if(Request::secure()):
			return secure_asset($arg);
		else:
			return asset($arg);
		endif;
	}
}
?>