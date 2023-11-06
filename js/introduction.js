{
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/player_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	
	let intervalID;
	let stopflg = -1;
	const interval = 6000;

	var player1;
	var player2;
	var player3;
	function onYouTubePlayerAPIReady() {
		player1 = new YT.Player('youtube1', {
			// height: '553',
			// width: '760',
			videoId: 'zT3X7P8xUqo',
			rel: 0,
			background: 1,
			events: {
				'onStateChange': onPlayerStateChange
			}
		});
		player2 = new YT.Player('youtube2', {
			// height: '553',
			// width: '760',
			videoId: 'gsT6eKsnT0M',
			rel: 0,
			events: {
				'onStateChange': onPlayerStateChange
			}
		});
		player3 = new YT.Player('youtube3', {
			// height: '553',
			// width: '760',
			videoId: '0fdY9J7p2EY',
			rel: 0,
			events: {
				'onStateChange': onPlayerStateChange
			}
		});
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
					// console.log(data);
					for (let i=0; i<data.length; i++) {
						let videoID = data[i].videoID;
						makeMovieList(videoID);
					}
				}
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
		if (flg==1) {
		  // prevボタン
		  document.querySelectorAll('.box').forEach((box) => {
			if (box.classList.contains('center')) {
			  box.classList.remove('center');
			  box.classList.add('next');
			} else if (box.classList.contains('next')) {
			  box.classList.remove('next');
			  box.classList.add('prev');
			} else if (box.classList.contains('prev')) {
			  box.classList.remove('prev');
			  box.classList.add('center');
			}
		  });
		} else if (flg==2) {
		  // nextボタン
		  document.querySelectorAll('.box').forEach(box => {
			if (box.classList.contains('center')) {
			  box.classList.remove('center');
			  box.classList.add('prev');
			} else if (box.classList.contains('next')) {
			  box.classList.remove('next');
			  box.classList.add('center');
			} else if (box.classList.contains('prev')) {
			  box.classList.remove('prev');
			  box.classList.add('next');
			}
		  });
		}
	  }
	
	  intervalID = setInterval(slideBox, interval, 2);
	}


 /* ここ追加してドットの動きを確認中  */
	
	let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(slideIndex) {
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  } else if (slideIndex >= slides.length) {
    slideIndex = 0;
  }

  slides.forEach((slide) => {
    slide.style.display = 'none';
  });

  dots.forEach((dot) => {
    dot.classList.remove('active');
  });

  slides[slideIndex].style.display = 'block';
  dots[slideIndex].classList.add('active');
  currentSlide = slideIndex;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
  });
});

showSlide(currentSlide);

 /* ここ追加してドットの動きを確認中  */

