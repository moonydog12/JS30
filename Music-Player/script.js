const musicContainer = document.querySelector('.music');
const playBtn = document.querySelector('.action-btn-play');
const prevBtn = document.querySelector('.action-btn-prev');
const nextBtn = document.querySelector('.action-btn-next');
const audio = document.querySelector('.audio');
const progressContainer = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__bar');
const musicTitle = document.querySelector('.music__title');
const imageCover = document.querySelector('.image__cover');

// Song titles
const songs = ['City-of-tears', 'Greenpath', 'Dirtmouth'];

// Keep track of songs
let songIndex = 0;

// Update song details
const loadSong = (song) => {
  const title = song.replaceAll('-', ' ');
  musicTitle.innerHTML = title;
  audio.src = `music/${song}.mp3`;
  imageCover.src = `images/${song}.jpg`;
};

// Play song
const playSong = () => {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
};

// pause song
const pauseSong = () => {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audio.pause();
};

// Switch song
const switchSong = (direction) => () => {
  switch (direction) {
    case 'prev':
      songIndex -= 1;
      if (songIndex < 0) {
        songIndex = songs.length - 1;
      }
      break;
    case 'next':
      songIndex += 1;
      if (songIndex > songs.length - 1) {
        songIndex = 0;
      }
      break;
    default:
  }
  loadSong(songs[songIndex]);
  playSong();
};
// Update progress bar
const updateProgress = (e) => {
  const { duration, currentTime } = e.target;
  const progressPercent = Math.floor((currentTime / duration) * 100);
  progressBar.style.width = `${progressPercent}%`;
};

// Set progress bar
const setProgress = (e) => {
  const width = e.target.clientWidth;
  const clickX = e.offsetX;
  const { duration } = audio;

  audio.currentTime = (clickX / width) * duration;
};

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Listener
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', switchSong('prev'));
nextBtn.addEventListener('click', switchSong('next'));

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', switchSong('next'));
