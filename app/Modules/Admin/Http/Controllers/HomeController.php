<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/2/1 0001
 * Time: 10:13
 */

namespace App\Modules\Admin\Http\Controllers;


use think\Request;

class HomeController extends Backend
{
    public function index()
    {

        return $this->view('admin::index.index',['name'=>'world']);
    }
    public function add(Request $request){
        dd($request);
    }
}