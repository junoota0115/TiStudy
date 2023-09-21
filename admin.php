<?php
session_start();
if (isset($_SESSION['ACCESS'])) {
	$ACCESS = $_SESSION['ACCESS'];
} else {
	$ACCESS = "";
}

$contact_date = filter_input(INPUT_GET, 'contact_date');
$info_date = filter_input(INPUT_GET, 'info_date');
$info_edit = filter_input(INPUT_GET, 'info_edit');
$key = file_get_contents("./.hash");

?>

<!DOCTYPE html>
<html lang="ja">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta charset="utf-8">
	<link rel="icon" href="./favicon.ico" />
	<title>Ti Study | 管理メニュー</title>
	<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="./css/header.css">
	<link rel="stylesheet" href="./css/admin.css?<?=date('YmdHis')?>">
</head>
<body>
	<header>
		<div class="left_content">
			<img class="link_img home_img" src="./img_HP/Ti.png" alt="Ti-study" width="100%" height="100%">
		</div>
	</header>

	<div class="wrapper">
<?php if ($ACCESS=="") { ?>
		<!-- ログイン画面 -->
		<div>ID</div>
		<div><input type="text" id="id"></div>
		<div>パスワード</div>
		<div><input type="pasword" id="password"></div>
		<div><button class="button login_btn">ログイン</button></div>
<?php } else { ?>
		<!-- ログイン後 -->
<?php if ($contact_date!="" || $info_edit=="1") { ?>
		<!-- 問い合わせ閲覧 or お知らせ登録 -->
		<div><button class="button list_back_btn">一覧に戻る</button></div>
<?php } elseif ($info_date!="") { ?>
<?php if ($info_edit=="2") { ?>
		<!-- お知らせ更新 -->
		<div><button class="button info_back_btn">編集をやめる</button></div>
		<div><button class="button info_delete_btn">削除する</button></div>
<?php } else { ?>
		<!-- お知らせ閲覧 -->
		<div><button class="button list_back_btn">一覧に戻る</button></div>
		<div><button class="button info_edit_btn">編集する</button></div>
<?php } ?>
<?php } else { ?>
		<!-- 一覧画面 -->
		<div><button class="button reload_btn">画面更新</button></div>
		<div><button class="button info_btn">お知らせ登録する</button></div>
<?php } ?>
		<div class="table_wrapper">
<?php
if ($contact_date!="") {
	// お問い合わせ詳細画面
	echo '<table class="table contact_table">';
	echo '<tbody>';
	// 詳細表示
	$file_data = glob('./DB/log/contact_'.$contact_date.'.txt');
	$fp = fopen($file_data[0], 'r');
	while (!feof($fp)) {
		// fgetsでファイルを読み込み、変数に格納
		$txt = fgets($fp);
		// ファイルを読み込んだ変数を出力
		$data = explode(":", $txt);
		if (count($data)!=2) {
			continue;
		}
		echo '<tr>';
		echo '<td>';
		switch ($data[0]) {
			case "STUDENT_NAME";
				echo "生徒氏名:";
				break;
			case "STUDENT_GRADE";
				echo "学年:";
				break;
			case "PARENT_NAME";
				echo "保護者氏名:";
				break;
			case "TEL_NUMBER";
				echo "電話番号:";
				break;
			case "MAIL_ADDRESS";
				echo "メール:";
				break;
			case "CONTACT_TOOL";
				echo "主な連絡ツール:";
				break;
			case "CONTACT_CONTENT";
				echo "お問い合わせ内容:";
				break;
			default:
				break;
		}
		echo '</td>';
		$show_data = openssl_decrypt($data[1], 'AES-128-ECB', $key);
		echo '<td>' . $show_data . '</td>';
		echo '</tr>';
	}
	echo '</tbody>';
	echo '</table>';
} elseif ($info_date!="") {
	// お知らせ閲覧、編集画面
	echo '<table class="table info_table">';
	echo '<tbody>';
	// 詳細表示
	$file_data = glob('./DB/log/information_'.$info_date.'.txt');
	$fp = fopen($file_data[0], 'r');
	while (!feof($fp)) {
		// fgetsでファイルを読み込み、変数に格納
		$txt = fgets($fp);
		// ファイルを読み込んだ変数を出力
		$data = explode(":", $txt);
		if (count($data)!=2) {
			continue;
		}
		echo '<tr>';
		echo '<td>';
		switch ($data[0]) {
			case "SHOW_DATE";
				echo "公開日";
				break;
			case "INFO_TITLE";
				echo "お知らせタイトル";
				break;
			case "INFO_URL";
				echo "リンク先URL";
				break;
			default:
				break;
		}
		echo '</td>';
		$show_data = openssl_decrypt($data[1], 'AES-128-ECB', $key);
		echo '<td>';
		if ($info_edit=="2") {
			// 編集画面
			switch ($data[0]) {
				case "SHOW_DATE";
					echo '<input type="date" id="show_date" value="'.$show_data.'">';
					break;
				case "INFO_TITLE";
					echo '<input type="text" id="info_title" value="'.$show_data.'">';
					break;
				case "INFO_URL";
					echo '<input type="text" id="info_url" value="'.$show_data.'">';
					break;
				default:
					break;
			}
		} else {
			// 閲覧画面
			echo $show_data;
		}
		echo '</td>';
		echo '</tr>';
	}
	if ($info_edit=="2") {
		echo '<tr>';
		echo '<td></td>';
		echo '<td><button class="button info_update_btn">更新</button></td>';
		echo '</tr>';
	}
	echo '</tbody>';
	echo '</table>';
} elseif ($info_edit=="1") {
	// お知らせ登録画面
	echo '<table class="table contact_table">';
	echo '<tbody>';
	echo '<tr>';
	echo '<td>公開日</td>';
	echo '<td><input type="date" id="show_date"></td>';
	echo '</tr>';
	echo '<tr>';
	echo '<td>お知らせタイトル</td>';
	echo '<td><input type="text" id="info_title"></td>';
	echo '</tr>';
	echo '<tr>';
	echo '<td>リンク先URL</td>';
	echo '<td><input type="text" id="info_url"></td>';
	echo '</tr>';
	echo '<tr>';
	echo '<td></td>';
	echo '<td><button class="button info_regist_btn">登録</button></td>';
	echo '</tr>';
	echo '</tbody>';
	echo '</table>';
} else {
	// 一覧画面
	echo '<table class="table contact_table">';
	echo '<thead>';
	echo '<tr><th></th><th>お問い合わせ日</th></tr>';
	echo '</thead>';
	echo '<tbody>';
	// 問い合わせ一覧表示
	$file_list = glob('./DB/log/contact_*.txt');
	for ($i=0; $i<count($file_list); $i++) {
		echo '<tr>';
		echo '<td><button class="button details_btn">詳細</button></td>';
		$show_date = $file_list[$i];
		$show_date = str_replace("./DB/log/contact_", "", $show_date);
		$show_date = str_replace(".txt", "", $show_date);
		echo '<td>' . $show_date . '</td>';
		echo '<input type="hidden" class="date_data" value="'.$show_date.'">';
		echo '</tr>';
	}
	echo '</tbody>';
	echo '</table>';

	echo '<table class="table access_table">';
	echo '<thead>';
	echo '<tr><th>ページ</th><th>アクセス数</th></tr>';
	echo '</thead>';
	echo '<tbody>';
	// アクセス数一覧表示
	$access_list = glob('./DB/log/access_*.txt');
	for ($i=0; $i<count($access_list); $i++) {
		echo '<tr>';
		echo '<td>';
		$access_file = str_replace("./DB/log/access_", "", $access_list[$i]);
		switch ($access_file) {
			case "apply.txt";
				echo "LINE登録";
				break;
			case "company.txt";
				echo "会社概要";
				break;
			case "contact.txt";
				echo "お問い合わせ";
				break;
			case "index.txt";
				echo "ホームページ";
				break;
			case "introduction.txt";
				echo "ランディングページ";
				break;
			default:
				break;
		}
		echo '</td>';
		$fp = fopen($access_list[$i], 'r');
		feof($fp);
		// fgetsでファイルを読み込み、変数に格納
		$txt = fgets($fp);
		// ファイルを読み込んだ変数を出力
		$data = explode(":", $txt);
		if (count($data)!=2) {
			continue;
		}
		echo '<td>' . $data[1] . '</td>';
		echo '</tr>';
	}
	echo '</tbody>';
	echo '</table>';

	echo '<table class="table info_table">';
	echo '<thead>';
	echo '<tr><th></th><th>お知らせ登録日</th></tr>';
	echo '</thead>';
	echo '<tbody>';
	// 問い合わせ一覧表示
	$information_list = [];
	$information_list = glob('./DB/log/information_*.txt');
	for ($i=0; $i<count($information_list); $i++) {
		echo '<tr>';
		echo '<td><button class="button details_btn">詳細</button></td>';
		$show_date = $information_list[$i];
		$show_date = str_replace("./DB/log/information_", "", $show_date);
		$show_date = str_replace(".txt", "", $show_date);
		echo '<td>' . $show_date . '</td>';
		echo '<input type="hidden" class="date_data" value="'.$show_date.'">';
		echo '</tr>';
	}
	echo '</tbody>';
	echo '</table>';
}
?>
		</div>
		<input type="hidden" id="info_date" value="<?=$info_date?>">
<?php } ?>
	</div>

	<!-- オーバーレイ -->
	<div class="overlay hidden">
		<div class="content">
			<div class="point point1"></div>
			<div class="point point2"></div>
			<div class="point point3"></div>
			<div class="point point4"></div>
			<div class="point point5"></div>
			<div class="point point6"></div>
			<div class="point point7"></div>
			<div class="point point8"></div>
		</div>
	</div>

	<script type="text/javascript" src="./js/admin.js?<?=date('YmdHis')?>"></script>
</body>
</html>