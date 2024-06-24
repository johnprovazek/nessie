// This audio player was adapted from this guide: https://css-tricks.com/lets-create-a-custom-audio-player/

// Creates an audio player.
function createAudioPlayer(trackData, includeCover) {
  let audioPlayerId =
    trackData["title"]
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-") + "-audio-player";
  return createElement(`
    <div id=${audioPlayerId} class='audio-player-container'>
      ${includeCover ? `<img src=${trackData["cover"]} class='cover-art-track'></img>` : ""}
      <div class='${includeCover ? "audio-container with-cover-art" : "audio-container without-cover-art"}'>
        <div class='audio-title'>${trackData["title"]}</div>
        <div class='play-seek-mute-container'>
          <button class='audio-button play-toggle' onclick=togglePlay('${audioPlayerId}') ><i class='play-toggle-icon fa fa-play'></i></button>
          <input type='range' step='0.1' class='seek-slider' max='100' value='0'
            oninput=handleSeekSlider('${audioPlayerId}')
            onchange=setAudioTime('${audioPlayerId}')
            onmouseup=seekSliderRelease('${audioPlayerId}')
            ontouchend=seekSliderRelease('${audioPlayerId}')
          >
          <button class='audio-button mute-toggle' onclick=toggleMute('${audioPlayerId}') ><i class='mute-toggle-icon fa fa-volume-up'></i></button>
        </div>
        <div class='time-social-container'>
          <div class='time'></div>
          <div class='time-social-gap'></div>
          <a class='audio-link' href=${trackData["spotify"]}><i class='audio-link-icon fa fa-spotify'></i></a>
          <a class='audio-link' href=${trackData["applemusic"]}><i class='audio-link-icon fa fa-apple'></i></a>
          <a class='audio-link' href=${trackData["soundcloud"]}><i class='audio-link-icon fa fa-soundcloud'></i></a>
        </div>
      </div>
      <audio
        class='audio'
        preload='metadata'
        src=${trackData["audio"]}
        onloadedmetadata=loadAudioFeatures('${audioPlayerId}')
        ontimeupdate=updateSeekSlider('${audioPlayerId}')
        onended=resetAudio('${audioPlayerId}')
      >
    </div>
  `);
}

// Creates an audio album player.
function createAudioAlbumPlayer(albumData) {
  let audioAlbumContainer = createElement(`
    <div class='audio-album-container'>
      <div class='audio-album-info-container'>
        <img src=${albumData["cover"]} class='cover-art-album'></img>
        <div class='audio-album-data-container'>
          <div class='album-data'>${albumData["title"]}</div>
          <div class='album-data'>${albumData["artist"]}</div>
          <div class='album-data'>${albumData["length"]}</div>
        </div>
      </div>
    </div>
  `);
  // Adding in tracks under the album.
  albumData["tracks"].forEach((track) => {
    let audioPlayer = createAudioPlayer(track, false);
    audioAlbumContainer.appendChild(audioPlayer);
  });
  return audioAlbumContainer;
}

// Pauses all audio players.
function pauseMusicPlayers(audioPlayerId) {
  document.querySelectorAll(".audio-player-container").forEach((audioPlayerContainer) => {
    let iconElement = audioPlayerContainer.querySelector(".play-toggle-icon");
    let audioElement = audioPlayerContainer.querySelector(".audio");
    if (audioPlayerContainer.id != audioPlayerId && iconElement.classList.contains("fa-pause")) {
      audioElement.pause();
      iconElement.classList.remove("fa-pause");
      iconElement.classList.add("fa-play");
    }
  });
}

// Toggles play/pause for an audio player.
function togglePlay(audioPlayerId) {
  let audioPlayer = document.getElementById(audioPlayerId);
  let iconElement = audioPlayer.querySelector(".play-toggle-icon");
  let audioElement = audioPlayer.querySelector(".audio");
  if (iconElement.classList.contains("fa-play")) {
    audioElement.play();
    pauseMusicPlayers(audioPlayerId);
    iconElement.classList.remove("fa-play");
    iconElement.classList.add("fa-pause");
  } else if (iconElement.classList.contains("fa-pause")) {
    audioElement.pause();
    iconElement.classList.remove("fa-pause");
    iconElement.classList.add("fa-play");
  }
}

// Toggles mute/volume for an audio player.
function toggleMute(audioPlayerId) {
  let audioPlayer = document.getElementById(audioPlayerId);
  let iconElement = audioPlayer.querySelector(".mute-toggle-icon");
  let audioElement = audioPlayer.querySelector(".audio");
  if (iconElement.classList.contains("fa-volume-up")) {
    audioElement.muted = true;
    iconElement.classList.remove("fa-volume-up");
    iconElement.classList.add("fa-volume-off");
  } else if (iconElement.classList.contains("fa-volume-off")) {
    audioElement.muted = false;
    iconElement.classList.remove("fa-volume-off");
    iconElement.classList.add("fa-volume-up");
  }
}

// Handles setting the audio player time value.
function setTime(audioPlayerId, secs) {
  let audioPlayer = document.getElementById(audioPlayerId);
  let timeElement = audioPlayer.querySelector(".time");
  let minutes = Math.floor(secs / 60);
  let seconds = Math.floor(secs % 60);
  let timeFormatted = `${minutes}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
  if (!timeElement.hasAttribute("data-duration")) {
    timeElement.setAttribute("data-duration", timeFormatted);
    timeElement.innerHTML = `0:00/${timeFormatted}`;
  } else {
    timeElement.innerHTML = `${timeFormatted}/${timeElement.getAttribute("data-duration")}`;
  }
}

// Handles loading audio features.
function loadAudioFeatures(audioPlayerId) {
  let audioPlayer = document.getElementById(audioPlayerId);
  let audioElement = audioPlayer.querySelector(".audio");
  let audioDuration = audioElement.duration;
  setTime(audioPlayerId, audioDuration);
  let seekSlider = audioPlayer.querySelector(".seek-slider");
  seekSlider.max = Math.round(audioDuration * 10) / 10;
}

// Handles moving seek slider.
function handleSeekSlider(audioPlayerId) {
  let audioPlayer = document.getElementById(audioPlayerId);
  let seekSlider = audioPlayer.querySelector(".seek-slider");
  if (!seekSlider.classList.contains("seeking")) {
    seekSlider.classList.add("seeking");
  }
  setTime(audioPlayerId, seekSlider.value);
  audioPlayer.style.setProperty("--seek-before-width", (seekSlider.value / seekSlider.max) * 100 + "%");
}

// Handles adjusting audio time.
function setAudioTime(audioPlayerId) {
  let audioPlayer = document.getElementById(audioPlayerId);
  let audioElement = audioPlayer.querySelector(".audio");
  let seekSlider = audioPlayer.querySelector(".seek-slider");
  audioElement.currentTime = seekSlider.value;
  if (seekSlider.value === seekSlider.max) {
    resetAudio(audioPlayerId);
  }
}

// Updates the seek slider position.
function updateSeekSlider(audioPlayerId) {
  let audioPlayer = document.getElementById(audioPlayerId);
  let seekSlider = audioPlayer.querySelector(".seek-slider");
  let audioElement = audioPlayer.querySelector(".audio");
  if (!seekSlider.classList.contains("seeking")) {
    seekSlider.value = Math.floor(audioElement.currentTime);
    setTime(audioPlayerId, Math.floor(audioElement.currentTime));
    audioPlayer.style.setProperty("--seek-before-width", (seekSlider.value / seekSlider.max) * 100 + "%");
  }
}

// Resets audio to start.
function resetAudio(audioPlayerId) {
  let audioPlayer = document.getElementById(audioPlayerId);
  let iconElement = audioPlayer.querySelector(".play-toggle-icon");
  let audioElement = audioPlayer.querySelector(".audio");
  if (iconElement.classList.contains("fa-pause")) {
    audioElement.currentTime = 0;
    audioElement.pause();
    iconElement.classList.remove("fa-pause");
    iconElement.classList.add("fa-play");
  }
  let seekSlider = audioPlayer.querySelector(".seek-slider");
  seekSlider.value = 0;
  setTime(audioPlayerId, 0);
  audioPlayer.style.setProperty("--seek-before-width", "0%");
}

// Handles release of seek slider.
function seekSliderRelease(audioPlayerId) {
  let audioPlayer = document.getElementById(audioPlayerId);
  let seekSlider = audioPlayer.querySelector(".seek-slider");
  if (seekSlider.classList.contains("seeking")) {
    seekSlider.classList.remove("seeking");
  }
}
