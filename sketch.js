//Global veriables
var snake;
var speed=5;
var scl=20;
var food;
var bonus_in = 5;
var pressedKey="right";
var score = 0;
var best = 0;

function setup() {
	// Initial function of p5.js framework;
	createCanvas(600,600);
	snake= new snake();
	frameRate(speed);
	pickLocation();
}

function draw() {
	// Update function of p5.js framework;
	background(51);
	snake.update();
	frameRate(speed);
	snake.show();
	if (snake.eat(food)){
		// If snake eat the food pick new location;
		pickLocation();
		
	}


	
	// show food ;
	rect(food.x,food.y,scl,scl).fill(255,255,255);
	// text
	textSize(15);
	fill(200);
	text("http://www.github.com/prabinzz",width/1.60,height-19);
	textSize(18);
	text("Score: "+score,width/1.35,30);
	text("Bonus: "+bonus_in,width/1.35,55);
	if (best>0) {
		text("Best:    "+best,width/1.35,80);		
	};
}

function pickLocation(){
	// Pick new random location in th grid and create a vector
	cols=floor(width/scl);
	rows=floor(height/scl);
	
	food=createVector(floor(random(cols)),floor(random(rows)));
	food.mult(scl);
	
}
function keyPressed(){
	// key pressed monitor function of p5.js framework
	if (keyCode===UP_ARROW & pressedKey!="down"){
		// if up arrow is pressed and previous key is not down arrow
		snake.dir(0,-1);
		pressedKey='up';
	}else if(keyCode===DOWN_ARROW & pressedKey!='up'){
	// if up down is pressed and previous key is not up arrow
		snake.dir(0,1);
		pressedKey="down";
	}else if(keyCode===LEFT_ARROW & pressedKey!='right'){
		// if left arrow is pressed and previous key is not right arrow
		snake.dir(-1,0);
		pressedKey="left";
		
	}else if(keyCode===RIGHT_ARROW & pressedKey!="left"){
		// if right arrow is pressed and previous key is not left arrow
		snake.dir(1,0);
		pressedKey='right';
	}
}





// ------------------------------------SNAKE------------------------------------
function snake(){
	// initial variables 
	this.x=0;
	this.y=0;
	this.xspeed=1;
	this.yspeed=0;
	this.total=0;
	this.tail=[];

	this.update = function(){
		// function to  update data of this class

		this.death();
			//Shift tail array by 1
			for (var i = 0 ; i < this.tail.length - 1; i++) {
				this.tail[i]=this.tail[i+1];
			}

		
		this.tail[this.total-1]=createVector(this.x,this.y);

		this.x+=this.xspeed*scl;
		this.y+=this.yspeed*scl;

		this.x = constrain(this.x,0,width-scl);
		this.y = constrain(this.y,0,height-scl);
	}
	this.eat=function(pos){
		// calculate distance of snake and food 
		d=dist(this.x,this.y,pos.x,pos.y);
		if (d<1){
			this.total++;	
			bonus_in--;
			if (bonus_in > 0) {
				score++
			}else{
				score+=10;
				bonus_in = 5;
			}
			speed+=1;
			return true;
		}else{
			// if d is not less then 0 return false
			return false;
		}
	}

	this.death=function(){
		for (var i = 0; i < this.tail.length; i++) {
			pos=this.tail[i]
			distance=dist(this.x,this.y,pos.x,pos.y);
			if (distance===0) {
				this.tail=[];
				this.x=0;
				bonus_in = 5;
				this.y=height/2;
				this.dir(1,0);
				speed=5;
				foodCount=0;
				if (best < score) {
					best = score;
				};
				score = 0;
				this.total=0;
			};
		}
	}
	this.dir= function(x,y){
		this.xspeed=x;
		this.yspeed=y;
	}

	this.show=function(){
		fill(255,255,255);
		for (var i = 0 ; i < this.tail.length ; i++) {
			rect(this.tail[i].x,this.tail[i].y,scl,scl);
		}
		fill(255,0,100);
		rect(this.x, this.y, scl,scl);
	}
}
