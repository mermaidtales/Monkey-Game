var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;

var banana ,bananaImage, obstacle, obstacleImage;

var bananaGroup, obstacleGroup;

var ground;

var invisibleGround;

var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas (600, 600);

  ground = createSprite (300, 500, 600, 30);
  //ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  invisibleGround = createSprite (300, 500, 1200, 30);
  invisibleGround.scale = 0.5;
  
  monkey = createSprite (100, 430, 30, 30);
  monkey.addAnimation ("running",monkey_running);
  monkey.scale = 0.2;
  
  bananasGroup = new Group ();
  obstaclesGroup = new Group ();
  
  var survivalTime = 0;
  var score = 0;
}


function draw() {
  background ("lightgreen");
  
  stroke("white");
  textSize(20);
  fill("white");
  
  text("Score: " + score, 400, 50);
  
  stroke("black");
  textSize(20);
  fill ("black");
  
  if (gameState === PLAY){
  
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100, 50);
  
  invisibleGround.visible = false; 
  monkey.collide (invisibleGround);
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if (keyDown("space")) {
    monkey.velocityY = -4;
  }
  
  monkey.velocityY = monkey.velocityY + 0.4;
    
  if (bananasGroup.isTouching(monkey)) {
    score = score + 1;
  }
    
  if (obstaclesGroup.isTouching(monkey)) {
    gameState = END;
  }
  bananas();
  
  spawnObstacles();
    
  }
  
  if (gameState === END) {
    ground.velocityX = 0;
    
    monkey.visible = false;
    bananasGroup.destroyEach();
    obstaclesGroup.destroyEach();
  }
  
  drawSprites ();
  
}

function bananas () {
  if (frameCount % 200 === 0) {
    banana = createSprite (600, 300, 40, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage (bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -4;
    
    banana.lifetime = 150;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //bananaGroup.add(banana);
  }
}

function spawnObstacles () {
  if (frameCount % 300 === 0){
    var obstacle = createSprite(600, 400, 30, 30);
    obstacle.addImage (obstacleImage);
    obstacle.scale = 0.5;
    obstacle.velocityX = -6;
  
    var rand = Math.round(random(1,6));
  
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    obstacle.lifetime = 150;
   
    obstaclesGroup.add(obstacle);
  }
}



