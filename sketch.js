var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

function preload(){

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  var survivalTime=0;
  monkey=createSprite(80,315,20,20)
  monkey.addAnimation("moving",monkey_running)
  monkey.velocityY=-5
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  FoodGroup=new Group();
  obstacleGroup=new Group();
  
  score=0
}
function draw() {
  background(255);

 
  if (ground.x<0){
    ground.x=ground.width/2;
  }
  if(keyDown("space")){
     monkey.velocityY = -12;
    
       }
  
  monkey.velocityY = monkey.velocityY +0.8
  
  monkey.collide(ground);
  spawnFood();
  spawnObstacles();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score"+score,500,50);
  drawSprites();
   
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+survivalTime,150,50 );
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }

   
}

  


function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 300;
  
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
}
function spawnFood(){
  if(frameCount%80===0){
  banana=createSprite(600,250,40,10);
  banana.velocityX=-5;
  banana.lifetime=300;
  monkey.depth=banana.depth+1;
  banana.addImage(bananaImage);
  banana.scale=0.05;
  FoodGroup.add(banana);
}
}