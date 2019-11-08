
var ctx = document.getElementById("ctx").getContext("2d") ;
var background = new Image();
var catcherOne = new Image();
var catcherTwo = new Image();
var catcherThree = new Image();
var catcherFour = new Image();
var play_button = new Image();
var pause_button = new Image();
var food = new Image();
var tile = new Image();
var fruit = new Image();

var tileList ;
var foodList ;
var foodDrop;
var fruitDrop ;
var fruitList ;

var score =0 ;
var tscore; 
var fscore=0;
var blink = 0;
var level = 100 ;
var gameOver = false ;
var foodTimer ;
var intervalVar ;
var blinkCounter =0;
var dropFruit = false ;
var fruitTimer = 0;
var restart = false ;
var isPause = false ;

var foodObject = {
   'width' : 40 ,
   'height' : 40,
   'speed' : 15
};

var tileObject = {
	'width' : 50 ,
	'height' : 20
};

var catcher = {
   'width' : 25,
   'height' : 50,
   'x':100 ,
   'y':280,
   'jump': 0 ,
   'jumpUnit' : 20,
   'onAir' : false,
   'speed' : 0 ,
   'left' : false ,
   'right': false,
   'gravity' : 15,
   'safe': true

};

//var scoresheet = {
	


  background.onload = function() {
  	catcherOne.onload = function(){
  		catcherTwo.onload = function(){
  		  catcherThree.onload = function(){
  		  	catcherFour.onload = function(){
  		  		play_button.onload = function(){
					//pause_button.onload = function{
  		  			food.onload = function(){
  		  				tile.onload = function(){
                          fruit.onload = function(){

							
                          //document.getElementByTagName("background").onkeypress = function(){
                           document.getElementById("restart").onclick = function(){	
						   
                           	if(document.getElementById("restart").innerHTML == "Pause" && restart == true){
							//if(event.keyCode == 27 && isPause==false){
                           		isPause = true ;
                           		document.getElementById("restart").innerHTML = "restart";
                           		document.getElementById("restart").style.backgroundColor = "blue" ;
                           	}

                           	else if(restart==true && document.getElementById("restart").innerHTML == "restart"){
							//if(event.keyCode == 27 && isPause==true){	
                           		isPause = false ;
                           		document.getElementById("restart").innerHTML = "Pause" ;
                           		document.getElementById("restart").style.backgroundColor = "#C82333" ;
                           	}
                           }
                          

                          drawObject = function(object , x , y , width , height){
                          	ctx.drawImage(object , x , y , width , height) ;
                          }

                         
                          // Motion Controls of catcher
                          document.onkeydown = function(event){
                          	if(event.keyCode == 37){
                          		catcher.left = true ;
                          		catcher .right = false ;
                          		catcher.speed = -20 ;
                          	}

                          	else if(event.keyCode == 39){
                          		catcher.left = false ;
                                catcher.right = true ;
                                catcher.speed = 20 ;
                          	}

                          	  if(event.keyCode == 38 && catcher.onAir!=true && catcher.y ==280){
                          		catcher.onAir = true ;
                          		catcher.jump = 100 ;
                          	}
                          }

                            document.onkeyup = function(event){
                          	if(event.keyCode == 37){
                          		catcher.left = false ;
                          		catcher .right = false ;
                          	}

                          	else if(event.keyCode == 39){
                          		catcher.left = false ;
                                catcher.right = false ;
                          	}

                          }
                            
                         // Phone controls
                            
                            var left = document.getElementById("left");
                            var right = document.getElementById("right");
                            var up = document.getElementById("up");
                              
                              //to move catcher left
                              left.onmousedown = function(){
                                catcher.left = true ;
                          		catcher .right = false ;
                          		catcher.speed = -20 ;
                              }
                              
                              //to mover catcher right
                              right.onmousedown = function(){
                                  catcher.left = false ;
                                catcher.right = true ;
                                catcher.speed = 20 ;
                              }
                              
                              //to make catcher jump
                              up.onmousedown  = function(){
                                  if(catcher.onAir != true && catcher.y == 280){
                                      catcher.onAir = true ;
                          		      catcher.jump = 100 ;
                                  }
                              }
                              
                              left.onmouseup = function(){
                                  catcher.left = false ;
                                catcher.right = false ;
                              }
                              
                              right.onmouseup = function(){
                                  catcher.left = false ;
                                catcher.right = false ;
                              }
                              
                              

                          restartGameMsg = function(){
                          	ctx.save();
                          	drawObject(background , 0 , 0 , 500 , 400);
                          	ctx.globalAlpha = 0.5;
                          	drawObject(play_button ,110 , 80 , 300 , 230 );
                          	ctx.globalAlpha = 1.0 ;
                          	ctx.strokeStyle = "white";
                          	ctx.font = "27px calibri";
                          	ctx.strokeText("Click Here to start" , 160 , 200 ) ;
                            restart = false;
                          	ctx.restore();
                          }

                          //Game Over MSG
                          gameOverMsg = function(){
                          	ctx.save();
                          	ctx.globalAlpha = 0.5;
                          	drawObject(play_button ,140 , 80 , 240 , 200 );
                          	ctx.globalAlpha = 1.0 ;
                          	ctx.strokeStyle = "white";
                          	ctx.font = "27px calibri";
                          	ctx.strokeText("Oops!!" , 180 , 170 ) ;
                          	ctx.font = "20px calibri";
                          	ctx.strokeText("Click here to restart again", 180 , 210);
                            ctx.restore();
							tscore=fscore*3+score;
							document.getElementById("scoresheet").innerHTML="Score:  ";
							document.getElementById("scoresheet").innerHTML+=tscore;
              var hscore = tscore;
    if(localStorage.getItem("__LOGGEDIN__")==1){
  var key = localStorage.getItem("__USER__")
  var val = localStorage.getItem(key);
  hscore1 = val.split(",")
  hscore = hscore1[2]
  if(hscore<tscore)
  {
    hscore = tscore;
    hscore1[2] = hscore;
    localStorage.setItem(localStorage.getItem("__USER__"),hscore1);
  }
  document.getElementById("scoresheet").innerHTML="<br>";
  document.getElementById("scoresheet").innerHTML="Your Highscore till now is: ";
document.getElementById("scoresheet").innerHTML+=hscore;
  }
                            restart = false ;  
                            clearInterval(intervalVar);  

                          }

                          //Collision Functions
                          foodCatcherCollision = function(f){
                            if(f.x + foodObject.width > catcher.x && f.x < catcher.x + catcher.width && f.y + foodObject.height > catcher.y && f.y < catcher.y + catcher.height){
                            	return true ;
                            }
                          }

                          foodTileCollision = function(f,t){
                          	 if(f.x + foodObject.width > t.x && f.x < t.x + tileObject.width && f.y + foodObject.height > t.y && f.y < t.y + tileObject.height){
                            	return true ;
                            }
                          }

                          catcherTileCollision = function(t){
                          	if(catcher.x + catcher.width >= t.x && catcher.x <= t.x + tileObject.width && catcher.y + catcher.height <= t.y ){
                          		return true ;
                          	}
                          }
                          
                          //function to Jump
                          jumpCatcher = function(){

                            //Moving Up
                          	if(catcher.onAir && catcher.jump > 0){
                          		catcher.y = catcher.y - catcher.jumpUnit ;
                          		catcher.jump = catcher.jump - catcher.jumpUnit ;
                          	}
                            
                            //Moving Down
                          	if(catcher.jump <= 0 && catcher.onAir && catcher.jump > -100){
                          		catcher.y = catcher.y + catcher.jumpUnit ;
                          		catcher.jump = catcher.jump - catcher.jumpUnit ;
                          	}
                             
                             //After returning to initial postion
                          	if(catcher.onAir && catcher.jump <= -100){
                          		catcher.onAir = false ;
                          		catcher.jump = 100 ;
                          	}
                          }

                          //Function to show the score
                          showScore = function(){
                          	ctx.save();
                          	drawObject(food , 440 , 10 , 20 ,20 ) ;
                          	ctx.font = "20px calibri";
                          	ctx.fillStyle = "white";
                          	ctx.fillText(" : "+score , 460 , 28);
                          	ctx.restore();
                          	ctx.save();
                          	drawObject(fruit , 390 , 10 , 20 ,20 ) ;
                          	ctx.font = "20px calibri";
                          	ctx.fillStyle = "white";
                          	ctx.fillText(" : "+fscore , 410 , 28);
                          	ctx.restore();
                          }



                          //Function to update the postion of catcher every fps

                          updateCatcherPosition = function(){

                          	if(catcher.left == true){
                                catcher.x = catcher.x + catcher.speed ;
                          	}

                          	if(catcher.right == true){
                          		catcher.x = catcher.x + catcher.speed ;
                          	}

                          	if(catcher.x >= 500 - catcher.width){
                          		catcher.x = 500 - catcher.width;
                          	}

                          	if(catcher.x <=0){
                          		catcher.x = 0;
                          	}

                          	if(catcher.y >= 400 - catcher.height){
                          		catcher.y = 400;
                          		gameOver = true ;
                          	}
                          }

                          updateFoodPosition = function(){
                          	for(var i in foodList){

                          		if(foodList[i].y >= 400 ){
                          			foodList.splice(i,1);
                          		}

                          		else{
                          			foodList[i].y = foodList[i].y + foodObject.speed ;
                          		}
                          	}
                          }

                          updateFruitPosition = function(){
                          	for(var i in fruitList){

                          		if(fruitList[i].y >= 400 ){
                          			fruitList.splice(i,1);
                          		}

                          		else{
                          			fruitList[i].y = fruitList[i].y + foodObject.speed ;
                          		}
                          	}
                          }

                          updateGame = function(){

                          	if(isPause == false){

                          	ctx.clearRect(0 , 0 ,500 , 400) ;
                          	drawObject(background , 0 , 0 , 500 , 400);


                          	//blinking of catcher

                          	 blinkCounter++;

                         if(catcher.onAir){
                            drawObject(catcherFour , catcher.x , catcher.y , catcher.width , catcher.height);
                         }

                         else{

                       	if(blink == 0 && catcher.y + catcher.height <= 330 ){
                          	drawObject(catcherTwo , catcher.x , catcher.y , catcher.width , catcher.height) ;

                          	 if(blinkCounter > 4){
                          	    blink = 1;
                          	    blinkCounter = 0;
                              }
                            }

                           
                            else if(blink ==1 && catcher.y + catcher.height <= 330 ){
                             drawObject(catcherOne , catcher.x , catcher.y , catcher.width , catcher.height) ;
                          	 blink = 0;
                            }

                            else if(catcher.y + catcher.height > 330){
                            	drawObject(catcherThree, catcher.x , catcher.y , 50 , 20);
                            }

                           

                        }

                            //Motion of catcher
                            updateCatcherPosition();
                            updateFoodPosition() ;
                            updateFruitPosition();
                            jumpCatcher();

                            foodTimer++;
                           	if(foodTimer > 30){
                           		foodList.push({'x': foodDrop[Math.round(Math.random()*9)], 'y':0});
                       			foodTimer = 0;
                           	}

                           	for(var i in foodList){
                           		drawObject(food , foodList[i].x , foodList[i].y, foodObject.width, foodObject.height);
                           	}


                          	for(var i in tileList){
                            	drawObject(tile , tileList[i].x , tileList[i].y , tileObject.width , tileObject.height);
                           	}

                           	//Collisions

                          for(var i in fruitList){
                          	if(foodCatcherCollision(fruitList[i])){
                          		fscore = fscore + 1 ;
								//score = score+3;
                          		fruitList.splice(i,1) ;
                          	}
                          } 	
                         
                          for(var i in foodList){

                           	if(foodCatcherCollision(foodList[i])){
                           		score++ ;
                           		foodList.splice(i,1);
                           	  }
                           	}

                           for(var i in foodList){
                           	for(var j in tileList){
                           		if(foodTileCollision(foodList[i], tileList[j])){
                           			tileList.splice(j,1);
                           		}
                           	 }
                           }
                          
                          if(catcher.onAir == false){
                          	for(var i in tileList){
                          		if(catcherTileCollision(tileList[i])){
                          			catcher.safe = true ;
                          		//	console.log("SAFE");
                          			break;
                          		}

                          		catcher.safe = false;
                          	}

                          	 // To Drop the catcher
                         if(catcher.safe == false){
                         	catcher.y = catcher.y + catcher.gravity;
                         }


                       }

                         fruitTimer++ ;

                         if(score%10 == 0 && score >1){

                         	if(fruitTimer > 30){
                         	  fruitList.push({'x': fruitDrop[Math.round(Math.random()*9)], 'y':0});
                         	  fruitTimer = 0;
                            }

                         	for(var i in fruitList){
                         	drawObject(fruit , fruitList[i].x , fruitList[i].y , 40 , 40 );
                           }
                         }

                         showScore();
                    
                        
	                        if(gameOver){
	                          	gameOverMsg();
	                          }
                          }

                          else{
                          	ctx.clearRect(0 , 0 , 500 , 400);
                          	drawObject(background, 0 ,0 ,500 ,400);
                          	ctx.save();
                         	ctx.globalAlpha = 0.5;
                          	drawObject(pause_button , 140 , 80 , 240 , 200 );
                         	ctx.globalAlpha = 1.0 ;
                          	ctx.strokeStyle = "white";
                          	ctx.font = "27px calibri";
                          	ctx.strokeText("Game is Paused" , 180 , 170 ) ;
                          	ctx.font = "20px calibri";
                          	ctx.strokeText("Click restart button", 180 , 210);
                            ctx.restore();
                          }
	                   }




                           restartGame = function(){
                           	score = 0;
							fscore = 0;
                           	level = 100 ;
                           	blink = 0 ;
                           	catcher.x  = 100;
                           	catcher.y = 280;
                           	catcher.left = false ;
                           	catcher.right = false ;
                           	catcher.onAir = false ;
                           	catcher.safe = true ;
                           	gameOver = false ;
                           	foodTimer = 0;
                           	blinkCounter = 0;
                           	dropFruit = false ;
                           	fruitTimer = 0;
                           	restart = true;
                           	isPause =false ;


                           	foodList = [];
                           	tileList = [];
                           	fruitList = [];
                           	foodDrop = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500] ;
                           	fruitDrop = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500] ;

                           	for(var i=0; i<10 ; i++ ){
                               tileList.push({'x':i*50 , 'y':330});
                           	}

                           	intervalVar = setInterval(updateGame , 40);

                         }

                         restartGameMsg() ;

                         document.getElementById("ctx").onclick = function(){
                        
                            if(restart == false){
                            	restartGame();
                            }
                            
                         }
                           
                     
                        




                          }
  		  				  fruit.src = "fruit.png";	
  		  				}
  		  				 tile.src = "tile.png" ;
  		  			}
  		  			
                    food.src = "food.png";
  		  		}
				  pause_button.src = "pause_button.png";
  		  		play_button.src = "play_button.png" ;
  		  	}     
  		     catcherFour.src = "catcher4.png";
  	    }
  		   catcherThree.src = "catcher3.png";
      }
  		 catcherTwo.src = "catcher2.png";
  	}
  	catcherOne.src = "catcher1.png";
  }

  background.src = "background.jpg" ;