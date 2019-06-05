window.onload = function(){
  toggledbutton = document.getElementsByClassName("btn")[0];
  toggledcontent = document.getElementsByClassName("content")[0];
}

var toggledbtn;
var content_dict = {
  About: "Nessie the Great is a band from San Jose, California. They play that\
          sweet reggae rock music you've heard so much about. Established\
          in 2016.",
  Shows: "S",
  Music: "M",
  Media: "Med",
  Contact: "C",
  Shop: "S"
};

function myFunction() {
  document.getElementById("nessie").innerHTML = "Hello World";
}

function Toggle(el) {
  // Changing content
  toggledcontent.style.display = "none"
  toggledcontent = document.getElementById(el.value + "-content");
  toggledcontent.style.display = "block"

  // Changing button color
  toggledbutton.style.backgroundColor = "white";
  toggledbutton = el;
  toggledbutton.style.backgroundColor = "#FDBA21";
}
