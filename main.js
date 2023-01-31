let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track_artist')

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wawe = document.getElementById('wawe');
let traqueur_stop_btn = document.querySelector('.fa-stop-circle');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_liste = [
    {
        img: 'C:\Users\berth\www\travail greta global\tp_js_lecteur_audio\image',
        name: 'DOOM ost',
        music: 'music/DOOM_OST.mp3',
    },
    {
        img: 'image/doom-eternal.jpg',
        name: 'DOOM_ETERNAL',
        music: 'music/DOOM_ETERNAL.mp3',
    },
    {
        img: 'image/halo1.jpg',
        name: 'HALO 1',
        music: 'music/HALO1.mp3',
    },
    {
        img: 'image/halo2.jpg',
        name: 'HALO 2',
        music: 'music/Halo2.mp3',
    },
    {
        img: 'image/halo3.jpg',
        name: 'HALO 3',
        music: 'music/Halo3.mp3',
    }
]


function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_liste[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url (" + music_liste[track_index].img + ")";
    track_name.textContent = music_liste[track_index].name;
    now_playing.textContent = "playing music " + (track_index + 1) + "of" + music_liste.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color() {
    let hex = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e'];
    let a;

    function populate(a) {
        for(let i = 0; i<6; i++ ){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#'); 
    let angle = 'to right';

    let gardient = 'linear-gardient(' + angle + ',' + Color1 + ',' + Color2 + ")";
    document.body.style.background = gardient;
}

function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function randomTrack() {
    isRandom ? pauseRandom() : playRamdom();
}

function playramdom() {
    isRandom = true;
    ramdomIcon.classList.add('ramdomActive');
}

function pauseRamdom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}

function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wawe.classList.add('loader');
    playpause_btn.innerHTML = '<i class ="fa fa-pause-circle fa-4x"></i>';
}

