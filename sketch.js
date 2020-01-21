/*

The Game Project 5 - Bring it all together

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var trees_x;
var collectables;
var clouds;
var mountains;
var canyons;

var game_score;
var flagpole;
var lives;




function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    lives = 3; 
    
	startGame();
}

function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground
    
    //Plummeting logic
    if(isPlummeting == true)
    {
        gameChar_y += 10; // plummeting speed
    }
    
//    if(gameChar_y > floorPos_y)
//    {   // constrain character in canyon
//        gameChar_world_x = constrain(gameChar_world_x, canyon.x_pos +15 , (canyon.x_pos+canyon.width) -15);  
//    }
    
    push();// saves current state of the game
    translate(scrollPos,0); //displaces everything by the value of scrollPos
        
	// Draw clouds.
    drawClouds();
	// Draw mountains.
    drawMountains()
	// Draw trees.
    drawTrees();

	// Draw canyons.
    for(var i=0; i < canyons.length; i++)
    {
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]); 
        
    }
	// Draw collectable items.
    for(var i = 0; i < collectables.length; i++)
        {   
            

            if(collectables[i].isFound == false)
            {
                drawCollectable(collectables[i]);
                checkCollectable(collectables[i]);
                
            }
            
            if(collectables[i].isFound == true)
            {
                //        
            }
        }
    
    //draw flagpole function call
    renderFlagpole();
    
    pop(); //return coordinates to orignial state 

	// Draw game character.
	
	drawGameChar();
    
    //Draw game score
    
    fill("black");
    noStroke();
    textSize(30);
    text("Score: " + game_score,20,35)

	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}

	// Logic to make the game character rise and fall.
    if (gameChar_y < floorPos_y)
    {        
        gameChar_y += 2 ; //gravity 
        isFalling = true; 
       // console.log(gameChar_y)
    }
    else
    {
        isFalling = false;
        //gameChar_y = floorPos_y
    }
    
    
    // call checkFlagpole only if flagpole.isreached is false
    if (flagpole.isReached == false)
        {
            checkFlagpole();
        }
    
    
    checkPlayerDie();
    
    
//    console.log("charater y pos is " + gameChar_y)
//    console.log("floor pos y is " +  floorPos_y)
    
    console.log(lives);
    
	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed()
{

    if(keyCode == 37)
    {
       // console.log("left arrow");
        isLeft = true;
    }
    else if(keyCode == 39)
    {
        //console.log("right arrow");
        isRight = true;
    }
    else if(keyCode == 32 && gameChar_y == floorPos_y) //if "space bar is pressed" AND char pos == floor then jump
    {
       // console.log("space bar");
        gameChar_y -= 100;
    }
   //console.log(gameChar_y)
    

}

function keyReleased()
{
    
    if(keyCode == 37)
    {
        //console.log("left arrow");
        isLeft = false;
    }
    else if(keyCode == 39)
    {
        //console.log("right arrow");
        isRight = false;
    }

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	// draw game character
    	//the game character
	if(isLeft && isFalling)
	{
        //head
        fill(240,230,140);
        ellipse(gameChar_x, gameChar_y-60,25);
        // Arm on the left side
        stroke(240,230,140);
        strokeWeight(6);
        line(gameChar_x -5, gameChar_y - 40 , gameChar_x - 17, gameChar_y -55)
        // leg on the left side
        stroke(70,130,180);
        strokeWeight(8);
        line(gameChar_x -1, gameChar_y-10, gameChar_x - 6, gameChar_y -20);
        noStroke();
        strokeWeight(1);
        //Torso 
        fill(50);
        rect(gameChar_x-10, gameChar_y -48, 20,30);
       //leg on right side
        stroke(70,130,180);
        strokeWeight(8);
        line(gameChar_x +10, gameChar_y-10, gameChar_x +6, gameChar_y -17);  
        //Arm on the right side
        stroke(240,230,140);
        strokeWeight(6);
        line(gameChar_x +7, gameChar_y - 40 , gameChar_x + 17, gameChar_y -55);
        strokeWeight(1);
	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        //head
        fill(240,230,140);
        ellipse(gameChar_x, gameChar_y-60,25);
        //Arm on the right side
        stroke(240,230,140);
        strokeWeight(6);
        line(gameChar_x +7, gameChar_y - 40 , gameChar_x + 17, gameChar_y -55);
        //leg on right side
        stroke(70,130,180);
        strokeWeight(8);
        line(gameChar_x +1, gameChar_y -10, gameChar_x +6, gameChar_y -17);
        noStroke();
        strokeWeight(1);
        //Torso 
        fill(50);
        rect(gameChar_x-10, gameChar_y -48, 20,30);
        //leg on left side
        stroke(70,130,180);
        strokeWeight(8);
        line(gameChar_x-10, gameChar_y-10, gameChar_x - 6, gameChar_y -17);
        // Arm on the left side
        stroke(240,230,140);
        strokeWeight(6);
        line(gameChar_x -5, gameChar_y - 40 , gameChar_x - 17, gameChar_y -55)
        noStroke();
        strokeWeight(1);
	}
	else if(isLeft)
	{
		// add your walking left code
        //head
        fill(240,230,140);
        ellipse(gameChar_x, gameChar_y-60,25);
        // Arm on the left side
        stroke(240,230,140);
        strokeWeight(6);
        line(gameChar_x -5, gameChar_y - 45 , gameChar_x - 17, gameChar_y -25)
        // leg on the left side
        stroke(70,130,180);
        strokeWeight(8);
        //left
        line(gameChar_x -10, gameChar_y, gameChar_x - 6, gameChar_y -20);
        noStroke();
        strokeWeight(1);
        //Torso 
        fill(50);
        rect(gameChar_x-10, gameChar_y -48, 20,30);
        //leg on right side
        stroke(70,130,180);
        strokeWeight(8);
        line(gameChar_x +10, gameChar_y, gameChar_x +4, gameChar_y -17);  
        //Arm on the right side
        stroke(240,230,140);
        strokeWeight(6);
        line(gameChar_x +7, gameChar_y - 40 , gameChar_x + 17, gameChar_y -25);
        strokeWeight(1);
	}
	else if(isRight)
	{
		// add your walking right code
        //head
        fill(240,230,140);
        ellipse(gameChar_x, gameChar_y-60,25);
        //Arm on the right side
        stroke(240,230,140);
        strokeWeight(6);
        line(gameChar_x +7, gameChar_y - 40 , gameChar_x + 17, gameChar_y -25);3
        //leg on right side
        stroke(70,130,180);
        strokeWeight(8);
        line(gameChar_x +10, gameChar_y, gameChar_x +6, gameChar_y -17);
        noStroke();
        strokeWeight(1);
        //Torso 
        fill(50);
        rect(gameChar_x-10, gameChar_y -48, 20,30);
        //leg on left side
        stroke(70,130,180);
        strokeWeight(8);
        line(gameChar_x -10, gameChar_y, gameChar_x - 6, gameChar_y -17);
        // Arm on the left side
        stroke(240,230,140);
        strokeWeight(6);
        line(gameChar_x -5, gameChar_y - 40 , gameChar_x - 17, gameChar_y -25)
        noStroke();
        strokeWeight(1);    
	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        //head
        fill(240,230,140);
        ellipse(gameChar_x, gameChar_y-60,25)
        stroke(70,130,180);
        strokeWeight(9);
        //left leg 
        line(gameChar_x -8, gameChar_y-10, gameChar_x - 8, gameChar_y -22);
        //right leg
        line(gameChar_x +8, gameChar_y-10, gameChar_x +8, gameChar_y -22);
        noStroke();
        //Torso
        fill(50);
        rect(gameChar_x-13, gameChar_y -48, 26,25);
        stroke(240,230,140);
        strokeWeight(6);
        //left arm
        line(gameChar_x -14, gameChar_y - 45 , gameChar_x - 17, gameChar_y -65);
        //right arm
        line(gameChar_x +14, gameChar_y - 45 , gameChar_x + 17, gameChar_y -65);

        strokeWeight(1);
	}
	else 
	{  
        // staying still
        //head
        fill(240,230,140);
        ellipse(gameChar_x, gameChar_y-60,25); 
        stroke(70,130,180);
        strokeWeight(9);
        //left leg
        line(gameChar_x -8, gameChar_y, gameChar_x - 8, gameChar_y -22);
        //right leg
        line(gameChar_x +8, gameChar_y, gameChar_x +8, gameChar_y -22);
        noStroke();    
        strokeWeight(1);
        //Torso
        fill(50);
        rect(gameChar_x-13, gameChar_y -48, 26,25);
        stroke(240,230,140);
        strokeWeight(6);
        //left arm
        line(gameChar_x -13, gameChar_y - 46 , gameChar_x - 13, gameChar_y -26);
        //right arm
        line(gameChar_x +13, gameChar_y - 46 , gameChar_x + 13, gameChar_y -26);
        strokeWeight(1);
	}
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.

// Function to draw mountains objects.

// Function to draw trees objects.
function drawTrees()
{
    for(var i = 0; i < trees_x.length; i++) // trees_x.length is used to travse the array
    {
        fill(255);

        // tree trunk
        fill(160,82,45);
        rect(trees_x[i],floorPos_y-60,15,60);        
        fill(107,142,35);
        // lower branch

        triangle(trees_x[i]+8,floorPos_y-80, 
                 trees_x[i]-37,floorPos_y-40,
                 trees_x[i]+53,floorPos_y-40) 
         //middle branch
        triangle(trees_x[i]+8,floorPos_y-95,
                 trees_x[i]-29,floorPos_y-55,
                 trees_x[i]+45,floorPos_y-55)
         //upper branch
        triangle(trees_x[i]+8,floorPos_y-110,
                 trees_x[i]-22,floorPos_y-70,
                 trees_x[i]+38,floorPos_y-70)    
        noStroke();
        fill(255);
    //     
    }
}


// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
    fill(100, 155, 255);
    rect(t_canyon.x_pos,432,t_canyon.width,200);   
    fill(139,69,19);
    //soil on left  
    rect(t_canyon.x_pos-10,432,10 ,200);   
    //soil on right 
    rect(t_canyon.x_pos+t_canyon.width,432,10,200);   
    noStroke();
    fill(255);
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
    if(gameChar_world_x >= t_canyon.x_pos && (gameChar_world_x <= (t_canyon.x_pos+t_canyon.width)) && gameChar_y >= floorPos_y)
    //if(gameChar_world_x < t_canyon.x_pos) //&& (gameChar_world_x <= (t_canyon.x_pos+t_canyon.width)) && gameChar_y >= floorPos_y)
    {       
       isPlummeting = true; // if over caynon,then plummet 
    }


}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
    // Draw collectable items
    stroke(1);
    // bigger ellipse
    fill(255,255,0);
    ellipse(t_collectable.x_pos , t_collectable.y_pos, t_collectable.size-10); 
    // smaller ellipse
    fill(255,180,0);
    ellipse(t_collectable.x_pos , t_collectable.y_pos, t_collectable.size-25); 
    noStroke(); 

}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
    
    if(dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) <= t_collectable.size)
    {
        t_collectable.isFound = true; // character takes t_collectable and it disapears
        game_score += 1; // when character takes collectable score goes up by 1
    }
    
}

function drawClouds()
{
    for(var i = 0; i < clouds.length; i++)
    {
            fill(240);
        //big ellipse in middle
        ellipse(clouds[i].x_pos+220, 
                clouds[i].y_pos+150,
                clouds[i].w,
                (clouds[i].h-30)); 
        // ellipse on the right up
        ellipse(clouds[i].x_pos+260,
                clouds[i].y_pos+140,
                (clouds[i].w-60),
                (clouds[i].h-50)); 
        // ellipse on the right down
        ellipse(clouds[i].x_pos+260, 
                clouds[i].y_pos+160,
                (clouds[i].w-50),
                (clouds[i].h-60)); 
       // ellipse on left up 
        ellipse(clouds[i].x_pos+180,
                clouds[i].y_pos+140,
                clouds[i].w-50,
                clouds[i].h-60);
        // ellipse on left down
        ellipse(clouds[i].x_pos+180,
                clouds[i].y_pos+165,
                clouds[i].w-50,
                clouds[i].h-60); 
        // ellpise in middle up
        ellipse(clouds[i].x_pos+220,
                clouds[i].y_pos+180,
                clouds[i].w-60,
                clouds[i].h-80); 
        // ellpise in middle down
        ellipse(clouds[i].x_pos+220,
                clouds[i].y_pos+120,
                clouds[i].w-60,
                clouds[i].h-80); 
    }    
}

function drawMountains()
{
for(i = 0 ;i < mountains.length;i++)
    {
        fill(200);
        triangle(mountains[i].x_pos+850,mountains[i].y_pos+250,
                 mountains[i].x_pos+700,mountains[i].y_pos+432,
                 mountains[i].x_pos+1000,mountains[i].y_pos+432); 
        //snowy peak
        fill(255);
        triangle(mountains[i].x_pos+850,mountains[i].y_pos+250,
                 mountains[i].x_pos+809,mountains[i].y_pos+300,
                 mountains[i].x_pos+891,mountains[i].y_pos+300); 

    }    
}

function renderFlagpole()
{
    // draw the pole
    push();
    strokeWeight(5);
    stroke(40);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 200);
    
    // draw the flag
    fill(210,0,0);
    strokeWeight(2);
    
    if(flagpole.isReached) // full mast
    {
         rect(flagpole.x_pos,floorPos_y - 200,80,50);    
    }
    else // no mast
    {
        rect(flagpole.x_pos,floorPos_y - 60,80,50);   
    }
       
    pop();
    
}


function checkFlagpole()
{
   var d = abs(gameChar_world_x - flagpole.x_pos); // var for the distance between flagpole and character, absolute value
   
    if(d < 15)
        {
            flagpole.isReached = true;
        }
}


function checkPlayerDie()
{
    
//    if (lives > 0 && lives < 3)
//	{
//		startGame();
//	}
    
    if (isPlummeting && gameChar_y > floorPos_y + 300)
	{
		lives -= 1;
        console.log("play is dead");
        
        if (lives > 0 && lives <= 3)
        {
            startGame();
        }
        else
        {
            //end game
        }
	}
    
    

}


function startGame()
{
    gameChar_x = width/2;
	gameChar_y = floorPos_y;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
    isFound = false;

	// Initialise arrays of scenery objects.
    
    //trees
    trees_x = [100, 300, 500, 1000,1550,1900,2200,2600,2850, 3050,3500];
    
    //collectables
    collectables = [
          {x_pos: 100 ,  y_pos: floorPos_y -20, size: 50, isFound: false},
          {x_pos: 800 ,  y_pos: floorPos_y -20, size: 50, isFound: false},
          {x_pos: 1500 , y_pos: floorPos_y -20, size: 50, isFound: false},
          {x_pos: 2000 , y_pos: floorPos_y -20, size: 50, isFound: false},
          {x_pos: 2800 , y_pos: floorPos_y -20, size: 50, isFound: false},
         ]
    
    //clouds
    clouds = [
          {x_pos: 100 , y_pos: -50, w:100, h:100},
          {x_pos: 600 , y_pos: 0 , w:100, h:100},
          {x_pos: 800 , y_pos: 50, w:100, h:100},
          {x_pos: 1200 , y_pos: -50, w:100, h:100},
          {x_pos: 1400 , y_pos: 0, w:100, h:100},
          {x_pos: 1800 , y_pos: -50, w:100, h:100},
          {x_pos: 2100 , y_pos: 0, w:100, h:100},
          {x_pos: 2500 , y_pos: -50, w:100, h:100},
          {x_pos: 2900 , y_pos: 50, w:100, h:100},
          {x_pos: 3500 , y_pos: -50, w:100, h:100}];

    //mountains
    mountains = [
                {x_pos:0, y_pos: 0},
                {x_pos:1200, y_pos: 0},
                {x_pos:2500, y_pos: 0}];
    
    //canyons
    canyons = [
          {x_pos: 150,width: 60},
          {x_pos: 1300,width: 60},
          {x_pos: 2400,width: 60}];
    
   
    game_score = 0; // intialize the samge score to 0
    
    
    
    //flagpole
    flagpole = {isReached: false, x_pos: 3000};    
}












