<?php

if (isset($_POST["page"])) {
	$PAGE = $_POST["page"];
} else {
	$PAGE = "";
}

// ファイル名
$filename = "./log/access_".$PAGE.".txt";

if (file_exists($filename)) {
	// ファイル読み込み
	$fp = fopen($filename, 'r');
	$txt = fgets($fp);
	$access = explode(":", $txt);
	$access_num = $access[1] + 1;
	file_put_contents($filename,"ACCESS:".$access_num.PHP_EOL);
} else {
	// 新規ファイル作成
	file_put_contents($filename,"ACCESS:1".PHP_EOL,FILE_APPEND);
}

?>