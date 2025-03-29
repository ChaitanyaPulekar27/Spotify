// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('../uploads/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let playingGif = document.getElementById('playingGif'); 
let masterSongName = document.getElementById('masterSongName');
let songs = [
    {songName: "Sukoon", filePath: "../uploads/songs/1.mp3", coverPath: "../uploads/covers/1.jpg"},
    {songName: "Lagan tumse laga baithe", filePath: "../uploads/songs/2.mp3", coverPath: "../uploads/covers/2.jpg"},
    {songName: "Namami Shamishan Nirvan Roopam", filePath: "../uploads/songs/3.mp3", coverPath: "../uploads/covers/3.jpg"},
    {songName: "Tum bin mai dekho to", filePath: "../uploads/songs/4.mp3", coverPath: "../uploads/covers/4.jpg"},
    {songName: "Dil tu jaan tu", filePath: "../uploads/songs/5.mp3", coverPath: "../uploads/covers/5.jpg"},
    {songName: "Ha-k-Ha", filePath: "../uploads/songs/6.mp3", coverPath: "../uploads/covers/6.jpg"},
    {songName: "Tum sath ho jo mere", filePath: "../uploads/songs/7.mp3", coverPath: "../uploads/covers/7.jpg"},
    {songName: "Tum prem ho", filePath: "../uploads/songs/8.mp3", coverPath: "../uploads/covers/8.jpg"},
    {songName: "Tere Hawale", filePath: "../uploads/songs/9.mp3", coverPath: "../uploads/covers/9.jpg"},
    {songName: "Aankho ki gustakhiyan", filePath: "../uploads/songs/10.mp3", coverPath: "../uploads/covers/10.jpg"},
    {songName: "Warriyo - Mortals", filePath: "../uploads/songs/11.mp3", coverPath: "../uploads/covers/11.jpg"},
];

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    const songNameWithExtension = audioElement.src.split('/').pop();
    const songname = (songNameWithExtension.split('.').slice(0, -1).join('.')) - 1;
    console.log("songname", songname);
    if(audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        document.getElementById("playpause"+songname).classList.remove('fa-circle-play');
        document.getElementById("playpause"+songname).classList.add('fa-circle-pause');
        playingGif.style.opacity = 1;
        masterSongName.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        document.getElementById("playpause"+songname).classList.remove('fa-circle-pause');
        document.getElementById("playpause"+songname).classList.add('fa-circle-play');
        playingGif.style.opacity = 0;
        masterSongName.style.opacity = 0;

    }
});
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value = progress;
})

progressBar.addEventListener('change', ()=>{
    audioElement.currentTime = progressBar.value * audioElement.duration/100;
});

songs.forEach((value, index) => {
    var songContainer = document.querySelector('.song-item-container');
    songContainer.innerHTML += `<div class="song-item">
                                    <img src="`+value.coverPath+`" alt="1">
                                    <span>`+value.songName+`</span>
                                    <span class="song-list-play">
                                        <span class="timestamp" id="timestamp-` + index + `">05:34 
                                            <i id="playpause`+index+`" class="far fa-circle-play song-item-play" onclick="playPauseSongs(event,`+index+`)"></i>
                                        </span>
                                    </span>
                                </div>`;
                                const audio = new Audio(value.filePath);  // Assuming filePath contains the song's path

    audio.addEventListener('loadedmetadata', () => {
        const durationInSeconds = audio.duration;
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60);
        
        // Format to mm:ss and update the timestamp dynamically
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        document.getElementById(`timestamp-${index}`).innerHTML = `${formattedTime} 
            <i id="playpause` + index + `" class="far fa-circle-play song-item-play" onclick="playPauseSongs(event, ` + index + `)"></i>`;
    });
});

// Array.from(document.getElementsByClassName("song-item-play")).forEach((element) => {
//     element.addEventListener('click', (e)=>{
//         console.log(element);
//     });  
// });
function playPauseSongs(event, index) {
    
    songIndex = index;
    console.log(audioElement);
    audioElement.src = `../uploads/songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    if(event.target.classList.contains('fa-circle-play')) {
        resetAllPlay();
        event.target.classList.remove('fa-circle-play');
        event.target.classList.add('fa-circle-pause');
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        playingGif.style.opacity = 1;
        masterSongName.innerHTML = songs[songIndex].songName;
        masterSongName.style.opacity = 1;
    } else {
        songIndex = index;
        audioElement.src = `../uploads/songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        event.target.classList.remove('fa-circle-pause');
        event.target.classList.add('fa-circle-play');
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        playingGif.style.opacity = 0;
        masterSongName.style.opacity = 0;
    }
}

const resetAllPlay = () => {
    Array.from(document.getElementsByClassName('song-item-play')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })       
}

document.getElementById('next').addEventListener('click', () => {
    resetAllPlay();
    if(songIndex >= songs.length-1) {
        songIndex = 0
    } else {
        songIndex += 1;
    }
    audioElement.src = `../uploads/songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.play();
    playingGif.style.opacity = 1;
    masterSongName.style.opacity = 1;

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});
document.getElementById('previous').addEventListener('click', () => {
    resetAllPlay();
    if(songIndex <= 0) {
        songIndex = 0
    } else {
        songIndex -= 1;
    }
    audioElement.src = `../uploads/songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.play();
    masterSongName.style.opacity = 1;
    playingGif.style.opacity = 1;

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

