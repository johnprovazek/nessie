window.addEventListener('load', function(event) {
    console.log('page is fully loaded');
});

window.addEventListener('resize', function(event) {
    resizeYoutube()

});

function toggle(el) {
    // Killing Spotify if necessary
    if(document.getElementById("music-content").style.display == "block" && el.value != "music"){
        spotifyKill()
    }

    // Changing content
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

function resizeYoutube() {
    // var items = document.getElementsByClassName("youtube");
    // for (var i = 0; i < items.length; i++) {
    //     // console.log(items[i].clientWidth)
    //     var resize = (items[i].getAttribute("data-aspect-height")/items[i].getAttribute("data-aspect-width")) * items[i].clientWidth
    //     items[i].style.height = resize
    // }
}

function spotifyKill(){
    var container = document.getElementById("test");
    console.log(container.children.length)
    for (var i = 0; i < container.children.length; i++) {
        container.removeChild(container.children[i]);
    }
}