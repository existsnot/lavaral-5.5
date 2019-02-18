<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/2/1 0001
 * Time: 14:25
 */

namespace App\Modules\Admin\Http\Controllers;

use App\Http\Controllers\Controller;

class Backend extends Controller
{
    protected $config = [];

    public function __construct()
    {

        $this->_initialize();
    }

    public function _initialize()
    {
        $conn= oci_connect('C##root', 'zhoulongtao', '127.0.0.1:1521/orcl');
        dd($conn);exit;
        if($conn) {
            echo"连接oracle成功！";
            exit;
        }else{
            echo"连接oracle失败！";exit;
        }
        $this->config();
        $this->setSite();
    }

    protected function config()
    {
        $getAction = request()->route()->getAction();
        $modulename = str_replace('/','',$getAction['prefix']);
        $array = explode('\\', $getAction['controller']);
        $count = count($array);
        $last = $array[$count - 1];
        list($controllername, $actionname) = explode('@', $last);
        $controllername = strtolower(str_replace('Controller', '', $controllername));
        $actionname = strtolower($actionname);
        $admin = config('admin');
        $config = [
            'modulename' => $modulename,
            'controllername' => $controllername,
            'actionname' => $actionname,
            'jsname' => 'backend/' . str_replace('.', '/', $controllername),
            'moduleurl' => rtrim(url("/{$modulename}", false), '/'),
        ];
        $this->config['config'] = array_merge($admin, $config);
    }

    /**
     * 重写view加载
     * @param $path
     * @param $data
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|\think\response\View
     */
    protected function view($path, $data = [])
    {
        $data = array_merge($this->config,$data);
        dd($data);
        return view($path, $data);
    }

    protected function setSite()
    {
          $site=[
              'name'=>'laravel-极速开发框架',
              'debug'=>true,
              'version'=>'laravel-fast.1.0.'.rand(0,100),
              'lang'=>'zh-CN',
              'log'=>true,
          ];
          $this->config['site']=$site;
        $this->config['config']['site']=$site;
    }
}