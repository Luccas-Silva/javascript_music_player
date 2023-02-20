const cover = document.getElementById('cover');
const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container')
const previous = document.getElementById('previous');
const play = document.getElementById('play');
const next = document.getElementById('next');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');
const heartButton = document.getElementById('heart');

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
const Sahara = {
    songName : 'Sahara (Slowed)',
    bandName : 'Hensonn',
    file: 'Sahara'
};
const Orion = {
    songName : 'Orion',
    bandName : 'SCayos x Azayaka',
    file: 'Orion'
};
const MIDNIGHT = {
    songName : 'MIDNIGHT',
    bandName : 'PLAYAMANE x Nateki',
    file: 'MIDNIGHT'
};
const originalPlaylist = [RainyDay, Djonga, BK, AsItWas, Sahara, MIDNIGHT, Orion];
let sortedPlaylist = [...originalPlaylist];
let index = 0;

function initializeSong(){
    cover.src = `assets/imgs/${sortedPlaylist[index].file}.webp`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].bandName;
    song.src = `assets/songs/${sortedPlaylist[index].file}.mp3`;
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
        index = sortedPlaylist.length - 1;
    }
    else {
        index -= 1;   
    }
    initializeSong();
    playSong();
}

function nextSong(){
    if(index === sortedPlaylist.length - 1){
        index = 0;
    }
    else {
        index += 1;   
    }
    initializeSong();
    playSong();
}

function updateProgressBar(){
    song.currentTime
    song.duration
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime);
}

function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width) * song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray){
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random() * size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

let isShuffled = false;

function shuffleButtonClicked(){
    if(isShuffled === false){
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    }
    else{
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist]
        shuffleButton.classList.remove('button-active');
    }
}

let repeatOn = false;

function repeatButtonClicked(){
    if(repeatOn === false){
        repeatOn = true;
        repeatButton.classList.add('button-active');
    }
    else{
        repeatOn = false;
        repeatButton.classList.remove('button-active');
    }
}

function nextOrRepeat(){
    if(repeatOn === false){
        nextSong();
    }
    else{
        playSong();
    }
}

function toHHMMSS(originalNumber){
    let hours = Math.floor(originalNumber/3600);
    let min = Math.floor((originalNumber - hours * 3600) / 60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

    return `${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

function updateTotalTime() {
    totalTime.innerText = toHHMMSS(song.duration);
}

let heart = false;
function updateHeartButton() {
    if(heart === false){
        heart = true
        heartButton.querySelector('.ph').classList.add('ph-heart-straight-fill');
        heartButton.classList.add('button-active');
    }
    else{
        heart = false
        heartButton.querySelector('.ph').classList.remove('ph-heart-straight-fill');
        heartButton.classList.remove('button-active');
    }
    
}

initializeSong();

song.addEventListener('timeupdate', updateProgressBar);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
previous.addEventListener('click', previousSong);
play.addEventListener('click', playPauseDecider);
next.addEventListener('click', nextSong);
repeatButton.addEventListener('click', repeatButtonClicked);
heartButton.addEventListener('click', updateHeartButton)
