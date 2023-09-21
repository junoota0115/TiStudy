{
	// homeアイコンクリック
	let home_img = document.querySelectorAll('.home_img');
	home_img.forEach(img=> {
		img.addEventListener('click', () => {
			location.href = "./index.html";
		})
	});

	function calcAccessCount() {
		let formdata = new FormData();
		formdata.append("page", "company");
		let url = "./DB/accessDB.php";
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.send(formdata);
	}

	window.onload = function() {
		calcAccessCount();
	}
}