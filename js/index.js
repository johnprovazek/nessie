let jsonData; // json data containing all band data imported from data/data.json.

// Handles page setup.
window.onload = () => {
  // Handles clicking on the main buttons.
  document.querySelectorAll(".main-button").forEach((mainButton) => {
    mainButton.addEventListener("click", () => {
      let pageName = mainButton.id.replace("-button", "");
      togglePageContent(pageName);
    });
  });
  // Handles clicking on the main logo.
  document.getElementById("band-logo").addEventListener("click", () => {
    home();
  });
  setButtons();
  readTextFile("data/data.json", "null", function (text) {
    jsonData = JSON.parse(text);
    addBackground();
    addAbout();
    addLinks();
    addVideos();
    addPhotos();
    addMusic();
  });
  handleDirectLink();
};

// Sets main buttons to icons if on mobile and to text if on desktop.
function setButtons() {
  if (isMobileDevice()) {
    document.querySelectorAll(".main-button-icon").forEach((mainButtonIcon) => {
      mainButtonIcon.classList.remove("hidden");
    });
  } else {
    document.querySelectorAll(".main-button-text").forEach((mainButtonText) => {
      mainButtonText.classList.remove("hidden");
    });
  }
  document.querySelectorAll(".main-button").forEach((mainButton) => {
    mainButton.classList.remove("hidden");
  });
}

// Sets the main body background.
async function addBackground() {
  let backgroundLayerElement = document.getElementById("background");
  backgroundLayerElement.style.backgroundImage = `url(${jsonData["backgroundImage"]})`;
}

// Creates the About section.
async function addAbout() {
  let containerElement = document.getElementById("about-container");
  containerElement.style.setProperty("--items", jsonData["bandmembers"].length + 3);
  // Add band bio.
  let bandBio = createElement(`<p id='about-band-bio'>${jsonData["bandbio"]}</p>`);
  containerElement.appendChild(bandBio);
  // Add band members title.
  let bandMembersTitle = createElement(`<div class='bold-title' id='about-band-members-title'>Members:</div>`);
  containerElement.appendChild(bandMembersTitle);
  // Add band members.
  jsonData["bandmembers"].forEach((bandMember) => {
    let bandMemberElement = createElement(`
      <div class='about-band-member-container'>
        <div class='about-band-member-text'>
          <div class='bold-title-sm'>${bandMember["name"]}</div>
          <p class='band-member-bio'>${bandMember["bio"]}</p>
        </div>
        <img class='about-band-member-picture' src=${bandMember["picture"]}>
      </div>
    `);
    containerElement.appendChild(bandMemberElement);
  });
  // Adding anchor gif.
  let anchorGif = createElement(`<img src='images/anchor/about.gif' id='about-gif' class='anchor-gif'>`);
  containerElement.appendChild(anchorGif);
}

// Creates the Music section.
async function addMusic() {
  let containerElement = document.getElementById("music-container");
  containerElement.style.setProperty("--items", jsonData["music"].length * 2 + 1);

  jsonData["music"].forEach((music) => {
    // Adding the title of the track/album.
    let albumTitleText = music["title"] + " (" + music["year"] + ")";
    let albumTitleClass = "bold-title-sm";
    let albumTitle = createElement(`<div class='${albumTitleClass}'>${albumTitleText}</div>`);
    containerElement.appendChild(albumTitle);
    // Creating Album container structure.
    if (music["type"] === "Album") {
      let audioAlbumPlayer = createAudioAlbumPlayer(music);
      containerElement.appendChild(audioAlbumPlayer);
    } else {
      let audioPlayer = createAudioPlayer(music, true);
      containerElement.appendChild(audioPlayer);
    }
  });
  // Adding anchor gif.
  let anchorGif = createElement(`<img src='images/anchor/music.gif' id='music-gif' class='anchor-gif'>`);
  containerElement.appendChild(anchorGif);
}

// Creates the Videos section.
async function addVideos() {
  let containerElement = document.getElementById("videos-container");
  containerElement.style.setProperty("--items", jsonData["bandvideos"].length * 2 + 1);
  jsonData["bandvideos"].forEach((bandVideo) => {
    let link = bandVideo["link"];
    let linkCode = link.substring(link.length - 11);
    // Creating video title.
    let videoTitleClass = "bold-title-sm";
    let videoTitleElement = createElement(`<div class='${videoTitleClass}' id=${linkCode + "_title"}></div>`);
    if (bandVideo.hasOwnProperty("title")) {
      let spanNode = document.createElement("span");
      spanNode.innerHTML = bandVideo["title"];
      videoTitleElement.appendChild(spanNode);
    } else {
      readTextFile("https://www.youtube.com/oembed?url=" + link + "&format=json", linkCode, function (text) {
        let youtubeVideoData = JSON.parse(text);
        let titleString = youtubeVideoData["title"];
        if (titleString.length >= 19 && titleString.substring(titleString.length - 19) === " - Nessie the Great") {
          titleString = titleString.substring(0, titleString.length - 19);
        }
        const textNode = document.createTextNode(titleString);
        videoTitleElement.appendChild(textNode);
      });
    }
    containerElement.appendChild(videoTitleElement);
    // Creating lite-youtube element.
    let liteYoutube = createElement(`<lite-youtube videoid=${linkCode} params='enablejsapi=1'></lite-youtube>`);
    containerElement.appendChild(liteYoutube);
  });
  // Adding anchor gif.
  let anchorGif = createElement(`<img src='images/anchor/videos.gif' id='videos-gif' class='anchor-gif'>`);
  containerElement.appendChild(anchorGif);
}

// Creates the Photos section.
async function addPhotos() {
  let containerElement = document.getElementById("photos-container");
  containerElement.style.setProperty("--items", jsonData["bandphotos"].length + 1);
  jsonData["bandphotos"].forEach((bandPhoto) => {
    let bandPhotoElement = createElement(`<img class='photos-band-picture' src=${bandPhoto}>`);
    containerElement.appendChild(bandPhotoElement);
  });
  // Adding anchor gif.
  let anchorGif = createElement(`<img src='images/anchor/photos.gif' id='photos-gif' class='anchor-gif'>`);
  containerElement.appendChild(anchorGif);
}

// Creates the Links section.
async function addLinks() {
  let containerElement = document.getElementById("links-container");
  containerElement.style.setProperty("--items", jsonData["links"].length + 1);
  jsonData["links"].forEach((link) => {
    let linkElement = createElement(`
      <a href=${link["link"]} class='link'>
        <div class='bold-title-sm'>
          <i class='fa ${link["logo"]}'></i>
            ${link["text"]}
        </div>
      </a>
    `);
    containerElement.appendChild(linkElement);
  });
  // Adding anchor gif.
  let anchorGif = createElement(`<img src='images/anchor/links.gif' id='links-gif' class='anchor-gif'>`);
  containerElement.appendChild(anchorGif);
}

// Scrolls page content to the top.
function scrollToTop(exceptionId) {
  document.querySelectorAll(".main-content").forEach((pageContent) => {
    if (pageContent.id !== exceptionId) {
      pageContent.scrollTo(0, 0);
    }
  });
}

// Handles toggling between page contents.
function togglePageContent(pageName) {
  let pageContentId = pageName + "-content";
  if (!document.getElementById(pageContentId).classList.contains("hidden")) {
    home();
  } else {
    scrollToTop(pageContentId);
    document.getElementById("band-logo").classList.add("active");
    if (!document.getElementById("videos-content").classList.contains("hidden") && pageName != "videos") {
      pauseVideos();
    }
    if (!document.getElementById("music-content").classList.contains("hidden") && pageName != "music") {
      pauseMusicPlayers();
    }
    // Removing and adding page content.
    document.querySelectorAll(".main-content").forEach((pageContent) => {
      pageContent.classList.add("hidden");
    });
    document.getElementById(pageContentId).classList.remove("hidden");
    // Setting active page button color.
    document.querySelectorAll(".main-button").forEach((mainButton) => {
      mainButton.classList.remove("active");
    });
    document.getElementById(pageName + "-button").classList.add("active");
  }
}

// Handles loading the website with a direct link to a page.
function handleDirectLink() {
  let pageName = window.location.toString().toLowerCase().split("#")[1];
  if (
    pageName === "about" ||
    pageName === "music" ||
    pageName === "videos" ||
    pageName === "links" ||
    pageName === "photos"
  ) {
    togglePageContent(pageName);
  }
}

// Handles setting the page to the 'home' state.
function home() {
  scrollToTop();
  document.getElementById("band-logo").classList.remove("active");
  if (document.getElementById("videos-content").style.display == "block") {
    pauseVideos();
  }
  if (document.getElementById("music-content").style.display == "block") {
    pauseMusicPlayers();
  }
  // Removing content.
  document.querySelectorAll(".main-content").forEach((pageContent) => {
    pageContent.classList.add("hidden");
  });
  // Changing button color.
  document.querySelectorAll(".main-button").forEach((mainButton) => {
    mainButton.classList.remove("active");
  });
}
