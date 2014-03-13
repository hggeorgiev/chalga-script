//sound
var audio = document.getElementById("audio");

//scene resize
 window.onload = bgAnim;
 window.onload = setResetFlag;
  window.addEventListener("resize", setResetFlag);
var sceneLeft = document.getElementById("bg-left");
var sceneRight = document.getElementById("bg-right");
//game flow variables
var score = 0;
var field = document.getElementById("gameCanvas");
var playground = field.getContext("2d");
var playgroundWidth = field.scrollWidth;
var playgroundHeight = field.scrollHeight;
var menuEnd = document.getElementById("menuscreen-end");
var menuStart= document.getElementById("menuscreen-start");
var enemyYPositions = [];	
var enemyXPositions = [];
var avatarSpeed = 10;
var framerate;
var maxScore = 0;
var gameScore = document.getElementById("score");


//player avatar variables
var charX = 100;
var charY = 180;
var rowX = 0;
var rowY = 0;
var avatarX = 0;
var avatarY = (playgroundHeight - charY);
var direction;
var isMoving ;

//assets
var avatarImage;
var enemyImage;
// enemy variables
var rockX= 38;
var rockY= 51;
//game initialization
function gameSetup() {
	gameScore.style.display = "block";
	menuStart.style.display = "none";
	avatarImage = new Image();
	enemyImage = new Image();
	enemyImage.src = "img/rock.gif";
	avatarImage.src = "img/avatr.png";
	
	playground.drawImage(avatarImage, rowX, rowY, charX , charY, avatarX, avatarY, charX, charY);
	
	document.addEventListener("keydown", handleMovement);
	document.addEventListener("keyup" , handleStop);
	framerate = setInterval(handleTick, 25);
	requestAnimationFrame(handleTick);
	audio.play();
}
//movement controls
function handleMovement(event) {
	var keyPressed = String.fromCharCode(event.keyCode);
	if (keyPressed == "D")
	{
	direction = "right";
	isMoving = true;
	} else if (keyPressed == "A")
	{
	direction = "left";
	isMoving = true;
	}

}
function handleStop(event) {
	var keyPressed = String.fromCharCode(event.keyCode);
	if  (keyPressed == "A" ||  keyPressed == "D"){
		isMoving = false;
	}
}
//canvas update
function handleTick() {
	var currentEnemyNumber = 0;
	var numberOfEnemies = enemyXPositions.length;
	
	if (Math.random() < 1/17)
	{
	enemyYPositions.push(-35);
	enemyXPositions.push(Math.random()*(playgroundWidth - rockX));
    }
	
	
	
	
	while (currentEnemyNumber < numberOfEnemies) {
		enemyYPositions[currentEnemyNumber] +=12 ;
		
		currentEnemyNumber = currentEnemyNumber +=1 ;
	}

	field.width = 800;		
	
	if (isMoving) {
	
	 if(direction === "right") {
	 avatarX += avatarSpeed;
	 rowY =   0;
		
		if (avatarX >= (playgroundWidth - charX)) {
	    
		avatarX = (playgroundWidth - charX);
	      }
	 } 
	 if (direction === "left") {
	 avatarX -= avatarSpeed;
	 rowY = 185;
	 
	 
	 if (avatarX <= 0) {
	 
	 avatarX= 0;
	 }
	 }
	rowX += charX;
		
		if (rowX >= 1200) {
			rowX= 0;
	}
	
	
	
	}
    playground.drawImage(avatarImage, rowX, rowY, charX , charY, avatarX, avatarY, charX, charY)
	
	
	currentEnemyNumber = 0;
	while (currentEnemyNumber < numberOfEnemies) {
		playground.drawImage(enemyImage, enemyXPositions[currentEnemyNumber], enemyYPositions[currentEnemyNumber]);
		currentEnemyNumber += 1;
	
	}
	
	currentEnemyNumber = 0;
	while (currentEnemyNumber < numberOfEnemies) {
		 
		
		if ( ( (avatarX < enemyXPositions[currentEnemyNumber] && enemyXPositions[currentEnemyNumber] < avatarX + (charX - 15)) || (enemyXPositions[currentEnemyNumber] < avatarX && avatarX < enemyXPositions[currentEnemyNumber] + rockX) ) && ( (avatarY < enemyYPositions[currentEnemyNumber] && enemyYPositions[currentEnemyNumber] < avatarY + charY) || (enemyYPositions[currentEnemyNumber] < avatarY && avatarY < enemyYPositions[currentEnemyNumber] + rockY) ) ) {
			gameEnd();
		} else if(enemyYPositions[currentEnemyNumber] > playgroundHeight && enemyYPositions[currentEnemyNumber] <= playgroundHeight + 12) {
		 score++;
		gameScore.innerHTML = "Score: "+score+" pts"; //score increment
		 }
		currentEnemyNumber += 1;
	}


    		
}

//game looping
function gameEnd() {

 clearInterval(framerate);
 audio.pause();
 audio.currentTime = 0;
 menuEnd.style.display = "block";
 document.getElementById("scrbrd").innerHTML = "Your score is:" + score + "pts" ;
  
  if (score > maxScore) {
  maxScore = score;
  }

  document.getElementById("scrbrdmax").innerHTML = "Your best score is:" + maxScore + "pts" ;
}



function loopGame() {
 
 
enemyYPositions = [];	
enemyXPositions = [];
charX = 100;
charY = 180;
rowX = 0;
rowY = 0;
 avatarX = 0;
 avatarY = (playgroundHeight - charY);
direction;
 isMoving ;


 isMoving ;
 score = 0;

menuEnd.style.display = "none";
 gameSetup();


}

//background 
function setResetFlag() {
var winHeight = window.innerHeight;
var winWidth = window.innerWidth;
var incrementor = (winWidth - playgroundWidth)/2;
sceneLeft.style.width = (incrementor - 2) + "px";
sceneRight.style.width = (incrementor - 2) + "px";

if (winHeight < 620) {

document.getElementById("clouds").style.height = 220 + "px" ;
} else {
document.getElementById("clouds").style.height = 320 + "px" ;
}

}






function bgAnim() {
   if (backgroundState == 1) {
   sceneRight.src = "img/bckgrndright2.png";
   sceneLeft.src = "img/bckgrndpng.png" ;
   backgroundState = 2;
     } else if (backgroundState ==2) {
   sceneLeft.src = "img/bckgrndpng2.png" ;
   sceneRight.src = "img/bckgrndright.png";
   backgroundState = 1;
     }
   }

var interval = setInterval(bgAnim, 1000);
var backgroundState = 1;


