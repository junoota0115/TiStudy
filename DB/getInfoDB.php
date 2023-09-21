<?php
	$key = file_get_contents("../.hash");

	$getData = [];
	$file_list = glob('./log/information_*.txt');
	if (count($file_list)==0) {
		die();
	}
	for ($i=0; $i<count($file_list); $i++) {
		$fp = fopen($file_list[$i], 'r');
		$SHOW_DATE = "";
		$INFO_TITLE = "";
		$INFO_URL = "";
		while (!feof($fp)) {
			// fgetsでファイルを読み込み、変数に格納
			$txt = fgets($fp);
			if ($txt=="") {
				continue;
			}
			// ファイルを読み込んだ変数を出力
			$data = explode(":", $txt);
			$textdata = htmlspecialchars(openssl_decrypt($data[1], 'AES-128-ECB', $key));
			switch ($data[0]) {
				case "SHOW_DATE";
					$SHOW_DATE = $textdata;
					break;
				case "INFO_TITLE";
					$INFO_TITLE = $textdata;
					break;
				case "INFO_URL";
					$INFO_URL = $textdata;
					break;
				default:
					break;
			}
		}

		// 公開日前の場合は表示させない
		if ($SHOW_DATE<=date('Y-m-d')) {
			$getData[] = [
				"showdate" => str_replace("-", ".", $SHOW_DATE),
				"infotitle" => $INFO_TITLE,
				"infourl" => $INFO_URL,
			];
		}
	}

	// print_r($getData);
	echo json_encode($getData);