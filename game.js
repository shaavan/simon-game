var buttonColors = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;
var gamePattern = [];
var userClickedPattern = [];


// Start Game
$("#level-title").click(function () {
    
    if (!gameStarted) {
        start();
    }
});


function start() {

    //reset all variables.
    gameStarted = true;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];

    nextSequence();


    // Event Listener for button clicks. Add it only once the game starts.

    $(".btn").on("click", function () {

        var userChosenColor = $(this).attr('id');

        animatePress(userChosenColor);
        playSound(userChosenColor);

        userClickedPattern.push(userChosenColor);

        clickCheck(userClickedPattern.length);
    });
}


function gameOver() {

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    gameStarted = false;

    // Remove button binding once game over to prevent unnecessary clicking.
    $(".btn").unbind();
    
    $("#level-title").text("Game Over, click here to Restart");
}


function nextSequence() {

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    // Use jquery to select the right button.
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    // Push the randomChosenColor into the sequence
    gamePattern.push(randomChosenColor);
}


function clickCheck(timesButtonPushed) {
    // This algorithm checks the color value corresponding to current click


    // If the nth userClick color matches the nth game pattern color then we are on the right track.
    // If it doesn't there is an error.
    if (userClickedPattern[timesButtonPushed - 1] !== gamePattern[timesButtonPushed - 1]) {
        console.log("error");
        gameOver();
    }

    // If the button has been clicked enough times to match the currenLevel's number without encountering error,
    // that means the user has successfully replicated the pattern.
    else if (timesButtonPushed === level) {
        console.log("Level: " + level + " Success");

        // After each level the user clicked pattern is cleared.
        userClickedPattern = [];

        // After a delay of one second the nextSequence() is called, which also updates the level value.
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }  
}



// Helper Function

function playSound(name) {
    // Use Javascript to play sound
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

