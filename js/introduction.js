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

	// homeアイコンクリック
	let home_img = document.querySelectorAll('.home_img');
	home_img.forEach(img => {
		img.addEventListener('click', () => {
			location.href = "./index.html";
		})
	});

	// 申し込みボタンクリック
	let apply_btn = document.querySelectorAll('.applybtn');
	apply_btn.forEach(img => {
		img.addEventListener('click', () => {
			location.href = "./apply.html";
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

	// 住所のピンクリック
	let address_pin = document.querySelectorAll('.address_pin');
	address_pin.forEach(pin => {
		pin.addEventListener('click', () => {
			window.open("https://goo.gl/maps/bMoVyHrUBGCP7fry8");
			// window.open("https://goo.gl/maps/GWYS1Hxr6zoWGXLw5");
		})
	});

	let dialog_item = document.querySelectorAll('.dialog_item');
	dialog_item.forEach((menu, index) => {
		menu.addEventListener('click', () => {
			let dialog = document.querySelector('.dialog');
			dialog.classList.toggle('show');
			dialog.classList.toggle('hide');
			getTagetPoint(index);
		})
	});

	function calcAccessCount() {
		let formdata = new FormData();
		formdata.append("page", "introduction");
		let url = "./DB/accessDB.php";
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.send(formdata);
	}

	function getInformation() {
		let formdata = new FormData();
		let url = "./DB/getInfoDB.php";
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.send(formdata);
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4){
				if (xhr.status == 200){
					let json = xhr.responseText;
					let data = JSON.parse(json);
					// console.log(data);
					for (let i=0; i<data.length; i++) {
						let date = data[i].showdate;
						let title = data[i].infotitle;
						let url = data[i].infourl;
						makeInfolist(date,title,url);
					}
				}
			}
		}
	}

	function makeInfolist(date,title,url) {
		let list_data = document.createElement('div');
		list_data.classList.add('list_data');
		list_data.dataset.url = url;
		list_data.setAttribute('onclick', 'javascript:showInformation(this)');

		let data_date = document.createElement('div');
		data_date.classList.add('data_date');
		data_date.textContent = date;
		list_data.appendChild(data_date);

		let data_title = document.createElement('div');
		data_title.classList.add('data_title');
		data_title.textContent = title;
		list_data.appendChild(data_title);

		let info_lists = document.querySelector('.info_lists');
		info_lists.appendChild(list_data);
	}

	function showInformation(obj) {
		let url = obj.dataset.url;
		window.open(url);
	}

	window.onload = function() {
		calcAccessCount();
		getInformation();
	}
}