{
	// homeアイコンクリック
	let home_img = document.querySelectorAll('.home_img');
	home_img.forEach(img=> {
		img.addEventListener('click', () => {
			location.href = "./index.html";
		})
	});

	// 送信ボタンクリック
	let submit_btn = document.querySelector('.submit_btn');
	submit_btn.addEventListener('click', () => {
		let sMsg = validate();
		if (sMsg) {
			alert(sMsg);
			return;
		}

		let overlay = document.querySelector('.overlay');
		overlay.classList.remove('hidden');
		setTimeout(() => {
			let fd = document.querySelector('#contactform');
			let formdata = new FormData(fd);
			// データ送信
			let url = "./DB/contactDB.php";
			var xhr = new XMLHttpRequest();
			xhr.open("POST", url, true);
			xhr.send(formdata);
			xhr.onreadystatechange = function() {
				if (xhr.readyState===4 && xhr.status!==0) {
					alert('登録完了しました。');
					location.reload();
				} else if (xhr.status===0) {
					console.log("リクエスト失敗");
				}
				overlay.classList.add('hidden');
			};
		}, 200);
	});

	function validate() {
		// 入力チェック
		let retVal = "";
		let input = document.querySelectorAll('#contactform input[type="text"]');
		for (let i=0; i<input.length; i++) {
			if (input[i].value=="") {
				input[i].classList.add('bRed');
				retVal = "入力されていない項目があります。";
			} else {
				input[i].classList.remove('bRed');
			}
		}

		let textarea = document.querySelectorAll('#contactform textarea');
		for (let i=0; i<textarea.length; i++) {
			if (textarea[i].value=="") {
				textarea[i].classList.add('bRed');
				retVal = "入力されていない項目があります。";
			} else {
				textarea[i].classList.remove('bRed');
			}
		}

		if (retVal=="") {
			let mail_address = document.querySelector('[name="mail_address"]');
			let mail_check = document.querySelector('[name="mail_check"]');
			if (mail_address.value!=mail_check.value) {
				mail_address.classList.add('bRed');
				mail_check.classList.add('bRed');
				retVal = "メールアドレスが一致しません。";
			}
		}

		return retVal;
	}

	function calcAccessCount() {
		let formdata = new FormData();
		formdata.append("page", "contact");
		let url = "./DB/accessDB.php";
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.send(formdata);
	}

	window.onload = function() {
		calcAccessCount();
	}
}
