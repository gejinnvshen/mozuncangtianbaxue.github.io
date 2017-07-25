<?php
	require 'config.php';

	$query = mysql_query("SELECT title,content,date FROM blog_two ORDER BY date DESC LIMIT 0,3") or die('SQL错误！');

	//mysql_query($query) or die('新增失败!'.mysql_error());

	//print_r(mysql_fetch_array($query,MYSQL_ASSOC));
	$json = '';  
	
	while (!!$row = mysql_fetch_array($query, MYSQL_ASSOC)) { //两个!!将$row转化为布尔值
		$json .= json_encode($row).','; //转化为json格式，因为各种语言都通用
	}
	
	echo '['.substr($json, 0 , strlen($json) - 1).']';
	mysql_close();
?>














