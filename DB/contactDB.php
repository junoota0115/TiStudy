<?php

if (isset($_POST["student_name"])) {
	$STUDENT_NAME = $_POST["student_name"];
} else {
	$STUDENT_NAME = "";
}
if (isset($_POST["student_grade"])) {
	$STUDENT_GRADE = $_POST["student_grade"];
} else {
	$STUDENT_GRADE = "";
}
if (isset($_POST["parent_name"])) {
	$PARENT_NAME = $_POST["parent_name"];
} else {
	$PARENT_NAME = "";
}
if (isset($_POST["tel_number"])) {
	$TEL_NUMBER = $_POST["tel_number"];
} else {
	$TEL_NUMBER = "";
}
if (isset($_POST["mail_address"])) {
	$MAIL_ADDRESS = $_POST["mail_address"];
} else {
	$MAIL_ADDRESS = "";
}
if (isset($_POST["contact_content"])) {
	$CONTACT_CONTENT = $_POST["contact_content"];
} else {
	$CONTACT_CONTENT = "";
}

// ファイル名
$filename = "./log/contact_".date('YmdHis').".txt";

// ハッシュ値
$key = file_get_contents("../.hash");

// ファイル書き込み
$STUDENT_NAME = openssl_encrypt($STUDENT_NAME, 'AES-128-ECB', $key);
file_put_contents($filename,"STUDENT_NAME:".$STUDENT_NAME.PHP_EOL,FILE_APPEND);
$STUDENT_GRADE = openssl_encrypt($STUDENT_GRADE, 'AES-128-ECB', $key);
file_put_contents($filename,"STUDENT_GRADE:".$STUDENT_GRADE.PHP_EOL,FILE_APPEND);
$PARENT_NAME = openssl_encrypt($PARENT_NAME, 'AES-128-ECB', $key);
file_put_contents($filename,"PARENT_NAME:".$PARENT_NAME.PHP_EOL,FILE_APPEND);
$TEL_NUMBER = openssl_encrypt($TEL_NUMBER, 'AES-128-ECB', $key);
file_put_contents($filename,"TEL_NUMBER:".$TEL_NUMBER.PHP_EOL,FILE_APPEND);
$MAIL_ADDRESS = openssl_encrypt($MAIL_ADDRESS, 'AES-128-ECB', $key);
file_put_contents($filename,"MAIL_ADDRESS:".$MAIL_ADDRESS.PHP_EOL,FILE_APPEND);
$CONTACT_CONTENT = openssl_encrypt($CONTACT_CONTENT, 'AES-128-ECB', $key);
file_put_contents($filename,"CONTACT_CONTENT:".$CONTACT_CONTENT.PHP_EOL,FILE_APPEND);

?>
