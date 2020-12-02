let colorMap = ["green", "red", "yellow", "blue"]
let gameStarted = false

let userClickedPattern = []
let randomPattern = []

let level = 0

$(document).keypress(function() {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true
  }
});


$(".btn").on("click", buttonClick);


function nextSequence() {
  level++;
  userClickedPattern = []
  $("#level-title").text("Level " + level);

  let randomColor = getRandomColor();
  randomPattern.push(randomColor);

  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
  animate("#" + randomColor, "pressed", 50)
}


function buttonClick(event) {
  pressButton($(this).attr("id"))
}


function pressButton(color) {
  userClickedPattern.push(color)
  console.log(userClickedPattern)

  playSound(color);
  animate("#" + color, "pressed", 100);
  checkAnswer(userClickedPattern.length - 1);
}


function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === randomPattern[currentLevel]) {
    if (userClickedPattern.length === randomPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("incorrect button pressed")
    $("#level-title").text("Game Over, Press Any Key To Restart")
    playSound("wrong");
    animate("body", "game-over", 200)

    startOver();
  }
}


function animate(element, classToAdd, timer) {
  $(element).addClass(classToAdd)
  setTimeout(function() {
    $(element).removeClass(classToAdd)
  }, timer)
}


function getRandomColor() {
  return colorMap[Math.floor((Math.random() * 4))];
}


function playSound(color) {
  new Audio("sounds/" + color + ".mp3").play();
}


function startOver() {
  level = 0;
  randomPattern = [];
  gameStarted = false;
}
