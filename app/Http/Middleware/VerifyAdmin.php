<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/2/1 0001
 * Time: 10:05
 */

namespace App\Http\Middleware;
use Closure;

class VerifyAdmin
{
    public function handle($request, Closure $next)
    {
        return $next($request);
    }
}