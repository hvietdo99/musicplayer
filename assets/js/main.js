import p from './log.js';

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

const playlist = $('.playlist');
const cd = $('.cd');
const cdThumb = $('.cd-thumb');
const header = $('header h2');
const audio = $('audio');
const playBtn = $('.btn-toggle-play');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const progress = $('.progress');
const randomBtn = $('.btn-random');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    songs: [
        {
          name: "Gold Kangan Sucha Yaar",
          singer: "Sucha Yaar",
          path: "https://songs9.vlcmusic.com/download.php?track_id=42005&format=320",
          image: "https://songs9.vlcmusic.com/tiny_image/timthumb.php?q=100&w=250&src=images/42005.png"
        },
        {
          name: "Click Pow Get Down",
          singer: "Raftaar x Fortnite",
          path: "https://mp3.vlcmusic.com/download.php?track_id=34737&format=320",
          image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
          name: "Tu Phir Se Aana",
          singer: "Raftaar x Salim Merchant x Karma",
          path: "https://mp3.vlcmusic.com/download.php?track_id=34213&format=320",
          image:
            "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
          name: "Mantoiyat",
          singer: "Raftaar x Nawazuddin Siddiqui",
          path: "https://mp3.vlcmusic.com/download.php?track_id=14448&format=320",
          image:
            "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
          name: "Aage Chal",
          singer: "Raftaar",
          path: "https://mp3.vlcmusic.com/download.php?track_id=25791&format=320",
          image:
            "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
          name: "Feeling You",
          singer: "Raftaar x Harjas",
          path: "https://mp3.vlcmusic.com/download.php?track_id=27145&format=320",
          image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        },
        {
          name: "Flood Back K.s. Makhan",
          singer: "K.s. Makhan",
          path: "https://songs9.vlcmusic.com/download.php?track_id=42006&format=320",
          image: "https://songs9.vlcmusic.com/tiny_image/timthumb.php?q=100&w=250&src=images/42006.png"
        },
        {
          name: "Flood Back K.s. Makhan",
          singer: "K.s. Makhan",
          path: "https://songs9.vlcmusic.com/download.php?track_id=42006&format=320",
          image: "https://songs9.vlcmusic.com/tiny_image/timthumb.php?q=100&w=250&src=images/42006.png"
        }
    ],

    defineProperties() {
        Object.defineProperty(this, "currentSong", {
            get() {
              return this.songs[this.currentIndex];
            }
        });
    },

    handleEvents() {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        document.onscroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop*0.7;

            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        playBtn.onclick = () => {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            _this.isPlaying = !_this.isPlaying;
        }

        nextBtn.onclick = () => {
            if (_this.isRandom) {
                _this.currentIndex = Math.floor(Math.random() * _this.songs.length);
            } else {
                _this.currentIndex++;
            }
            if(_this.currentIndex > _this.songs.length - 1) {
                _this.currentIndex = 0;
            }
            _this.loadCurrentSong();
            audio.play();
        }

        prevBtn.onclick = () => {
            if (_this.isRandom) {
                _this.currentIndex = Math.floor(Math.random() * _this.songs.length);
            } else {
                _this.currentIndex--;
            }
            if(_this.currentIndex < 0) {
                _this.currentIndex = _this.songs.length - 1;
            }
            _this.loadCurrentSong();
            audio.play();
        }

        audio.ontimeupdate = () => {
            const prgPercent = audio.currentTime/audio.duration * 100;
            if (prgPercent){
                progress.value = prgPercent;
            }
        }

        progress.onchange = (e) => {
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime.toString();
        };

        randomBtn.onclick = () => {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle("active");
        }

        audio.onended = () => {
            if (_this.isRandom) {
                _this.currentIndex = Math.floor(Math.random() * _this.songs.length);
            } else {
                _this.currentIndex++;
            }
            if(_this.currentIndex > _this.songs.length - 1) {
                _this.currentIndex = 0;
            }
            _this.loadCurrentSong();
            audio.play();
        }
    },

    loadCurrentSong() {
        header.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    render() {
        const htmls = this.songs.map((song, ci) => { // use Map method to render html!
            return `
                <div class="song ${ci === this.currentIndex ? "active" : ""}" data-index="${ci}">
                    <div class="thumb" style="background-image: url('${song.image}')"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })

        playlist.innerHTML = htmls.join('');
    },

    start() {
        this.defineProperties();
        this.handleEvents();
        this.loadCurrentSong();
        this.render();
    }
}

app.start();