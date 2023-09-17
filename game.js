var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var buttonColors = ["red", "blue" , "green" , "yellow"];
var highestScore = 0;

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

         if (gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
            nextSequence();
            }, 1000);
    }
    } else {
        var wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();
        startOver();
        $("body").addClass("game-over");
        setTimeout( function(){
            $("body").removeClass("game-over"); 
        }, 200);
        $("h1").text("Game Over! Your score was Level " + level);
        if (level > highestScore){
            highestScore = level;
            $("h2").text("Your highest is Level " + highestScore);
        };
    }
};
function startOver(){
    started = false;
    
    gamePattern = [];
}

function nextSequence (){
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+ level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
    
    };

    $(".btn").on("click", function(event){
        if (started == true){
        var userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
        };
    });

    function playSound(name){
        var audio = new Audio("./sounds/"+ name+".mp3");
        audio.play();
    };

    function animatePress(currentColor){
        $("#"+currentColor).addClass("pressed");
        setTimeout(() => {
            $("#"+currentColor).removeClass("pressed");
          }, 100);
          
    }
    $("body").keypress(function(){
        if (started == false){
            level = 0;
            $("h1").text("Level "+ level);
            started = true;
            nextSequence();  
        }
    })

