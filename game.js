
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level = 0;

$(document).keypress(function(){
    $("h1").html("Level " + level);
    nextSequence();
    // started = true;
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").html("level " + level);
  var randomNumber = Math.floor((Math.random()*4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  randomButtonid = "div."  + randomChosenColour;

  $(randomButtonid).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(key){
        var audio = new Audio("sounds/" + key + ".mp3");
        audio.play();
}


currLevel = 0;
$("div.btn").click(function(){
  currLevel += 1;
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  $("div." + userChosenColor).addClass("pressed");
  setTimeout(function(){
    $("div." + userChosenColor).removeClass("pressed");
  },100);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(l){
    if (gamePattern[l]===userClickedPattern[l]){
      if (JSON.stringify(gamePattern)===JSON.stringify(userClickedPattern)) {
          setTimeout(function () {
            nextSequence();
          }, 1000);
      }
    }else {
        playSound("wrong");
        $("h1").html("Game Over! Reload to start again");
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over");
        },400);
    }
}
