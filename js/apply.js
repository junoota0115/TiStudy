{
	// homeアイコンクリック
	let home_img = document.querySelectorAll('.home_img');
	home_img.forEach(img=> {
		img.addEventListener('click', () => {
			location.href = "./index.html";
		})
	});

	// LINE登録ボタンクリック
	let line_btn = document.querySelector('.linebtn');
	line_btn.addEventListener('click', () => {
		window.open('https://lin.ee/jEkUq6U');
	});

	// LINE登録ボタンクリック
	let contactbtn = document.querySelector('.contactbtn');
	contactbtn.addEventListener('click', () => {
		location.href = "./contact.html";
	});

	function calcAccessCount() {
		let formdata = new FormData();
		formdata.append("page", "apply");
		let url = "./DB/accessDB.php";
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.send(formdata);
	}

	window.onload = function() {
		calcAccessCount();
	}
}