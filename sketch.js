
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const constraint = Matter.Constraint;

var boy,boyImage;
var tree,treeImage;

function preload()
{
	boyImage = loadImage("sprites/boy.png");
	treeImage = loadImage("sprites/tree.png");
}

function setup() {
	createCanvas(800, 700);

	engine = Engine.create();
	world = engine.world;

	//tree = new Tree(600,460,350,400)

	boy = createSprite(180,600,150,200)
	boy.addImage(boyImage);
	boy.scale = 0.1

	ground = new Ground(400,650,850,20)

	stone = new Stone(130,545,50,50)
	stone.body.depth = boy.depth+100000;

	mango1 = new Mango(600,400,40,40)
	mango2 = new Mango(540,390,40,40)
	mango3 = new Mango(640,300,40,40)
	mango4 = new Mango(620,350,40,40)
	mango5 = new Mango(590,320,40,40)
	mango6 = new Mango(690,360,40,40)
	mango7 = new Mango(710,390,40,40)
	mango8 = new Mango(660,390,40,40)

	tree = createSprite(600,460,350,400)
	tree.addImage(treeImage);
	tree.scale = 0.3
	tree.depth = mango1.depth-1000000000000000000000000;

	rope = new Rope(stone.body,{x:130,y:545})

	//boy = new Boy(120,600,150,200)

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background("white");
  drawSprites();

  textSize(20)
  text("Press Space To Reset",100,100)
  
  ground.display();

  stone.display();
  //boy.display();
  //tree.display();

  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();
  mango7.display();
  mango8.display();

  rope.display();

  detectCollision(stone,mango1);
  detectCollision(stone,mango2);
  detectCollision(stone,mango3);
  detectCollision(stone,mango4);
  detectCollision(stone,mango5);
  detectCollision(stone,mango6);
  detectCollision(stone,mango7);
  detectCollision(stone,mango8);

  reset();
}

function mouseDragged(){
    Matter.Body.setPosition(stone.body,{x:mouseX,y:mouseY});
}

function mouseReleased(){
    rope.fly();
} 

function detectCollision(lstone,lmango){
	stoneBodyPosition = lstone.body.position;
	mangoBodyPosition = lmango.body.position;
  
	var distance = dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y);
	if(distance <= lmango.r + lstone.r){
	  Matter.Body.setStatic(lmango.body, false);
	}
}

function reset(){
	if(keyDown("space")){
	  Matter.Body.setPosition(stone.body,{x:130,y:545});
	  rope.attach(stone.body);
	}
  }