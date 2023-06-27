function pauseMusicPlayers(audioPlayerId){
  let audioPlayers = document.getElementsByClassName('audio-player-container');
  for (let i = 0; i < audioPlayers.length; i++) {
    let iconElement = audioPlayers[i].querySelector('.play-toggle-icon');
    let audioElement = audioPlayers[i].querySelector('.audio');
    if(audioPlayers[i].id != audioPlayerId && iconElement.classList.contains('fa-pause')){
      audioElement.pause();
      iconElement.classList.remove('fa-pause');
      iconElement.classList.add('fa-play');
    }
  }
}

function togglePlay(audioPlayerId){
  let audioPlayer = document.getElementById(audioPlayerId);
  let iconElement = audioPlayer.querySelector('.play-toggle-icon');
  let audioElement = audioPlayer.querySelector('.audio');
  if(iconElement.classList.contains('fa-play')){
    audioElement.play();
    pauseMusicPlayers(audioPlayerId);
    iconElement.classList.remove('fa-play');
    iconElement.classList.add('fa-pause');
  }
  else if(iconElement.classList.contains('fa-pause')){
    audioElement.pause();
    iconElement.classList.remove('fa-pause');
    iconElement.classList.add('fa-play');
  }
}

function toggleMute(audioPlayerId){
  let audioPlayer = document.getElementById(audioPlayerId);
  let iconElement = audioPlayer.querySelector('.mute-toggle-icon');
  let audioElement = audioPlayer.querySelector('.audio');
  if(iconElement.classList.contains('fa-volume-up')){
    audioElement.muted = true;
    iconElement.classList.remove('fa-volume-up');
    iconElement.classList.add('fa-volume-off');
  }
  else if(iconElement.classList.contains('fa-volume-off')){
    audioElement.muted = false;
    iconElement.classList.remove('fa-volume-off');
    iconElement.classList.add('fa-volume-up');
  }
}

function setTime(audioPlayerId, secs){
  let audioPlayer = document.getElementById(audioPlayerId);
  let timeElement = audioPlayer.querySelector('.time');
  let minutes = Math.floor(secs / 60);
  let seconds = Math.floor(secs % 60);
  let timeFormatted = `${minutes}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
  if(!timeElement.hasAttribute('data-duration')){
    timeElement.setAttribute('data-duration', timeFormatted);
    timeElement.innerHTML = `0:00/${timeFormatted}`;
  }
  else{
    timeElement.innerHTML = `${timeFormatted}/${timeElement.getAttribute('data-duration')}`;
  }
}

function loadAudioFeatures(audioPlayerId){
  let audioPlayer = document.getElementById(audioPlayerId);
  let audioElement = audioPlayer.querySelector('.audio');
  let audioDuration = audioElement.duration;
  setTime(audioPlayerId, audioDuration);
  let seekSlider = audioPlayer.querySelector('.seek-slider');
  seekSlider.max = Math.round(audioDuration * 10) / 10;
}

function handleSeekSlider(audioPlayerId){
  let audioPlayer = document.getElementById(audioPlayerId);
  let seekSlider = audioPlayer.querySelector('.seek-slider');
  if(!seekSlider.classList.contains('seeking')){
    seekSlider.classList.add('seeking');
  }
  setTime(audioPlayerId, seekSlider.value);
  audioPlayer.style.setProperty('--seek-before-width', seekSlider.value / seekSlider.max * 100 + '%');
}

function setAudioTime(audioPlayerId){
  let audioPlayer = document.getElementById(audioPlayerId);
  let audioElement = audioPlayer.querySelector('.audio');
  let seekSlider = audioPlayer.querySelector('.seek-slider');
  audioElement.currentTime = seekSlider.value;
  if(seekSlider.value === seekSlider.max){
    resetAudio(audioPlayerId);
  }
}

function updateSeekSlider(audioPlayerId){
  let audioPlayer = document.getElementById(audioPlayerId);
  let seekSlider = audioPlayer.querySelector('.seek-slider');
  let audioElement = audioPlayer.querySelector('.audio');
  if(!seekSlider.classList.contains('seeking')){
    seekSlider.value = Math.floor(audioElement.currentTime);
    setTime(audioPlayerId, Math.floor(audioElement.currentTime));
    audioPlayer.style.setProperty('--seek-before-width', seekSlider.value / seekSlider.max * 100 + '%');
  }
}

function resetAudio(audioPlayerId){
  let audioPlayer = document.getElementById(audioPlayerId);
  let iconElement = audioPlayer.querySelector('.play-toggle-icon');
  let audioElement = audioPlayer.querySelector('.audio')
  if(iconElement.classList.contains('fa-pause')){
    audioElement.currentTime = 0;
    audioElement.pause();
    iconElement.classList.remove('fa-pause');
    iconElement.classList.add('fa-play');
  }
  let seekSlider = audioPlayer.querySelector('.seek-slider');
  seekSlider.value = 0;
  setTime(audioPlayerId, 0);
  audioPlayer.style.setProperty('--seek-before-width', '0%');
}

function onMouseUp(audioPlayerId){
  let audioPlayer = document.getElementById(audioPlayerId);
  let seekSlider = audioPlayer.querySelector('.seek-slider');
  if(seekSlider.classList.contains('seeking')){
    seekSlider.classList.remove('seeking');
  }
}

function onDurationChange(audioPlayerId){
  let audioPlayer = document.getElementById(audioPlayerId);
  let audioElement = audioPlayer.querySelector('.audio');
}