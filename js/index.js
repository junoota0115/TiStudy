{
	function getTagetPoint(index) {
		let target = document.querySelector('#anchor'+index);
		let targetRect = target.getBoundingClientRect();
		let targetpoint = window.pageYOffset + targetRect.top;
		setTimeout(scrollTop, 1, 1, targetpoint);
	}

	function scrollTop(cnt, targetpoint) {
		let html = document.querySelector('html');
		let scroll = html.scrollTop;
		scroll += cnt;
		html.scrollTop = scroll;
		if (scroll<targetpoint) {
			cnt += 0.25;
			setTimeout(scrollTop, 1, cnt, targetpoint);
		}
	}

	function AccessTarget(index) {
		if (index=="4") {
			// 会社要綱
			location.href = "./company.html";
		} else if (index=="5") {
			// お問い合わせ
			location.href = "./contact.html";
		}
	}

	// homeアイコンクリック
	let home_img = document.querySelectorAll('.home_img');
	home_img.forEach(img => {
		img.addEventListener('click', () => {
			location.href = "./index.html";
		})
	});

	// ハンバーガーメニュークリック
	let ham_menu = document.querySelectorAll('.ham_menu');
	ham_menu.forEach(menu => {
		menu.addEventListener('click', () => {
			let dialog = document.querySelector('.dialog');
			dialog.classList.toggle('show');
			dialog.classList.toggle('hide');
		})
	});

	// アンカーリンククリック
	let list_menu = document.querySelectorAll('.list_menu');
	list_menu.forEach((menu, index) => {
		menu.addEventListener('click', () => {
			if (menu.classList.contains("scroll")) {
				getTagetPoint(index);
			} else if (menu.classList.contains("link")) {
				AccessTarget(index);
			}
		})
	});

	let dialog_item = document.querySelectorAll('.dialog_item');
	dialog_item.forEach((menu, index) => {
		menu.addEventListener('click', () => {
			if (menu.classList.contains("scroll")) {
				let dialog = document.querySelector('.dialog');
				dialog.classList.toggle('show');
				dialog.classList.toggle('hide');
				getTagetPoint(index);
			} else if (menu.classList.contains("link")) {
				AccessTarget(index);
			}
		})
	});

	// LINEアイコンクリック
	let line_img = document.querySelectorAll('.line_img');
	line_img.forEach(img => {
		img.addEventListener('click', () => {
			window.open('https://lin.ee/jEkUq6U');
		})
	});

	// YouTubeアイコンクリック
	let youtube_img = document.querySelectorAll('.youtube_img');
	youtube_img.forEach(img => {
		img.addEventListener('click', () => {
			window.open('https://www.youtube.com/channel/UC7GGouxOQAbrH1RnETOLc-Q');
		})
	});

	// TikTokアイコンクリック
	let tiktok_img = document.querySelectorAll('.tiktok_img');
	tiktok_img.forEach(img => {
		img.addEventListener('click', () => {
			window.open('https://www.tiktok.com/@ti_sutdy');
		})
	});

	// 申し込みボタンクリック
	let apply_btn = document.querySelectorAll('.applybtn');
	apply_btn.forEach(btn => {
		btn.addEventListener('click', () => {
			location.href = "./apply.html";
		})
	});

	// 申し込みボタンクリック
	let introduction_btn = document.querySelectorAll('.introduction_btn');
	introduction_btn.forEach(btn => {
		btn.addEventListener('click', () => {
			location.href = "./introduction.html";
		})
	});

	function setBackText() {
		let backtext = document.querySelectorAll('.back_text');
		backtext.forEach(text => {
			// let height = text.clientHeight;
			// let width = text.clientWidth;
			let height = text.offsetHeight;
			let width = text.offsetWidth;
			let top = (160 - height)/2;
			let left = (160 - width)/2;
			text.style.top = `${top}px`;
			text.style.left = `${left}px`;
		});
	}

	function calcAccessCount() {
		let formdata = new FormData();
		formdata.append("page", "index");
		let url = "./DB/accessDB.php";
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.send(formdata);
	}

	window.onload = function() {
		calcAccessCount();
		setBackText();
	}
}
