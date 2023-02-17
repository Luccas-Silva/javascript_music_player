const cover = document.getElementById('cover');
const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');

const previous = document.getElementById('previous');
const play = document.getElementById('play');
const next = document.getElementById('next');

const AsItWas = {
    songName : 'As It Was',
    bandName : 'Harry Styles',
    file: 'As It Was'
};
const RainyDay = {
    songName : 'Rainy Day',
    bandName : 'Two Scents x Lucid Keys',
    file: 'Rainy Day'
};
const Djonga = {
    songName : 'O Mundo É Nosso',
    bandName : 'Djonga (Instrumental)',
    file: 'O Mundo É Nosso'
};
const BK = {
    songName : 'Planos',
    bandName : 'BK',
    file: 'Planos'
};
const playlist = [RainyDay, Djonga, BK, AsItWas];
let index = 0;

function initializeSong(){
    cover.src = `assets/imgs/${playlist[index].file}.webp`;
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].bandName;
    song.src = `assets/songs/${playlist[index].file}.mp3`;
}

let isPlaying = false;

function playSong(){
    play.querySelector('.ph').classList.remove('ph-play-fill');
    play.querySelector('.ph').classList.add('ph-pause-fill');
    song.play();
    isPlaying = true;
}

function pauseSong(){
    play.querySelector('.ph').classList.remove('ph-pause-fill');
    play.querySelector('.ph').classList.add('ph-play-fill');
    song.pause();
    isPlaying = false
}

function playPauseDecider(){
    if(isPlaying === true){
        pauseSong();
    }
    else{
        playSong();
    }
}

function previousSong(){
    if(index === 0){
        index = playlist.length - 1;
    }
    else {
        index -= 1;   
    }
    initializeSong();
    playSong();
}

function nextSong(){
    if(index === playlist.length - 1){
        index = 0;
    }
    else {
        index += 1;   
    }
    initializeSong();
    playSong();
}

initializeSong();

previous.addEventListener('click', previousSong);
play.addEventListener('click', playPauseDecider);
next.addEventListener('click', nextSong);