var spaceCraft
var star
var UFO
var score
var life
var gameState = "play"
var bullet
var time=90

function preload(){
  bg=loadImage("images/space.jpg")
  spaceCraftImg = loadImage("images/spaceCraft.png")
  starImg = loadImage("images/star.png")
  asteroidImg = loadImage("images/asteroid.png")
  UFO1Img = loadImage("images/UFO1.png")
  UFO2Img = loadImage("images/UFO2.png")
  UFO3Img = loadImage("images/UFO3.png")
  UFO4Img = loadImage("images/UFO4.png")
  UFO5Img = loadImage("images/UFO5.png")
  livesImg = loadImage("images/lives.png")
  bulletImg = loadImage("images/bullet.png")
  
  
}


function setup() {
  createCanvas(1000, 600);

  score = 0
  life = 3
  spaceCraft = createSprite(500,500)
  spaceCraft.addImage("spaceCraft",spaceCraftImg)
  spaceCraft.debug=true
  spaceCraft.setCollider("rectangle",0,0,170,350)
  spaceCraft.scale=0.5
 
  star2 = createSprite(900,30,10,10)
  star2.addImage("star",starImg)
  star2.scale=0.08

  asteroid2 = createSprite(900,90,10,10)
  asteroid2.addImage("asteroid",asteroidImg)
  asteroid2.scale=0.17

  UFOsco = createSprite(900,150,10,10)
  UFOsco.addImage("ufo",UFO2Img)
  UFOsco.scale=0.15

  as_score = 0

  UFscore = 0

  spark1 = createSprite(80,36,20,20)
  spark1.addImage("lives",livesImg)
  spark1.scale=0.1

  spark2 = createSprite(120,36,20,20)
  spark2.addImage("lives",livesImg)
  spark2.scale=0.1

  spark3 = createSprite(160,36,20,20)
  spark3.addImage("lives",livesImg)
  spark3.scale=0.1

  starGroup = new Group()
  asteroidGroup = new Group()
  UFOgroup = new Group()
  bulletGroup = new Group()
}

function draw() {
  background(bg);

  drawSprites()

  textSize(25)
  fill("white")
  text(score,930,36)
  text(as_score,930,95)
  text(UFscore,930,154)
  
  text("Time Remaining="+Math.round(time),350,50)

if (gameState==="play"){

  time=time-0.05

  if(time<0){
    gameState="end"
  }

  if(life===3){
    spark1.visible=true
    spark2.visible=true
    spark3.visible=true
  }

  if(life===2){
    spark1.visible=true
    spark2.visible=true
    spark3.visible=false
  }

  if(life===1){
    spark1.visible=true
    spark2.visible=false
    spark3.visible=false
  }
  
  if(life===0){
    spark1.visible=false
    spark2.visible=false
    spark3.visible=false
    gameState="end"
  }

  if(keyDown(RIGHT_ARROW)){
    spaceCraft.x +=6
 }

 if(keyDown(LEFT_ARROW)){
   spaceCraft.x -=6
}

if(starGroup.isTouching(spaceCraft)){
  starGroup[0].destroy()
  score+=1
}

if(asteroidGroup.isTouching(spaceCraft)){
   asteroidGroup[0].destroy()
   life-=1
}

if(bulletGroup.isTouching(UFOgroup)){
  bulletGroup[0].destroy()
  UFOgroup[0].destroy()
  UFscore+=1
}

if(bulletGroup.isTouching(asteroidGroup)){
  bulletGroup[0].destroy()
  asteroidGroup[0].destroy()
  as_score+=1

}

spawnStars()

spawnAsteroids()

spawnUFOs()

if(UFOgroup.isTouching(spaceCraft)){
  UFOgroup[0].destroy()
  gameState="end"
}

if(keyWentDown("UP")){
  bullet = createSprite(spaceCraft.x,spaceCraft.y,10,30)
  bullet.addImage("bullet",bulletImg)
  bullet.scale=0.1
  bullet.velocityY=-8
  bulletGroup.add(bullet)
  
  bullet.depth=spaceCraft.depth
  spaceCraft.depth+=1
}
}


if (gameState==="end"){
 text("GAME OVER",450,300)
 starGroup.velocityYEach(0)
 asteroidGroup.velocityYEach(0)
 UFOgroup.velocityYEach(0)
 starGroup.setLifetimeEach(-1)
 asteroidGroup.setLifetimeEach(-1)
 UFOgroup.setLifetimeEach(-1)
 }

  
  
 }

function spawnStars(){

  if(frameCount%90===0){
    star=createSprite(random(0,1000),5,10,10)
    star.addImage("star",starImg)
    star.velocityY=7
    star.scale=0.07

    star.lifetime=80
    starGroup.add(star)
  }
}

function spawnAsteroids(){

  if(frameCount%100===0){
    asteroid=createSprite(random(0,1000),5,10,10)
    asteroid.addImage("asteroid",asteroidImg)
    asteroid.velocityY=9
    asteroid.scale=0.32
    asteroid.debug=true
    asteroid.setCollider("circle",0,0,120)
    asteroid.lifetime=80;
    asteroidGroup.add(asteroid)
  }
}


function spawnUFOs(){

  if(frameCount%150===0){
    UFO=createSprite(random(0,1000),5,10,10)

  var rand=Math.round(random(1,5))
  
  switch(rand){
      case 1:
        UFO.addImage("UFO1",UFO1Img)
        break
      case 2:
        UFO.addImage("UFO2",UFO2Img)
        break
        
      case 3:
        UFO.addImage("UFO3",UFO3Img)
        break
      case 4:
        UFO.addImage("UFO4",UFO4Img)
         break
      case 5:
        UFO.addImage("UFO5",UFO5Img)
        break

  }

      UFO.debug=true
      UFO.setCollider("rectangle",0,0,300,280)
     
    //asteroid.addImage("asteroid",asteroidImg)
    UFO.velocityY=8
    UFO.scale=0.2

    UFO.lifetime=80
  
    UFOgroup.add(UFO)
  }

}
