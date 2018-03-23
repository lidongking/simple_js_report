<?php
/**
 * Copyright (c) 2018, 杰利信息科技有限公司 dev.jelly-tec.com
 * 摘　　要：js.php
 * 作　　者：wangld
 * 修改日期：2018/3/23
 */

header('Content-Type:text/html;charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Request-Method: POST');
$method = ($_SERVER['REQUEST_METHOD']);
if ($method == 'POST')
{
    $rawData = file_get_contents('php://input');
    $obj = json_decode($rawData, true);
    // 正规json数据
    if (is_array($obj))
    {
        // TODO 校验相关数据位是否合法错误上报
        // 记录相关日志上报数据
        file_put_contents('report.log', $rawData . PHP_EOL, FILE_APPEND);
    }
}
elseif ($method == 'GET')
{
    // get请求不支持ajax
    $rawData = $_GET['event'];
    $obj = json_decode($rawData, true);
    // 正规json数据
    if (is_array($obj))
    {
        // TODO 校验相关数据位是否合法错误上报
        // 记录相关日志上报数据
        file_put_contents('report.log', $rawData . PHP_EOL, FILE_APPEND);
    }
}

