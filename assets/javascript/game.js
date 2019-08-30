//VARIABLES
var words = ["piano", "drums", "guitar", "maracas", "triangle", "trombone", "violin"]

//Empty variables to store values later
var randomWord = "";
var lettersOfWord = []
var blanks = 0;
var blanksAndCorrect = [];
var wrongGuess = [];

//Counter Variables
var wins = 0;
var losses = 0;
var guessesRemaining = 12;



// ALL FUNCTIONS
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


//__________________________________________________________
//GAME START FUNCTION
//__________________________________________________________
function Game() {
    //computer generates random word from words array
    randomWord = words[Math.floor(Math.random() * words.length)];

    // split the individual word into separate arrays, and store in new array 
    lettersOfWord = randomWord.split("");

    //store length of word in blanks, for later use
    blanks = lettersOfWord.length;

    //creating a loop to generate "_" for each letter in array stored in blanks
    for (var i = 0; i < blanks; i++) {
        blanksAndCorrect.push("_");
    }

    //showing the "_" within HTML
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join("  ");

    //console logging 
    console.log(randomWord);
    console.log(lettersOfWord)
    console.log(blanks)
    console.log(blanksAndCorrect)
}


//__________________________________________________________
//AUDIO FUNCTION
//__________________________________________________________

//variables for audio function
var piano = document.getElementById("piano");
var drums = document.getElementById("drums");
var guitar = document.getElementById("guitar");
var maracas = document.getElementById("maracas");
var triangle = document.getElementById("triangle");
var trombone = document.getElementById("trombone");
var violin = document.getElementById("violin");


function aud() {
    //Piano Audio & Image
    //---------------------------
    if (randomWord === words[0]) {
        drums.pause();
        guitar.pause();
        maracas.pause();
        triangle.pause();
        trombone.pause();
        violin.pause();
        piano.play();
        document.getElementById("image").src = "./assets/images/paino.gif";
    }
    //Drums Audio & Image
    //---------------------------
    else if (randomWord === words[1]) {
        guitar.pause();
        maracas.pause();
        triangle.pause();
        trombone.pause();
        violin.pause();
        piano.pause();
        drums.play();
        document.getElementById("image").src = "./assets/images/drums.gif";
    }
    //Guitar Audio & Image
    //---------------------------
    else if (randomWord === words[2]) {
        maracas.pause();
        triangle.pause();
        trombone.pause();
        violin.pause();
        piano.pause();
        drums.pause();
        guitar.play();
        document.getElementById("image").src = "./assets/images/guitar2.gif";
    }
    //Maracas Audio & Image
    //---------------------------
    else if (randomWord === words[3]) {
        triangle.pause();
        trombone.pause();
        violin.pause();
        piano.pause();
        drums.pause();
        guitar.pause();
        maracas.play();
        document.getElementById("image").src = "./assets/images/maracas.gif";
    }
    //Triangle Audio & Image
    //---------------------------
    else if (randomWord === words[4]) {
        trombone.pause();
        violin.pause();
        paino.pause();
        drums.pause();
        guitar.pause();
        maracas.pause();
        triangle.play();
        document.getElementById("image").src = "./assets/images/triangle.gif";
    }
    //Trombone Audio & Image
    //---------------------------
    else if (randomWord === words[5]) {
        violin.pause();
        piano.pause();
        drums.pause();
        guitar.pause();
        maracas.pause();
        triangle.pause();
        trombone.play();
        document.getElementById("image").src = "./assets/images/trombone.gif";
    }
    //Violin Audio & Image
    //---------------------------
    else if (randomWord === words[6]) {
        piano.pause();
        drums.pause();
        guitar.pause();
        maracas.pause();
        triangle.pause();
        trombone.pause();
        violin.play();
        document.getElementById("image").src = "./assets/images/violin2.gif";
    }
};

//__________________________________________________________
//RESET FUNCTION
//__________________________________________________________
function reset() {
    guessesRemaining = 12;
    wrongGuess = [];
    blanksAndCorrect = [];
    Game()
}

//__________________________________________________________
//CHECK LETTERS/COMPARE FUNCTION
//__________________________________________________________

//If/Else, to see if letter selected matches random word
function checkLetters(letter) {
    var letterInWord = false;
    //if the generated randomword is equal to the letter entered... then variable is true
    for (var i = 0; i < blanks; i++) {
        if (randomWord[i] == letter) {
            letterInWord = true;
        }
    }
    //if letterInWord (false)
    if (letterInWord) {
        //check each letter to see if it matches word
        for (var i = 0; i < blanks; i++) {
            if (randomWord[i] == letter) {
                blanksAndCorrect[i] = letter;
            }
        }
    }
    //otherwise, push the incorrect guess in the wrong guesses section, and reduce remaining guesses
    else {
        wrongGuess.push(letter);
        guessesRemaining--;
    }
    console.log(blanksAndCorrect);
}

//__________________________________________________________
//FINAL COMPLETE FUNCTION
//__________________________________________________________

//check to see if player won...
function complete() {
    console.log("wins:" + wins + "| losses:" + losses + "| guesses left:" + guessesRemaining)

    //if WON...then alert, play audio, display image and reset new round
    if (lettersOfWord.toString() == blanksAndCorrect.toString()) {
        wins++;
        aud()
        reset()
        //display wins on screen
        document.getElementById("winstracker").innerHTML = " " + wins;

        //if LOST...then alert and reset new round
    } else if (guessesRemaining === 0) {
        losses++;
        reset()
        document.getElementById("image").src = "./assets/images/tryagain-red.gif"
        document.getElementById("losstracker").innerHTML = " " + losses;
    }
    //display losses on screen && guesses remaining countdown
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join(" ");
    document.getElementById("guessesremaining").innerHTML = " " + guessesRemaining;
}


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//_____________________________________________________
// EXECUTE CODE 
//_____________________________________________________

//call start game function
Game()

//check for keyup, and convert to lowercase then store in guesses
document.onkeyup = function (event) {
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    //check to see if guess entered matches value of random word
    checkLetters(guesses);
    //process wins/loss 
    complete();
    //store player guess in console for reference 
    console.log(guesses);

    //display/store incorrect letters on screen
    document.getElementById("playerguesses").innerHTML = "  " + wrongGuess.join(" ");
}
