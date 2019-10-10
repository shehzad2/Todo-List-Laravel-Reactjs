<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['_id', 'title', 'description', 'user_id', 'status'];
}
