var canvas = document.querySelector("canvas");
canvas.width = 1280;
canvas.height = 640;
var surface = canvas.getContext("2d");
var player = {x:120, y:128, xhit:3, ylighthit:1, yheavyhit:2, speed:4};
var player2 = {x:1160-64, y:640-128-64, xhit:3, ylighthit:1, yheavyhit:2, speed:4};
var ball = {x: 630, y:310, xspeed:-3, yspeed:-1, speed:2};
var playerSprite = new Image();
playerSprite.src = "tennimalscharplaceholder.png";
var player2Sprite = new Image();
player2Sprite.src = "tennimalscharplaceholder.png";

var ballSprite = new Image();
ballSprite.src = "ballplaceholder.png";

var interval;
var collInt1;
var collInt2;

var p1nocontact = false;
var p2nocontact = false;

var lastHit = 2; //1: ball last touched by player 1, 2: by player 2
var spawnDirection = 1; //1: ball spawns towards player 1, 2: towards player2

var p1Score = 0;
var p2Score = 0;

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

var p2UpPressed = false;
var p2DownPressed = false;
var p2LeftPressed = false;
var p2RightPressed = false;

var textOutput = document.getElementById("displayText");
var textInterval;

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
window.addEventListener("keydown", p2KeyDown);
window.addEventListener("keyup", p2KeyUp);

window.addEventListener("keydown", debugReset); //delete this from final version

startGame();

function startGame()
{
	interval = setInterval(update, 33.34);
}

function update()
{
	movePlayer();
	movePlayer2();
	checkCollision();
	moveBall();
	render();
	//console.log(player.x);
	//console.log(player.y);
	//console.log(player2.x);
	//console.log(player2.y);
}

function movePlayer()
{
	if (upPressed == true && player.y > 0)
		player.y -= player.speed;
	if (downPressed == true && player.y < 640-64)
		player.y += player.speed;
	if (leftPressed == true && player.x > 0)
		player.x -= player.speed;
	if (rightPressed == true && player.x < 640-64-17)
		player.x += player.speed;
}

function movePlayer2()
{
	if (p2UpPressed == true && player2.y > 0)
		player2.y -= player2.speed;
	if (p2DownPressed == true && player2.y < 640-64)
		player2.y += player2.speed;
	if (p2LeftPressed == true && player2.x > 640+18)
		player2.x -= player2.speed;
	if (p2RightPressed == true && player2.x < 1280-64)
		player2.x += player2.speed;
}

function moveBall()
{
	ball.x += ball.xspeed * ball.speed;
	ball.y += ball.yspeed * ball.speed;
}

function render()
{
	surface.clearRect(0,0,1280,640)
	surface.drawImage(playerSprite, player.x, player.y);
	surface.drawImage(player2Sprite, player2.x, player2.y);
	surface.drawImage(ballSprite, ball.x, ball.y);
}

function checkCollision() //we can maybe add an if statement to make it only check one player's collision at a time if necessary
{
	checkP1Collision();
	checkP2Collision();
	checkBounds();
}

function checkP1Collision()
{
	if(ball.x < player.x + 64 && ball.x > player.x + 32 && ball.y < player.y + 64 && ball.y + 20 > player.y && p1nocontact == false)
	{
		if (rightPressed == true && upPressed == false && downPressed == false)
		{
			ball.xspeed = player.xhit;
			ball.yspeed = 0;
		}
		else if (rightPressed == true && upPressed == true && downPressed == true)
		{
			ball.xspeed = player.xhit;
			ball.yspeed = 0;
		}
		else if (rightPressed == true && upPressed == true && downPressed == false)
		{
			ball.xspeed = player.xhit;
			ball.yspeed = -player.ylighthit;
		}
		else if (rightPressed == true && upPressed == false && downPressed == true)
		{
			ball.xspeed = player.xhit;
			ball.yspeed = player.ylighthit;
		}
		else if (rightPressed == false && upPressed == true && downPressed == false)
		{
			ball.xspeed = player.xhit;
			ball.yspeed = -player.yheavyhit;
		}
		else if (rightPressed == false && upPressed == false && downPressed == true)
		{
			ball.xspeed = player.xhit;
			ball.yspeed = player.yheavyhit;
		}
		else
		{
		ball.xspeed *= -1;
		ball.yspeed *= 1; //maybe change this to -1?
		}
		lastHit = 1;
		p1nocontact = true;
		collInt1 = setInterval(p1flash, 200);
	}
}

function checkP2Collision()
{
	if(ball.x + 20 > player2.x && ball.x + 20 < player2.x + 32 && ball.y < player2.y + 64 && ball.y + 20 > player2.y && p2nocontact == false)
	{
		if (p2LeftPressed == true && p2UpPressed == false && p2DownPressed == false)
		{
			ball.xspeed = -player2.xhit;
			ball.yspeed = 0;
		}
		else if (p2LeftPressed == true && p2UpPressed == true && p2DownPressed == true)
		{
			ball.xspeed = -player2.xhit;
			ball.yspeed = 0;
		}
		else if (p2LeftPressed == true && p2UpPressed == true && p2DownPressed == false)
		{
			ball.xspeed = -player2.xhit;
			ball.yspeed = -player2.ylighthit;
		}
		else if (p2LeftPressed == true && p2UpPressed == false && p2DownPressed == true)
		{
			ball.xspeed = -player2.xhit;
			ball.yspeed = player2.ylighthit;
		}
		else if (p2LeftPressed == false && p2UpPressed == true && p2DownPressed == false)
		{
			ball.xspeed = -player2.xhit;
			ball.yspeed = -player2.yheavyhit;
		}
		else if (p2LeftPressed == false && p2UpPressed == false && p2DownPressed == true)
		{
			ball.xspeed = -player2.xhit;
			ball.yspeed = player2.yheavyhit;
		}
		else
		{
			ball.xspeed *= -1;
			ball.yspeed *= 1; //maybe change this to -1?
		}
		lastHit = 2;
		p2nocontact = true;
		collInt2 = setInterval(p2flash, 200);
	}
}

function checkBounds()
{
	if (ball.x <= -20 || ball.x >= 1280 || ball.y <= -20 || ball.y >= 640)
	{
		if (ball.x <= 320)
			scoreP2();
		else if (ball.x >= 860)
			scoreP1();
		else
			outOfBounds();
		resetPositions();
	}
}

function p1flash()
{
	p1nocontact = false;
	clearInterval(collInt1);
}

function p2flash()
{
	p2nocontact = false;
	clearInterval(collInt2);
}

function scoreP1()
{
	p1Score += 1;
	spawnDirection = 2;
	textOutput.innerHTML = "Player 1 Scored!";
	
	textInterval = setInterval(clearText, 2000);
	//textOutput.innerHTML = "Player 1 Serve!";
	//textInterval = setInterval(clearText, 2000);
	console.log("Player 1 scores");
	resetPositions();
}

function scoreP2()
{
	p2Score += 1;
	spawnDirection = 1;
	textOutput.innerHTML = "Player 2 Scored!";
	textInterval = setInterval(clearText, 2000);
	//textOutput.innerHTML = "Player 2 Serve!";
	//textInterval = setInterval(clearText, 2000);
	console.log("Player 2 scores");
	resetPositions();
}

function outOfBounds()
{
	if (lastHit == 1)
		spawnDirection = 2;
	else if (lastHit == 2)
		spawnDirection = 1;
	textOutput.innerHTML = "Out of Bounds!";
	textInterval = setInterval(clearText, 2000);
	console.log("Out of bounds");
	resetPositions();
}

function clearText()
{
	textOutput.innerHTML = " ";
	clearInterval(textInterval);
}

function keyDown(event)
{
	switch (event.keyCode)
	{

		case 87:
			upPressed = true;
			break;
		case 83:
			downPressed = true;
			break;
		case 65:
			leftPressed = true;
			break;
		case 68:
			rightPressed = true;
			break;
	} 
}

function p2KeyDown(event)
{
	switch (event.keyCode)
	{

		case 38:
			p2UpPressed = true;
			break;
		case 40:
			p2DownPressed = true;
			break;
		case 37:
			p2LeftPressed = true;
			break;
		case 39:
			p2RightPressed = true;
			break;
	} 
}

function keyUp(event)
{
	switch (event.keyCode)
	{
		case 87:
			upPressed = false;
			break;
		case 83:
			downPressed = false;
			break;
		case 65:
			leftPressed = false;
			break;
		case 68:
			rightPressed = false;
			break;
	}
}

function p2KeyUp(event)
{
	switch (event.keyCode)
	{

		case 38:
			p2UpPressed = false;
			break;
		case 40:
			p2DownPressed = false;
			break;
		case 37:
			p2LeftPressed = false;
			break;
		case 39:
			p2RightPressed = false;
			break;
	} 
}

function debugReset(event) //delete this from final version
{
	switch (event.keyCode)
	{
		case 81:
			resetPositions();
			break;
	}
}

function resetPositions()
{
	player.x = 120;
	player.y = 128;
	player2.x = 1160-64;
	player2.y = 640-128-64;
	ball.x = 630;
	ball.y = 310;
	if (spawnDirection == 1)
	{
		ball.xspeed = -3;
		ball.yspeed = -1
	}
	else if (spawnDirection == 2)
	{
		ball.xspeed = 3;
		ball.yspeed = 1;
	}
	ball.speed = 2;
}
