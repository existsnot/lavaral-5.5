<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/2/1 0001
 * Time: 10:18
 */

if (!function_exists('showMsg')) {

    /**
     * 公用的方法  返回json数据，进行信息的提示
     * @param $status 状态
     * @param string $message 提示信息
     * @param array $data 返回数据
     */
    function showMsg($status, $message = '', $data = array())
    {
        $result = array(
            'status' => $status,
            'message' => $message,
            'data' => $data
        );
        exit(json_encode($result));
    }
}
if (!function_exists('input')) {
    /**
     * 获取输入数据 支持默认值和过滤
     * @param string $key 获取的变量名
     * @param mixed $default 默认值
     * @return mixed
     */
    function input($key = null, $default = null)
    {
        return request()->input($key, $default);
    }
}