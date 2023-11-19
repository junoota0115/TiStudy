<?php
	$key = file_get_contents("../.hash");

	$getData = [];
	$file_list = glob('./log/movieurl_*.txt');
	if (count($file_list)==0) {
		echo json_encode($getData);
		die();
	}
	for ($i=0; $i<count($file_list); $i++) {
		$fp = fopen($file_list[$i], 'r');
		$MOVIE_TITLE = [];
		$MOVIE_URL = [];
	while (!feof($fp)) {
		// fgetsでファイルを読み込み、変数に格納
		$txt = fgets($fp);
		if ($txt=="") {
			continue;
		}
		// ファイルを読み込んだ変数を出力
		$data = explode(":", $txt);
			$textdata = htmlspecialchars(openssl_decrypt($data[1], 'AES-128-ECB', $key));
			if (preg_match('/MOVIE_TITLE/',$data[0])) {
				$MOVIE_TITLE[] = $textdata;
			} else if (preg_match('/MOVIE_URL/',$data[0])) {
				$MOVIE_URL[] = $textdata;
			}
		}

		// 公開日前の場合は表示させない
		for ($i=0; $i<count($MOVIE_URL); $i++) {
			$getData[] = [
				"movie_title" => $MOVIE_TITLE[$i],
				"movie_url" => $MOVIE_URL[$i],
		];
		}
	}

	// echo "<pre>";
	// print_r($getData);
	// echo "</pre>";
	echo json_encode($getData);