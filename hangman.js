var inquirer = require("inquirer");
// playGame()
// function playGame() {
	function Word(word) {
		this.wordList = ["bedrock", "biome", "block", "cobblestone", "crafting", "crafting table", "creeper", "diamond", "dungeon", "emerald", "the end", "ender dragon", "enderman", "farming", "furnace", "inventory", "lapis lazuli", "mining", "mobs", "mojang", "nether", "obsidian", "overworld", "pickaxe", "portal", "redstone", "skeleton", "smelting", "spawn point", "spider", "spider jockey", "stronghold", "temple", "tools", "witch", "wither", "zombie", "zombie pigmen"];
		this.word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
	}

	var testWord = new Word();
	var userGuess;
	var wrongGuessNum = -1;
	var guesses = [];
	var blankWord= [];
	var remainingGuesses = 9;
	var gameOver = false;
	//var testWord = wordList[Math.floor(Math.random() * wordList.length)];
	var blankWordFill = "";
	var alreadyGuessed;

	// Converts the word to blank spaces so the player has to guess
	for (var i = 0; i < testWord.word.length; i++) {
			if (testWord.word[i] === " ") {
				//console.log("D");
				blankWord.push(" ");
				blankWordFill += " " + blankWord[i] + " ";
			} else {
				//console.log("E");
				blankWord.push("_");
				blankWordFill += " " + blankWord[i] + " ";
			}
		}
	guessAgain();
	function guessAgain() {
		// var wordList = ["bedrock", "biome", "block", "cobblestone", "crafting", "crafting table", "creeper", "diamond", "dungeon", "emerald", "the end", "ender dragon", "enderman", "farming", "furnace", "inventory", "lapis lazuli", "mining", "mobs", "mojang", "nether", "obsidian", "overworld", "pickaxe", "portal", "redstone", "skeleton", "smelting", "spawn point", "spider", "spider jockey", "stronghold", "temple", "tools", "witch", "wither", "zombie", "zombie pigmen"];
		// var wrongGuessImgs = ["assets/images/half-creeper.png", "assets/images/full-creeper.png", "assets/images/full-creeper-flash.png", "assets/images/full-creeper-flash.png", "assets/images/full-creeper-flash.png", "assets/images/full-creeper-flash.png"]
		
		//var instruction = document.getElementById("message");

		//instruction.innerHTML = ("");

		//blankWordFill = "";
		// $("#letters-guessed").text("");
		// $("#creeper").attr("src", "");

		
		
		console.log("Remaining number of guesses: "+remainingGuesses);
		console.log(blankWordFill+"\n");

		// Checks and tracks which letters have been guessed
		function previousGuesses() {
			if (guesses.indexOf(userGuess) < 0) {
				guesses.push(userGuess);
				//$("#letters-guessed").append(" " + userGuess.toUpperCase() + " ");
				alreadyGuessed = guesses[0].toUpperCase();
				for (var i = 1; i < guesses.length; i++) {
					alreadyGuessed += ", " + guesses[i].toUpperCase();
				}
			}
			console.log("Previously guessed: "+alreadyGuessed);
		};

		function userTakesAGuess() {
			// Checks if the guessed letter is in the word.
			if (testWord.word.indexOf(userGuess) < 0) { // Letter is not in the word(s)
				if (guesses.indexOf(userGuess) < 0) { // If letter already guessed, skip this(do nothing)
					wrongGuessNum += 1;
					// $("#creeper").attr("src", wrongGuessImgs[wrongGuessNum]);
					// if (wrongGuessNum >= 1 && wrongGuessNum < (wrongGuessImgs.length-1)) {
					//   setTimeout(function() {
					//     $("#creeper").attr("src", "assets/images/full-creeper.png");
					//   }, 1000);
					// }
					remainingGuesses -= 1;
					if (remainingGuesses === 0) {
						gameover = true;
					}
				}
				previousGuesses();
				guessAgain();
				//$("#numGuessRemain").text(remainingGuesses);
			} else {
				for (var l = 0; l<testWord.word.length; l++) {
					if (testWord.word[l] === userGuess) {
						blankWord[l] = testWord.word[l];
						var blankLetterFill = "";
						for (var j=0; j<blankWord.length; j++){
							if (blankWord[j] === " ") {
								//console.log("G")
								blankLetterFill += " " + blankWord[j] + " ";
							} else {
								blankLetterFill += " " + blankWord[j].toUpperCase() + " ";
							}
						}
						blankWordFill = blankLetterFill;
					}
				}
				if (blankWord.indexOf("_") < 0) {
					gameover = true;
				}
				previousGuesses();
				guessAgain();
				// if (wrongGuessNum >= 1) {
				//   $("#creeper").attr("src", "assets/images/hurt-creeper.png");
				//   if (!(blankWord.indexOf("_") < 0)) {
				//     setTimeout(function() {
				//       $("#creeper").attr("src", "assets/images/full-creeper.png");
				//     }, 500);
				//   }
				// }
			}
	      
	    };

	    // function gameOver() {
	    // 	if (blankWord.indexOf("_") < 0) {

	    // 	}
	    // };

		if (!gameOver) {
			inquirer.prompt([
				{
					name: "letter",
					message: "Take a Guess!"
				}
			]).then(function(guess) {
				userGuess = guess.letter;

				//console.log(userGuess.keyCode);
				// Need another If for the game over
				// Checks that the keypress is an alpha
				// if ((userGuess.keyCode > 64 && userGuess.keyCode < 91) || // upper alpha (A-Z)
				//   (userGuess.keyCode > 96 && userGuess.keyCode < 123)) { // lower alpha (a-z))
				userTakesAGuess();
			});
	    }
	        //}
	      
	      // if (blankWord.indexOf("_") < 0) {
	      //   console.log("YOU WIN!!");
	      //   // if (!gameOver && wrongGuessNum >= 1) {
	      //   //   $("#creeper").attr("src", "assets/images/dead-creeper.png");
	      //   //   setTimeout(function() {
	      //   //     $("#creeper").attr("src", "assets/images/gunpowder.png");
	      //   //   }, 1000);
	      //   // }
	      //   gameOver = true;
	      //   return;
	      //   // if (userGuess === " ") {
	      //   //   playGame();
	      //   // }
	      // } else if (remainingGuesses === 0) {
	      //   blankWordFill = "";
	      //   for (var i = 0; i < testWord.word.length; i++) {
	      //     if (testWord.word[i] === " ") {
	      //       blankWordFill += "   ";
	      //     } else {
	      //       blankWordFill += " " + testWord.word[i].toUpperCase() + " ";
	      //     }
	      //   }
	      //   console.log("You lose. :(");
	      //   // if (!gameOver) {
	      //   //   var audioElement = document.createElement("audio");
	      //   //   audioElement.setAttribute("src", "assets/sounds/creeper-sound.mp3");
	      //   //   audioElement.play();
	      //   //   setTimeout(function() {
	      //   //     $("#creeper").attr("src", "assets/images/full-creeper.png");
	      //   //     setTimeout(function() {
	      //   //       $("#creeper").attr("src", "assets/images/full-creeper-flash.png");
	      //   //       setTimeout(function() {
	      //   //         $("#creeper").attr("src", "assets/images/full-creeper.png");
	      //   //         setTimeout(function() {
	      //   //           $("#creeper").attr("src", "assets/images/creeper-explode.png");
	      //   //         }, 900);
	      //   //       }, 900);
	      //   //     }, 900);
	      //   //   }, 900);
	      //   // }
	      //   gameOver = true;
	      //   return;
	      //   // if (userGuess === " ") {
	      //   //   playGame();
	      //   // }
	      // }

		if (gameover && blankWord.indexOf("_") < 0) {
			console.log("YOU WIN!!");
		} else if (gameover && remainingGuesses === 0) {
			blankWordFill = "";
			for (var i = 0; i < testWord.word.length; i++) {
				if (testWord.word[i] === " ") {
					blankWordFill += "   ";
				} else {
					blankWordFill += " " + testWord.word[i].toUpperCase() + " ";
				}
			}
			console.log("You lose. :(");
		}
	};
//};
