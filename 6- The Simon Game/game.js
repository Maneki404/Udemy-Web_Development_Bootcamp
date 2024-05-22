var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var randomNumber;
var randomChosenColor;

var level = 0;

function nextSequence() {
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  flash(randomChosenColor);
  playSound(randomChosenColor);
  $("h1").text("Level " + level);
  level++;
}

$(".btn").on("click", function (event) {
  var targetId = event.target.id;
  var userChosenColor = targetId;
  userClickedPattern.push(userChosenColor);
  flash(targetId);
  playSound(targetId);
  if (userClickedPattern.toString() == gamePattern.toString()) {
    setTimeout(nextSequence, 1000);
    userClickedPattern = [];
  } else if (
    userClickedPattern[userClickedPattern.length - 1] !=
    gamePattern[userClickedPattern.length - 1]
  ) {
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    start();
  }
});

//& START
function start() {
  $(document).on("keydown", function () {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    nextSequence();
    $(document).unbind();
  });
}
start();

function flash(id) {
  $("#" + id)
    .fadeOut(100)
    .fadeIn(100);
}

function playSound(target) {
  switch (target) {
    case "green":
      var sound = new Audio("sounds/green.mp3");
      sound.play();
      break;
    case "red":
      var sound = new Audio("sounds/red.mp3");
      sound.play();
      break;
    case "yellow":
      var sound = new Audio("sounds/yellow.mp3");
      sound.play();
      break;
    case "blue":
      var sound = new Audio("sounds/blue.mp3");
      sound.play();
      break;
    default:
      var sound = null;
  }
}
