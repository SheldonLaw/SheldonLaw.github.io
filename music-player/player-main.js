/*
 * Music-player
 * created by Sheldon Law on 2017-03-24
 */

var musicData = [
	{
		title: 'Fly away',
		artist: '梁静茹',
		album: 'Forever Love',
		artwork: './images/fly_away.jpg',
		src: 'https://s2.pstatp.com/toutiao/static-assets/video/luo/fly%20away.mp3',
	},
	{
		title: 'Tunak Tunak Tun',
		artist: 'Daler Mehndi',
		album: 'Tunak Tunak Tun',
		artwork: './images/Tunak_Tunak_Tun.jpg',
		src: 'https://s2.pstatp.com/toutiao/static-assets/video/luo/%E5%A4%9A%E5%86%B7%E7%9A%84%E9%9A%86%E5%86%AC.mp3',
	},
	{
		title: '120',
		artist: '轮回',
		album: '期待',
		artwork: './images/120.jpg',
		src: 'https://s2.pstatp.com/toutiao/static-assets/video/luo/120.mp3',
	},
];

var Player = function(audioEle, playBtn, artworkImg, musicInfo) {
	this.audio = audioEle;
	this.playBtn = playBtn;
	this.artworkImg = artworkImg;
	this.musicInfo = musicInfo;
	this.musicData = musicData;

	// init
	this.isPlay = false;
	this.curMusic = 0;
	this.playBtn.className = 'pause';
	this.playBtn.innerText = 'play';
	var curData = this.musicData[this.curMusic];
	this.artworkImg.src = curData.artwork;
	this.audio.src = curData.src;
	this.musicInfo.children[0].innerText = curData.title;
	this.musicInfo.children[1].innerText = curData.artist
											+ ' - ' + curData.album;
};

Player.prototype.play = function(offset) {
	this.curMusic = (this.curMusic + offset + this.musicData.length)
											% this.musicData.length;
	var curData = this.musicData[this.curMusic];
	if(this.audio.src != curData.src) {
		this.artworkImg.src = curData.artwork;
		this.audio.src = curData.src;
		this.musicInfo.children[0].innerText = curData.title;
		this.musicInfo.children[1].innerText = curData.artist
												+ ' - ' + curData.album;
	}
	if(offset == 0 && this.isPlay) {
		// pause
		this.playBtn.className = 'pause';
		this.playBtn.innerText = 'play';
		this.audio.pause();
		this.isPlay = false;
	} else {
		// pre or next or play
		this.isPlay = true;
		this.playBtn.className = 'play';
		this.playBtn.innerText = 'pause';
		var _this = this;
		this.audio.play().then(function() {
			if ('mediaSession' in navigator) {
				// setup handler
				if(navigator.mediaSession.metadata == null) {
					navigator.mediaSession.setActionHandler('previoustrack',
														_this.play.bind(_this, -1));
					navigator.mediaSession.setActionHandler('nexttrack',
														_this.play.bind(_this, 1));
					navigator.mediaSession.setActionHandler('play',
														_this.play.bind(_this, 0));
					navigator.mediaSession.setActionHandler('pause',
														_this.play.bind(_this, 0));
				}
				// change metadata
				navigator.mediaSession.metadata = new MediaMetadata({
					title: curData.title,
					artist: curData.artist,
					album: curData.album,
					artwork: [
						{src: curData.artwork, sizes: '96x96', type: 'image/jpg'},
						{src: curData.artwork, sizes: '128x128', type: 'image/jpg'},
						{src: curData.artwork, sizes: '192x192', type: 'image/jpg'},
						{src: curData.artwork, sizes: '256x256', type: 'image/jpg'},
						{src: curData.artwork, sizes: '384x384', type: 'image/jpg'},
						{src: curData.artwork, sizes: '512x512', type: 'image/jpg'},
					],
				});
			}
		});
	}
};

// main
var audio = document.querySelector('audio');
var artworkImg = document.querySelector('img');
var musicInfo = document.querySelector('.music-info');
var btns = document.querySelectorAll('button');
var preBtn = btns[0];
var playBtn = btns[1];
var nextBtn = btns[2];
var player = new Player(audio, playBtn, artworkImg, musicInfo);
var onBtnClick = function(e) {
	switch(e.target.dataset.command) {
		case 'pre':
			player.play(-1);
			break;
		case 'play':
			player.play(0);
			break;
		case 'next':
			player.play(1);
			break;
		default:
			return;
	}
};
preBtn.addEventListener('click', onBtnClick, false);
playBtn.addEventListener('click', onBtnClick, false);
nextBtn.addEventListener('click', onBtnClick, false);
