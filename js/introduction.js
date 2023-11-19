{
	let tag = document.createElement('script');
	tag.src = "https://www.youtube.com/player_api";
	let firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	
	let intervalID;
	let stopflg = -1;
	const interval = 6000;

	let movie_title = [];
	let movie_url = [];
	let movieGet_flg = false;
	let slide_flg = false;
	let youtube_player = [];
	function onYouTubePlayerAPIReady() {
		getMovieData();
		if (!movieGet_flg) {
			// 動画データが取得できなければ時間をおいて再度呼び出し
			setTimeout(onYouTubePlayerAPIReady, 1000);
			return;
			}

		for (let i=0; i<movie_url.length; i++) {
			// 動画データ登録
			youtube_player[i] = new YT.Player('youtube'+(i+1), {
			height: '100%',
			width: '100%',
				videoId: movie_url[i],
			rel: 0,
				background: 1,
			events: {
				'onStateChange': onPlayerStateChange
			}
		});

		// 動画タイトル登録
			document.querySelector("#youtube_title"+(i+1)).textContent = movie_title[i];
			}

		// 自動スライド起動
		intervalID = setInterval(slideBox, interval, 2);
	}
	
	function onPlayerStateChange(event) {
		if (event.data==YT.PlayerState.PLAYING) {
			clearInterval(intervalID);
		} else if (event.data==YT.PlayerState.PAUSED) {
      intervalID = setInterval(slideBox, interval, 2);
		}
	}


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

	function getMovieData() {
		let formdata = new FormData();
		let url = "./DB/getMovieDB.php";
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.send(formdata);
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4){
				if (xhr.status == 200){
					let json = xhr.responseText;
					let data = JSON.parse(json);
					for (let i=0; i<data.length; i++) {
						movie_title[i] = data[i].movie_title;
						movie_url[i] = data[i].movie_url;
					}
				}
				movieGet_flg = true;
			}
		}
	}

	function makeMovieList(videoID) {
		let iframe = document.createElement('iframe');
		iframe.setAttribute('src',`https://www.youtube.com/embed/${videoID}?rel=0`);
		iframe.setAttribute('width','760');
		iframe.setAttribute('height','553');
		iframe.setAttribute('frameborder','0');
		iframe.setAttribute('allowfullscreen','');

		let movie_lists = document.querySelector('.slider-main');
		movie_lists.appendChild(iframe);
	}


	window.onload = function() {
		calcAccessCount();
		getInformation();
	}

	document.querySelectorAll('.box').forEach((box, index) => {
		box.addEventListener('click', () => {
		  if (box.classList.contains('center') && (stopflg==index || stopflg==-1)) {
			box.classList.toggle('stop');
			if (box.classList.contains('stop')) {
			  clearInterval(intervalID);
			  stopflg = index;
			} else {
			  intervalID = setInterval(slideBox, interval, 2);
			  stopflg = -1;
			}
		  }
		});
	  });
	
	  document.querySelector('.prev_btn').addEventListener('click', () => {
		if (stopflg==-1) {
		  clearInterval(intervalID);
		  intervalID = setInterval(slideBox, interval, 2);
		}
		slideBox(1);
	  });
	  
		document.querySelector('.next_btn').addEventListener('click', () => {
		if (stopflg==-1) {
		  clearInterval(intervalID);
		  intervalID = setInterval(slideBox, interval, 2);
		}
		slideBox(2);
	  });
	
	  function slideBox(flg) {
		if (slide_flg) {
			return;
		}
		slide_flg = true;

		if (flg==1) {
		  // prevボタン
		  document.querySelectorAll('.box').forEach((box, index) => {
			if (box.classList.contains('center')) {
			  box.classList.remove('center');
			  box.classList.add('next');
			} else if (box.classList.contains('next')) {
			  box.classList.remove('next');
			  box.classList.add('prev');
			} else if (box.classList.contains('prev')) {
			  box.classList.remove('prev');
			  box.classList.add('center');
			  changeDot(index)
			}
		  });
		} else if (flg==2) {
		  // nextボタン
		  document.querySelectorAll('.box').forEach((box, index) => {
			if (box.classList.contains('center')) {
			  box.classList.remove('center');
			  box.classList.add('prev');
			} else if (box.classList.contains('next')) {
			  box.classList.remove('next');
			  box.classList.add('center');
			  changeDot(index)
			} else if (box.classList.contains('prev')) {
			  box.classList.remove('prev');
			  box.classList.add('next');
			}
		  });
		}

		setTimeout(() => {
			slide_flg = false;
		}, 2000);
	  }

	  function changeDot(index) {
		let dot0 = document.querySelector('.dot0');
		let dot1 = document.querySelector('.dot1');
		let dot2 = document.querySelector('.dot2');
		
		dot0.classList.remove('active');
		dot1.classList.remove('active');
		dot2.classList.remove('active');

		if (index==0) {
			dot0.classList.add('active');
		} else if (index==1) {
			dot1.classList.add('active');
		} else if (index==2) {
			dot2.classList.add('active');
		}
	}

	//   intervalID = setInterval(slideBox, interval, 2);
	}


 /* ここ追加してドットの動きを確認中  */

changeDot(0);
 /* ここ追加してドットの動きを確認中  */

