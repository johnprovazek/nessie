var jsonData; // Json that contains all the band data imported from data.json.

// Handles loading the page content.
window.addEventListener('load', function(event) {
  setButtons();
  readTextFile('data/data.json', 'null', function(text){
    jsonData = JSON.parse(text);
    addBackground();
    addAbout();
    addLinks();
    addVideos();
    addPhotos();
    addMusic();
  });
  handleDirectLink();
});

// Determines if browser is mobile or desktop.
function isMobileDevice() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

// Sets main buttons to icons if mobile and to text if desktop.
function setButtons(){
  if(isMobileDevice()){
    let icons = document.getElementsByClassName('main-button-icon');
    for (let i = 0; i < icons.length; i++) {
      icons[i].style.display = 'block';
    }
  }
  else{
    let texts = document.getElementsByClassName('main-button-text');
    for (let i = 0; i < texts.length; i++) {
      texts[i].style.display = 'block';
    }
  }
  let mainbuttons = document.getElementsByClassName('main-button')
  for (let i = 0; i < mainbuttons.length; i++) {
    mainbuttons[i].style.display = 'block';
  }
}

// Reads in a text file.
function readTextFile(file, link_code, callback) {
  let rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType('application/json');
  rawFile.open('GET', file, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4 && rawFile.status == '200') {
      callback(rawFile.responseText, link_code);
    }
  }
  rawFile.send(null);
}

// Sets the main body background.
async function addBackground(){
  let backgroundLayerElement = document.getElementById('background-layer');
  backgroundLayerElement.style.backgroundImage = `url(${jsonData['backgroundImage']})`;
  backgroundLayerElement.style.opacity = 1;
}

// Creates a HTML element from an HTML string.
function createElement(htmlString){
  let wrapper = document.createElement('div');
  wrapper.innerHTML= htmlString.trim();
  return wrapper.firstChild;
}

// Creates the About section.
async function addAbout(){
  let containerElement = document.getElementById('about-container');
  containerElement.style.setProperty('--items', jsonData['bandmembers'].length + 3);
  // Add band bio.
  let bandBio = createElement(`<p id='about-band-bio'>${jsonData['bandbio']}</p>`);
  containerElement.appendChild(bandBio);
  // Add band members title.
  let bandMembersTitle = createElement(`<div class='bold-title' id='about-band-members-title'>Members:</div>`);
  containerElement.appendChild(bandMembersTitle);
  // Add band members.
  for (let i = 0; i < jsonData['bandmembers'].length; i++){
    let bandMember = createElement(`
      <div class='band-member-container'>
        <div class='about-band-member-text'>
          <div class='bold-title-sm'>${jsonData['bandmembers'][i]['name']}</div>
          <div class='band-member-bio'>${jsonData['bandmembers'][i]['bio']}</div>
        </div>
        <img class='about-band-member-picture' src=${jsonData['bandmembers'][i]['picture']}>
      </div>
    `);
    containerElement.appendChild(bandMember);
  }
  // Adding anchor gif to the section.
  let anchorGif = createElement(`<img src='img/anchor/anchor.png' id='about-gif' class='anchor-gif'>`);
  containerElement.appendChild(anchorGif);
}

// Creates the Links section.
async function addLinks(){
  let containerElement = document.getElementById('links-container');
  containerElement.style.setProperty('--items', jsonData['links'].length+1);
  for (let i = 0; i < jsonData['links'].length; i++){
    let link = createElement(`
      <a href=${jsonData['links'][i]['link']} class='link ${i % 2 === 0 ? 'link-odd' : 'link-even'}'>
        <div class='bold-title-sm'><i class='fa ${jsonData['links'][i]['logo']}'></i> ${jsonData['links'][i]['text']}</div>
      </a>
    `);
    containerElement.appendChild(link);
  }
  // Adding anchor gif to the section.
  let anchorGif = createElement(`<img src='img/anchor/anchor.png' id='links-gif' class='anchor-gif'>`);
  containerElement.appendChild(anchorGif);
}

// Creates the Videos section.
async function addVideos(){
  let containerElement = document.getElementById('videos-container');
  containerElement.style.setProperty('--items', jsonData['bandvideos'].length*2+1);
  for (let i = 0; i < jsonData['bandvideos'].length; i++){
    let link = jsonData['bandvideos'][i]['link'];
    let link_code = link.substring(link.length - 11);
    // Creating video title.
    let videoTitleClass = 'bold-title-sm';
    if(i === 0){
      videoTitleClass = videoTitleClass + ' below-main-title';
    }
    let videoTitleElement = createElement(`<div class='${videoTitleClass}' id=${link_code + '_title'}></div>`);
    if(jsonData['bandvideos'][i].hasOwnProperty('title')){ 
      const textNode = document.createTextNode(jsonData['bandvideos'][i]['title']);
      videoTitleElement.appendChild(textNode);
    }
    else{
      readTextFile('https://www.youtube.com/oembed?url=' + link + '&format=json', link_code, function(text, video_id){
        youtube_video_data = JSON.parse(text);
        let titleString = youtube_video_data['title'];
        if( titleString.length >= 19 && titleString.substring(titleString.length - 19) === ' - Nessie the Great' ){
          titleString = titleString.substring(0, titleString.length - 19);
        }
        const textNode = document.createTextNode(titleString);
        videoTitleElement.appendChild(textNode);
      });
    }
    containerElement.appendChild(videoTitleElement);
    // Creating lite-youtube element.
    let liteYoutube = createElement(`<lite-youtube videoid=${link_code} params='enablejsapi=1'></lite-youtube>`);
    containerElement.appendChild(liteYoutube);
  }
  // Adding anchor gif to the section.
  let anchorGif = createElement(`<img src='img/anchor/anchor.png' id='videos-gif' class='anchor-gif'>`);
  containerElement.appendChild(anchorGif);
}

// Creates the Photos section.
async function addPhotos(){
  let containerElement = document.getElementById('photos-container');
  containerElement.style.setProperty('--items', jsonData['bandphotos'].length+1);
  for (let i = 0; i < jsonData['bandphotos'].length; i++){
    let bandPic = createElement(`<img class='band-pic' src=${jsonData['bandphotos'][i]}>`);
    containerElement.appendChild(bandPic);
  }
  // Adding anchor gif to the section.
  let anchorGif = createElement(`<img src='img/anchor/anchor.png' id='photos-gif' class='anchor-gif'>`);
  containerElement.appendChild(anchorGif);
}

// Creates an audio player.
function createAudioPlayer(trackData, includeCover){
  let audioPlayerId = trackData['title'].toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-') + '-audio-player';
  return createElement(`
    <div id=${audioPlayerId} class='audio-player-container'>
      ${includeCover ? `<img src=${trackData['cover']} class='cover-art-track'></img>` : ''}
      <div class='${includeCover ? 'audio-container with-cover-art' : 'audio-container without-cover-art'}'>
        <div class='audio-title'>${trackData['title']}</div>
        <div class='play-seek-mute-container'>
          <button class='audio-button play-toggle' onclick=togglePlay('${audioPlayerId}') ><i class='play-toggle-icon fa fa-play'></i></button>
          <input type='range' step='0.1' class='seek-slider' max='100' value='0' 
            oninput=handleSeekSlider('${audioPlayerId}')
            onchange=setAudioTime('${audioPlayerId}')
            onmouseup=onMouseUp('${audioPlayerId}')
          >
          <button class='audio-button mute-toggle' onclick=toggleMute('${audioPlayerId}') ><i class='mute-toggle-icon fa fa-volume-up'></i></button>
        </div>
        <div class='time-social-container'>
          <div class='time'></div>
          <div class='time-social-gap'></div>
          <a class='audio-link' href=${trackData['spotify']}><i class='audio-link-icon fa fa-spotify'></i></a>
          <a class='audio-link' href=${trackData['applemusic']}><i class='audio-link-icon fa fa-apple'></i></a>
          <a class='audio-link' href=${trackData['soundcloud']}><i class='audio-link-icon fa fa-soundcloud'></i></a>
        </div>
      </div>
      <audio
        class='audio'
        preload='metadata'
        src=${trackData['audio']}
        onloadedmetadata=loadAudioFeatures('${audioPlayerId}')
        ontimeupdate=updateSeekSlider('${audioPlayerId}')
        onended=resetAudio('${audioPlayerId}')
        ondurationchange=onDurationChange('${audioPlayerId}')
      >
    </div>
  `);
}

// Creates the Music section.
async function addMusic(){
  let containerElement = document.getElementById('music-container');
  containerElement.style.setProperty('--items', jsonData['music'].length*2 + 1); 
  for (let i = 0; i < jsonData['music'].length; i++){
    // Adding the title of the track/album.
    let albumTitleText = jsonData['music'][i]['title'] + ' (' + jsonData['music'][i]['year'] + ')';
    let albumTitleClass = 'bold-title-sm';
    if(i === 0){
      albumTitleClass = albumTitleClass + ' below-main-title';
    }
    let albumTitle = createElement(`<div class='${albumTitleClass}'>${albumTitleText}</div>`);
    containerElement.appendChild(albumTitle);
    // Creating Album container structure.
    if(jsonData['music'][i]['type'] === 'Album'){
      let audioAlbumContainer = createElement(`
        <div class='audio-album-container'>
          <div class='audio-album-info-container'>
            <img src=${jsonData['music'][i]['cover']} class='cover-art-album'></img>
            <div class='audio-album-data-container'>
              <div class='album-data'>${jsonData['music'][i]['title']}</div>
              <div class='album-data'>${jsonData['music'][i]['artist']}</div>
              <div class='album-data'>${jsonData['music'][i]['length']}</div>
            </div>
          </div>
        </div>
      `);
      // Adding in tracks under the album.
      for (let j = 0; j < jsonData['music'][i]['tracks'].length; j++){
        let audioPlayer = createAudioPlayer(jsonData['music'][i]['tracks'][j], false);
        audioAlbumContainer.appendChild(audioPlayer);
      }
      containerElement.appendChild(audioAlbumContainer);
    }
    else{
      // Adding single song audio player.
      let audioPlayer = createAudioPlayer(jsonData['music'][i], true);
      containerElement.appendChild(audioPlayer);
    }
  }
  // Adding anchor gif to the section.
  let anchorGif = createElement(`<img src='img/anchor/anchor.png' id='music-gif' class='anchor-gif'>`);
  containerElement.appendChild(anchorGif);
}

// Scrolls content pages to the top of the page.
function scrollToTop(exceptionId){
  let pages = document.getElementsByClassName('content');
  for (let i = 0; i < pages.length; i++) {
    if(pages[i].id !== exceptionId){
      pages[i].scrollTo(0, 0);
    }
  }
}

// Toggles between pages.
function toggle(page) {
  scrollToTop(page + '-content');
  if(document.getElementById('videos-content').style.display == 'block' && page != 'videos'){
    pauseVideos();
  }
  if(document.getElementById('music-content').style.display == 'block' && page != 'music'){
    pauseMusicPlayers();
  }
  // Removing and Adding content.
  let pages = document.getElementsByClassName('content');
  for (let i = 0; i < pages.length; i++) {
    pages[i].style.display = 'none';
  }
  let toggledPage = document.getElementById(page + '-content');
  toggledPage.style.display = 'block';
  // Changing button color.
  let buttons = document.getElementsByClassName('main-button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = 'white';
  }
  let toggledButton = document.getElementById(page + '-button');
  toggledButton.style.backgroundColor = '#FDBA21';
}

// Handles loading the website with a direct link to a page.
function handleDirectLink(){
  let page = window.location.toString().toLowerCase().split('#')[1];
  if(page === 'about' || page === 'music' || page === 'videos' || page === 'links' || page === 'photos'){
    toggle(page);
  }
}

// Handles setting the page to the 'home' state.
function home(){
  scrollToTop();
  if(document.getElementById('videos-content').style.display == 'block'){
    pauseVideos();
  }
  if(document.getElementById('music-content').style.display == 'block'){
    pauseMusicPlayers();
  }
  // Removing content.
  let pages = document.getElementsByClassName('content');
  for (let i = 0; i < pages.length; i++) {
    pages[i].style.display = 'none';
  }
  // Changing button color.
  let buttons = document.getElementsByClassName('main-button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = 'white';
  }
}