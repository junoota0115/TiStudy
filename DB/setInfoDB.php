<?php
if (isset($_GET["MODE"])) {
	$MODE = $_GET["MODE"];
} else {
	return;
}

if (isset($_POST["show_date"])) {
	$SHOW_DATE = $_POST["show_date"];
} else {
	$SHOW_DATE = "";
}
if (isset($_POST["info_title"])) {
	$INFO_TITLE = $_POST["info_title"];
} else {
	$INFO_TITLE = "";
}
if (isset($_POST["info_url"])) {
	$INFO_URL = $_POST["info_url"];
} else {
	$INFO_URL = "";
}
if (isset($_POST["info_date"])) {
	$INFO_DATE = $_POST["info_date"];
} else {
	$INFO_DATE = "";
}

// ファイル名
if ($MODE=="INS") {
	// 新規登録
	$INFO_DATE = date('YmdHis');
	$filename = "./log/information_".$INFO_DATE.".txt";
} elseif ($MODE=="UPD") {
	// 更新
	$filename = "./log/information_".$INFO_DATE.".txt";
	unlink($filename);	// すでに作られているファイルを削除
} elseif ($MODE=="DEL") {
	$filename = "./log/information_".$INFO_DATE.".txt";
	unlink($filename);	// すでに作られているファイルを削除
	return;
}

// ハッシュ値
$key = file_get_contents("../.hash");

// ファイル書き込み
$SHOW_DATE = openssl_encrypt($SHOW_DATE, 'AES-128-ECB', $key);
file_put_contents($filename,"SHOW_DATE:".$SHOW_DATE.PHP_EOL,FILE_APPEND);
$INFO_TITLE = openssl_encrypt($INFO_TITLE, 'AES-128-ECB', $key);
file_put_contents($filename,"INFO_TITLE:".$INFO_TITLE.PHP_EOL,FILE_APPEND);
$INFO_URL = openssl_encrypt($INFO_URL, 'AES-128-ECB', $key);
file_put_contents($filename,"INFO_URL:".$INFO_URL.PHP_EOL,FILE_APPEND);

return json_encode($INFO_DATE);