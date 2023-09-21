<?php
if (isset($_POST["id"])) {
	$ID = $_POST["id"];
} else {
	$ID = "";
}
if (isset($_POST["password"])) {
	$PASSWORD = $_POST["password"];
} else {
	$PASSWORD = "";
}
// ファイル名
$filename = "./log/login_info.txt";

if (file_exists($filename)) {
	// ファイル読み込み
	$logindata = file_get_contents($filename);
	$key = file_get_contents("../.hash");
	$logindata = openssl_decrypt($logindata, 'AES-128-ECB', $key);
	$data = explode(":", $logindata);
	if ($ID==$data[0] && $PASSWORD==$data[1]) {
		// ログイン成功
		session_start();
		$_SESSION['ACCESS'] = $data[0];
		echo json_encode('success');
	} else {
		// ログイン失敗
		echo json_encode('failure');
	}
} else {
		echo json_encode('failure');
}
?>