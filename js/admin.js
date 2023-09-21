{
	let login_btn = document.querySelector('.login_btn');
	login_btn?.addEventListener('click', () => {
		let overlay = document.querySelector('.overlay');
		overlay.classList.remove('hidden');
		setTimeout(() => {
			let formdata = new FormData();
			let id = document.querySelector('#id');
			formdata.append("id", id.value);
			let password = document.querySelector('#password');
			formdata.append("password", password.value);
			// データ送信
			let url = "./DB/loginDB.php";
			var xhr = new XMLHttpRequest();
			xhr.open("POST", url, true);
			xhr.send(formdata);
			xhr.onreadystatechange = function() {
				if (xhr.readyState===4 && xhr.status!==0) {
					let retVal = JSON.parse(xhr.responseText);
					if (retVal=="success") {
						location.reload();
					} else {
						alert("ログインできませんでした");
					}
				} else if (xhr.status===0) {
					alert("ログインできませんでした");
				}
				overlay.classList.add('hidden');
			};
		}, 200);
	});

	// 一覧に戻るボタン
	let list_back_btn = document.querySelector('.list_back_btn');
	list_back_btn?.addEventListener('click', () => {
		let overlay = document.querySelector('.overlay');
		overlay.classList.remove('hidden');
		setTimeout(() => {
			location.href = './admin.php';
		}, 200);
	});

	// ページ更新ボタン
	let reload_btn = document.querySelector('.reload_btn');
	reload_btn?.addEventListener('click', () => {
		let overlay = document.querySelector('.overlay');
		overlay.classList.remove('hidden');
		setTimeout(() => {
			location.reload();
		}, 200);
	});

	// お知らせ登録ボタン
	let info_btn = document.querySelector('.info_btn');
	info_btn?.addEventListener('click', () => {
		let overlay = document.querySelector('.overlay');
		overlay.classList.remove('hidden');
		setTimeout(() => {
			location.href = './admin.php?info_edit=1';
		}, 200);
	});

	// お知らせ登録
	let info_regist_btn = document.querySelector('.info_regist_btn');
	info_regist_btn?.addEventListener('click', () => {
		if (!confirm("この内容で登録します。\nよろしいですか？")) {
			return;
		}

		let overlay = document.querySelector('.overlay');
		overlay.classList.remove('hidden');
		setTimeout(() => {
			let formdata = new FormData();
			let show_date = document.querySelector('#show_date');
			formdata.append("show_date", show_date.value);
			let info_title = document.querySelector('#info_title');
			formdata.append("info_title", info_title.value);
			let info_url = document.querySelector('#info_url');
			formdata.append("info_url", info_url.value);
			let url = "./DB/setInfoDB.php?MODE=INS";
			var xhr = new XMLHttpRequest();
			xhr.open("POST", url, true);
			xhr.send(formdata);
			xhr.onreadystatechange = function() {
				if (xhr.readyState===4 && xhr.status!==0) {
					alert("登録完了しました。");
					location.href = "./admin.php";
				} else if (xhr.status===0) {
					alert("登録失敗しました。");
				}
				overlay.classList.add('hidden');
			}
		}, 200);
	});

	// お知らせ更新
	let info_update_btn = document.querySelector('.info_update_btn');
	info_update_btn?.addEventListener('click', () => {
		if (!confirm("この内容で更新します。\nよろしいですか？")) {
			return;
		}

		let overlay = document.querySelector('.overlay');
		overlay.classList.remove('hidden');
		setTimeout(() => {
			let formdata = new FormData();
			let show_date = document.querySelector('#show_date');
			formdata.append("show_date", show_date.value);
			let info_title = document.querySelector('#info_title');
			formdata.append("info_title", info_title.value);
			let info_url = document.querySelector('#info_url');
			formdata.append("info_url", info_url.value);
			let info_date = document.querySelector('#info_date');
			formdata.append("info_date", info_date.value);
			let url = "./DB/setInfoDB.php?MODE=UPD";
			var xhr = new XMLHttpRequest();
			xhr.open("POST", url, true);
			xhr.send(formdata);
			xhr.onreadystatechange = function() {
				if (xhr.readyState===4 && xhr.status!==0) {
					alert("更新完了しました。");
					location.href = `./admin.php?info_date=${info_date.value}`;
				} else if (xhr.status===0) {
					alert("更新失敗しました。");
				}
				overlay.classList.add('hidden');
			}
		}, 200);
	});

	// お知らせ削除
	let info_delete_btn = document.querySelector('.info_delete_btn');
	info_delete_btn?.addEventListener('click', () => {
		if (!confirm("このお知らせを削除。\nよろしいですか？")) {
			return;
		}

		let overlay = document.querySelector('.overlay');
		overlay.classList.remove('hidden');
		setTimeout(() => {
			let formdata = new FormData();
			let info_date = document.querySelector('#info_date');
			formdata.append("info_date", info_date.value);
			let url = "./DB/setInfoDB.php?MODE=DEL";
			var xhr = new XMLHttpRequest();
			xhr.open("POST", url, true);
			xhr.send(formdata);
			xhr.onreadystatechange = function() {
				if (xhr.readyState===4 && xhr.status!==0) {
					alert("削除完了しました。");
					location.href = "./admin.php";
				} else if (xhr.status===0) {
					alert("削除失敗しました。");
				}
				overlay.classList.add('hidden');
			}
		}, 200);
	});

	// 問い合わせ詳細ボタン
	let contact_details_btn = document.querySelectorAll('.contact_table .details_btn');
	let contact_date_data = document.querySelectorAll('.contact_table .date_data');
	contact_details_btn.forEach((btn, index) => {
		btn.addEventListener('click', () => {
			let overlay = document.querySelector('.overlay');
			overlay.classList.remove('hidden');
			setTimeout(() => {
				location.href = `./admin.php?contact_date=${contact_date_data[index].value}`;
			}, 200);
		})
	});

	// お知らせ詳細ボタン
	let info_details_btn = document.querySelectorAll('.info_table .details_btn');
	let info_date_data = document.querySelectorAll('.info_table .date_data');
	info_details_btn.forEach((btn, index) => {
		btn.addEventListener('click', () => {
			let overlay = document.querySelector('.overlay');
			overlay.classList.remove('hidden');
			setTimeout(() => {
				location.href = `./admin.php?info_date=${info_date_data[index].value}`;
			}, 200);
		})
	});

	// お知らせ詳細ボタン
	let info_edit_btn = document.querySelectorAll('.info_edit_btn');
	info_edit_btn.forEach((btn, index) => {
		btn.addEventListener('click', () => {
			let overlay = document.querySelector('.overlay');
			overlay.classList.remove('hidden');
			setTimeout(() => {
				let info_date = document.getElementById('info_date');
				location.href = `./admin.php?info_edit=2&info_date=${info_date.value}`;
			}, 200);
		})
	});

	// お知らせ編集取りやめボタン
	let info_back_btn = document.querySelectorAll('.info_back_btn');
	info_back_btn.forEach((btn, index) => {
		btn.addEventListener('click', () => {
			if (!confirm("変更した内容は保存されません。\nよろしいですか？")) {
				return;
			}
	
			let overlay = document.querySelector('.overlay');
			overlay.classList.remove('hidden');
			setTimeout(() => {
				let info_date = document.getElementById('info_date');
				location.href = `./admin.php?info_date=${info_date.value}`;
			}, 200);
		})
	});
}