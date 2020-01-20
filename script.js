
const music = document.querySelector(".music");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".video-container video");
//Sounds
const sounds = document.querySelectorAll(".sound-select button");
//Time Display
const timeDisplay = document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();
//Duration
const timeSelect = document.querySelectorAll(".time-choice button");
let fakeDuration = 600;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
  fakeDuration % 60
)}`;

sounds.forEach(sound => {
  sound.addEventListener("click", function() {
    music.src = this.getAttribute("sound-data");
    video.src = this.getAttribute("video-data");
    checkPlaying(music);
  });
});

play.addEventListener("click", function() {
  checkPlaying(music);
});

replay.addEventListener("click", function() {
    restartSong(music);
    
  });


const restartSong = music =>{
    let currentTime = music.currentTime;
    music.currentTime = 0;
    

}

timeSelect.forEach(option => {
  option.addEventListener("click", function() {
    fakeDuration = this.getAttribute("time-length");
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
      fakeDuration % 60
    )}`;
  });
});

const checkPlaying = music => {
  if (music.paused) {
    music.play();
    video.play();
    play.src = "./svg/pause.svg";
  } else {
    music.pause();
    video.pause();
    play.src = "./svg/play.svg";
  }
};

music.ontimeupdate = function() {
  let currentTime = music.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);
  timeDisplay.textContent = `${minutes}:${seconds}`;
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;

  if (currentTime >= fakeDuration) {
    music.pause();
    music.currentTime = 0;
    play.src = "./svg/play.svg";
    video.pause();
  }
};