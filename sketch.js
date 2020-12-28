var dog, doghappy, dogImg2;
var foodS = 0;
var milk, milkImg;
var fedTime, lastFed;
var foodObj;
var foodStock;
var form;
var lastFed ;

var nameval;
function preload()
{
  dogImg2 = loadImage("images/dogImg.png");
  doghappy = loadImage("images/dogImg1.png");
  

}

function setup() {

  createCanvas(700, 700);
  database = firebase.database();
  dog = createSprite(540,250,10,10);

  


  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){

    lastFed  = data.val();

  });



  dog.addImage("dog_original", dogImg2);
  dog.addImage("happy",doghappy);
  dog.scale = 0.2;

 
  milk1 = new Food();

  feed = createButton("Feed your dog");
  feed.position(400, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(750, 95);
  addFood.mousePressed(addMilk);


  namedog = createInput("Name");
  namedog.position(855, 550);
  doggyname = this.namedog.value();

  // addName = createButton('Start Playing');
  // addName.position(875, 600);
  // addName.mousePressed(displayName);


  foodStock = database.ref('Food');
  foodStock.on("value", readStock);


}


function draw() {  


  background("cyan");
  textSize(20);
  text("Food left : " + foodS, 490, 400);
  

  if (lastFed>=12){
    text("Last feed : 10am" + lastFed%12 + " PM", 450, 30);
  }
  else if(lastFed === 0){
    text("Last feed : 12 AM", 450 , 30);
  }
  else  {
    text("Last feed : "+ lastFed + " AM", 450, 30);
  }
  doggyname = this.namedog.value();
  nameval = doggyname;
 
  text("Name : " + nameval, 490, 350);

  if(keyDown(UP_ARROW)){
    dog.addImage(doghappy);
  }

  milk1.display();
  drawSprites();

}

function readStock(data){
  foodS = data.val();
  console.log(foodS);
}

 function writeStock(x){

  if (x<=0){
    x=0;
  }
  else{
    x = x - 1;
    database.ref('/').update({
    Food : x
    })
  }
 }
function feedDog(){
 
  milk1.updateFoodStock(milk1.getFoodStock()-1);
  database.ref('/').update({
    Food:milk1.getFoodStock(),
    FeedTime:hour()
    
  })
  namedog.hide();
}


function addMilk(){
  //dog.addImage(doghappy);

  milk1.updateFoodStock(milk1.getFoodStock()+1);
  database.ref('/').update({
    Food:milk1.getFoodStock(),
    FeedTime:hour()
  })
  namedog.hide();

}


// function displayName(){
//   textSize(20);
//   this.nameval  = doggyname;
//   // text("Name : " + doggyname, 550, 350);
// }