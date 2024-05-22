for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
  document
    .querySelectorAll(".set .drum")
    [i].addEventListener("mousedown", function () {
      this.style.color = "white";
      keyPressed(this.className.slice(0, 1));
    });
}

for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
  document
    .querySelectorAll(".set .drum")
    [i].addEventListener("mouseup", function () {
      this.style.color = "#da0463";
      keyReleased(this.className.slice(0, 1));
    });
}

document.addEventListener("keydown", function (event) {
  keyPressed(event.key);
});

document.addEventListener("keyup", function (event) {
  keyReleased(event.key);
});

function keyPressed(key) {
  var audio = new Audio("sounds/crash.mp3");
  switch (key) {
    case "w":
      document.querySelector(".w").style.color = "white";
      audio = new Audio("sounds/tom-1.mp3");
      break;
    case "a":
      document.querySelector(".a").style.color = "white";
      audio = new Audio("sounds/tom-2.mp3");
      break;
    case "s":
      document.querySelector(".s").style.color = "white";
      audio = new Audio("sounds/tom-3.mp3");
      break;
    case "d":
      document.querySelector(".d").style.color = "white";
      audio = new Audio("sounds/tom-4.mp3");
      break;
    case "j":
      document.querySelector(".j").style.color = "white";
      audio = new Audio("sounds/crash.mp3");
      break;
    case "k":
      document.querySelector(".k").style.color = "white";
      audio = new Audio("sounds/kick-bass.mp3");
      break;
    case "l":
      document.querySelector(".l").style.color = "white";
      audio = new Audio("sounds/snare.mp3");
      break;
    default:
      audio = null;
      break;
  }
  audio.play();
}
function keyReleased(key) {
  switch (key) {
    case "w":
      document.querySelector(".w").style.color = "#da0463";
      break;
    case "a":
      document.querySelector(".a").style.color = "#da0463";
      break;
    case "s":
      document.querySelector(".s").style.color = "#da0463";
      break;
    case "d":
      document.querySelector(".d").style.color = "#da0463";
      break;
    case "j":
      document.querySelector(".j").style.color = "#da0463";
      break;
    case "k":
      document.querySelector(".k").style.color = "#da0463";
      break;
    case "l":
      document.querySelector(".l").style.color = "#da0463";
      break;
  }
  audio.play();
}
