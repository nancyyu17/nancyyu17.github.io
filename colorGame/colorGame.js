var numSqures = 6;
var colors = [];
var pickedColor ;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();

function init(){
	//mode buttons event Listener
	setupModeButtons();
	//squares  
	setupSquares();
	reset();	
}


function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected")
			modeButtons[1].classList.remove("selected")
			this.classList.add("selected");
			if(this.textContent === "EASY"){
				numSqures = 3;
			}else{
				numSqures = 6;
			}
			reset();
		});
	}
}


function setupSquares(){
	for (var i = 0; i < squares.length; i++) {
		//add initial colors to squares
		squares[i].style.backgroundColor = colors[i];

		//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor
			//compare with picked Color
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play Again";
			}else{
				//clicked color fades out
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}	
}


function reset(){
	//generate all new color
	colors = generateRandomColors(numSqures);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match the new pickedColor
	colorDisplay.textContent = pickedColor;
	//change colors of squres
	for(var i = 0; i < squares.length; i++){
		if (colors[i]) {//if there is a color, we assign that to squares
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}else{
			squares[i].style.display = "none";
		}

	}
	//change h1 background color back to black
	h1.style.backgroundColor = "steelblue";
	//change text to new colors in case of clicking button when winning
	resetButton.textContent = "NEW COLORS";
	//change message display
	messageDisplay.textContent = "";	
}



resetButton.addEventListener("click", function(){
	reset();
});



function changeColors(color){
	//loop through all squares
	for(var i = 0; i < squares.length; i++){
		//change each color to match given color
		squares[i].style.backgroundColor = color;		
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);// pick a random number based on length of colors
	return colors[random];
}

function generateRandomColors(num){
	//make an array
	var arr = []
	//add num random colors to arr
	for(var i = 0; i < num; i++){
		//get random color and push into arr
		arr.push(randomColor());
	}
	//return that array
	return arr
}

function randomColor(){
	//pick a "red" from 0 to 255
	var red = Math.floor(Math.random() * 256);
	//green from 0 to 255
	var green = Math.floor(Math.random() * 256);
	//also for blue
	var blue = Math.floor(Math.random() * 256);

	return"rgb(" + red + ", " + green + ", " + blue + ")";
}