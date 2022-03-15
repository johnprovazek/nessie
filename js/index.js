var json_data
var screen_width
var screen_height
var cat_audio;
window.addEventListener('load', function(event) {
    screen_width = screen.width
    screen_height = screen.height
    cat_audio = new Audio('audio/cat.wav');
    has_cat_played = false;
    if(document.cookie == ""){
        document.cookie = "true"
    }
    setButtons()
    readTextFile("data/data.json", "null", function(text){
        json_data = JSON.parse(text);
        addBackground()
        addAbout()
        addLinks()
        addBandVideos()
        addBandPhotos()
        addSpotify()
    });
    handleDirectLink();
});

window.addEventListener('resize', function(event) {
    resizeYoutube()
});

function home(){
    // Removing content
    var items = document.getElementsByClassName("content");
    for (var i = 0; i < items.length; i++) {
        items[i].style.display = "none"
    }
    // Changing button color
    var items = document.getElementsByClassName("main-button");
    for (var i = 0; i < items.length; i++) {
        items[i].style.backgroundColor = "white";
    }
}

function handleDirectLink(){
    if(location.toString().split("#")[1]){
        var url = location.toString().split("#")[1].toLowerCase();
    }
    if(url == "about"){
        var element = document.getElementById("about-button")
        toggle(element)
    }
    else if(url == "music"){
        var element = document.getElementById("music-button")
        toggle(element)
    }
    else if(url == "videos"){
        var element = document.getElementById("videos-button")
        toggle(element)
    }
    else if(url == "links"){
        var element = document.getElementById("links-button")
        toggle(element)
    }
    else if(url == "shop"){
        var element = document.getElementById("shop-button")
        toggle(element)
    }
}

function toggle(el) {
    // Killing Spotify if necessary
    // if(document.getElementById("music-content").style.display == "block" && el.value != "music"){
    //     spotifyKill()
    // }
    // Removing content
    var items = document.getElementsByClassName("content");
    for (var i = 0; i < items.length; i++) {
        items[i].style.display = "none"
    }
    toggledcontent = document.getElementById(el.value + "-content");
    toggledcontent.style.display = "block"
    // Changing button color
    var items = document.getElementsByClassName("main-button");
    for (var i = 0; i < items.length; i++) {
        items[i].style.backgroundColor = "white";
    }
    toggledbutton = document.getElementById(el.value + "-button");
    toggledbutton.style.backgroundColor = "#FDBA21";
}

// Work around to kill spotify player when moving to another tab
function spotifyKill(){
    var containerElement = document.getElementById("music-container");
    for (var i = containerElement.children.length - 1; i > -1; i--) {
        containerElement.removeChild(containerElement.children[i]);
    }
    var titleElement = document.createElement("div");
    titleElement.classList.add("bold-title-sm");
    var titleElementText = document.createTextNode("Music:");
    titleElement.appendChild(titleElementText);
    containerElement.appendChild(titleElement);
    addSpotify()
}

// Sets main buttons to icons if mobile and to text if desktop
function setButtons(){
    if(isMobileDevice()){
        var icons = document.getElementsByClassName("main-button-icon");
        for (var i = 0; i < icons.length; i++) {
            icons[i].style.display = "block";
        }
    }
    else{
        var texts = document.getElementsByClassName("main-button-text");
        for (var i = 0; i < texts.length; i++) {
            texts[i].style.display = "block";
        }
    }
    var mainbuttons = document.getElementsByClassName("main-button")
    for (var i = 0; i < mainbuttons.length; i++) {
        mainbuttons[i].style.display = "block";
    }
}

/*  Determine if on a mobile device - taken from internet */
function isMobileDevice() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

function readTextFile(file, link_code, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText, link_code);
        }
    }
    rawFile.send(null);
}


// Sets the main body background
function addBackground(){
    var max_width = screen_width
    if(screen_height > screen_width){
        max_width = Math.ceil(screen_height * (3/2))
    }
    document.body.style.backgroundImage = "url(\"" + json_data["backgroundImage"]  + "=w" + max_width + "\")" ;
}

// Adds youtube videos to the DOM from links in data.json
// Calls youtube endpoint to get json with video title
// Utilizing https://github.com/paulirish/lite-youtube-embed for faster youtube elements
function addBandVideos(){
    for (var i = 0; i < json_data["bandvideos"].length; i++){
        var link = json_data["bandvideos"][i]
        var link_code = link.substring(link.length - 11)
        var youtubeContainer = document.createElement("div");
        youtubeContainer.classList.add("videos-youtube-container");
        var title = document.createElement("div");
        title.classList.add("bold-title-sm");
        title.id = link_code + "_title"
        youtubeContainer.appendChild(title);
        var liteYoutube = document.createElement("lite-youtube");
        liteYoutube.setAttribute("videoid", link_code);
        // liteYoutube.setAttribute("params","autoplay=0")
        youtubeContainer.appendChild(liteYoutube);
        var bandVideosTitle = document.getElementById("band-videos")
        bandVideosTitle.parentNode.insertBefore(youtubeContainer, bandVideosTitle);
        readTextFile("https://www.youtube.com/oembed?url=" + link + "&format=json", link_code, function(text, video_id){
            youtube_video_data = JSON.parse(text);
            var titleElement = document.getElementById(video_id + "_title")
            const textNode = document.createTextNode(youtube_video_data["title"]);
            titleElement.appendChild(textNode);
        });
    }
}

// Adds band pictures to the DOM from links in data.json
// Built assuming Google Photos links were provided
function addBandPhotos(){
    var max_width = 1000
    var desktop_max = Math.ceil(screen_width*.45)
    if(desktop_max > max_width){
        max_width = desktop_max
    }
    for (var i = 0; i < json_data["bandphotos"].length; i++){
        var link = json_data["bandphotos"][i]
        var imgElement = document.createElement("img");
        imgElement.id = "bandpic" + i
        imgElement.style.width = "100%"
        imgElement.src = link + "=w" + max_width
        var parent = document.getElementById("videos-container")
        parent.appendChild(imgElement);
    }
}

// Adds social links to the DOM from data.json
function addLinks(){
    var containerElement = document.getElementById("links-container")
    for (var i = 0; i < json_data["links"].length; i++){
        var aElement = document.createElement("a");
        aElement.setAttribute("href",json_data["links"][i]["link"])
        var divElement = document.createElement("div");
        divElement.classList.add("bold-title-sm");
        var iElement = document.createElement("i");
        iElement.classList.add("fa", json_data["links"][i]["logo"]);
        var textElement;
        if(i % 2 == 0) {
            aElement.classList.add("links-even")
            textElement = document.createTextNode(" " + json_data["links"][i]["text"]);
            divElement.appendChild(iElement);
            divElement.appendChild(textElement);
        }
        else{
            aElement.classList.add("links-odd")
            textElement = document.createTextNode(json_data["links"][i]["text"] + " ");
            divElement.appendChild(textElement);
            divElement.appendChild(iElement);
        }
        aElement.appendChild(divElement)
        containerElement.appendChild(aElement)
    }
    var monkey = document.createElement("img");
    monkey.src = "img/suprisemonkey.gif"
    monkey.id = "monkey"
    containerElement.appendChild(monkey)
}

// Adds about content to the DOM from data.json
function addAbout(){
    var max_width = 1000
    var desktop_max = Math.ceil(screen_width*.45*.35)
    if(desktop_max > max_width){
        max_width = desktop_max
    }
    var bandBioElement = document.getElementById("about-band-bio")
    var textElement = document.createTextNode(json_data["bandbio"]);
    bandBioElement.appendChild(textElement)
    var numBandMembers = json_data["bandmembers"].length
    var r = document.querySelector(':root');
    r.style.setProperty('--numBandMembers', numBandMembers);
    var containerElement = document.getElementById("about-container")
    for (var i = 0; i < json_data["bandmembers"].length; i++){
        var bandMemberText = document.createElement("div");
        var bandMemberName = document.createElement("div");
        bandMemberName.classList.add("bold-title-sm");
        var bandMemberNameText = document.createTextNode(json_data["bandmembers"][i]["name"]);
        bandMemberName.appendChild(bandMemberNameText);
        bandMemberText.appendChild(bandMemberName)
        var bandMemberBio = document.createElement("div");
        bandMemberBio.classList.add("general-text","band-member-bio");
        var bandMemberBioText = document.createTextNode(json_data["bandmembers"][i]["bio"]);
        bandMemberBio.appendChild(bandMemberBioText);
        bandMemberText.appendChild(bandMemberBio);
        var bandMemberImage = document.createElement("img");
        if(json_data["bandmembers"][i]["picture"] != "img/cat.jpg"){
            bandMemberImage.src = json_data["bandmembers"][i]["picture"] + "=w" + max_width
        }
        else{
            bandMemberImage.src = json_data["bandmembers"][i]["picture"]
            bandMemberImage.id ="cat"
            bandMemberImage.setAttribute("onmouseover","cat('in')")
            bandMemberImage.setAttribute("onmouseout","cat('out')")

        }
        if(i % 2 == 0) {
            bandMemberText.classList.add("about-band-member-text-even");
            bandMemberImage.classList.add("about-band-member-picture-even");
            containerElement.appendChild(bandMemberText);
            containerElement.appendChild(bandMemberImage);
        }
        else{
            bandMemberText.classList.add("about-band-member-text-odd");
            bandMemberImage.classList.add("about-band-member-picture-odd");
            containerElement.appendChild(bandMemberImage);
            containerElement.appendChild(bandMemberText);
        }
    }
}

// Adds spotify albums to the DOM
// Assumes link is in the one of the following formats:
// https://open.spotify.com/album/6sxHlOXFoxnTgJAQCl1EMO?si=wlUaZhq0Tjup7NnZXBugYw
// https://open.spotify.com/album/6sxHlOXFoxnTgJAQCl1EMO
function addSpotify(){
    var containerElement = document.getElementById("music-container")
    for (var i = 0; i < json_data["spotifyalbums"].length; i++){
        var url = json_data["spotifyalbums"][i]["link"].split("?")[0]
        var code = url.substring(url.length - 22);
        var albumTitle = document.createElement("div");
        albumTitle.classList.add("bold-title-sm");
        var albumTitleText = document.createTextNode(json_data["spotifyalbums"][i]["title"] + " (" + json_data["spotifyalbums"][i]["year"] + ")");
        albumTitle.appendChild(albumTitleText);
        containerElement.appendChild(albumTitle);
        var iframeElement = document.createElement("iframe");
        iframeElement.src = "https://open.spotify.com/embed/album/" + code
        iframeElement.style.width="100%"
        var numTracks = parseInt(json_data["spotifyalbums"][i]["tracks"])
        if(numTracks == 1){
            iframeElement.style.height=80
        }
        else{
            iframeElement.style.height=80+numTracks*31
        }
        iframeElement.setAttribute("frameBorder","0")
        iframeElement.setAttribute("allow","autoplay;clipboard-write;encrypted-media;fullscreen;picture-in-picture")
        iframeElement.setAttribute("allowfullscreen","")
        containerElement.appendChild(iframeElement);
    }
    var kid = document.createElement("img");
    kid.src = "img/kid.gif"
    kid.id = "kid"
    containerElement.appendChild(kid)
}

function cat(status){
    console.log(document.cookie)
    var cat = document.getElementById("cat")
    navigator.clipboard.writeText("Mr. Miercoles strikes again");
    if(status == "in" && document.cookie == "true"){
        document.cookie = "false"
        cat.src = "img/cat.gif"
        cat_audio.play();
    }
    if(status == "out"){
        cat.src = "img/cat.jpg"
        cat_audio.pause();
    }
}