
    const canvas=document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

const scale=20;
const rows = canvas.height / scale ;
const columns = canvas.width / scale ; 
let score=0;

let snake=[];
snake[0]={
    x:(Math.floor(Math.random()*columns))*scale,
    y:(Math.floor(Math.random()*rows))*scale
}
let food={
    x:(Math.floor(Math.random()*columns))*scale,
    y:(Math.floor(Math.random()*rows))*scale
}
let d="right";
document.onkeydown = direction;
function direction(event){
    let key = event.keyCode;
    if (key==13){
        NewGame();
        
    }
    else if (key == 32){
        PauseClick();
        
    }
    
     if( key == 37 && d != "right"){
        d = "left";
    }else if(key == 38 && d != "down"){
        d = "up";
    }else if(key == 39 && d != "left"){
        d = "right";
    }else if(key == 40 && d != "up"){
        d = "down";
    }


  }
 

let playGame=setInterval(draw,100);
clearInterval(playGame)
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0; i < snake.length; i++ ){
        ctx.fillStyle="#fff";
    ctx.strokeStyle="red";
    ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
    ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
    }
    ctx.fillStyle="red";
    ctx.strokeStyle="#fff";
    ctx.fillRect(food.x, food.y, scale, scale);
    ctx.strokeRect(food.x, food.y, scale, scale);
    
    


    let snakeX=snake[0].x;
    let snakeY=snake[0].y;
    
    if(d=="left"){
        snakeX -= scale;
    }
    if(d=="up"){
        snakeY -= scale;
    }
    if(d=="right"){
        snakeX += scale;
    }
    if(d=="down"){
        snakeY += scale;
    }
    
   
    function HardEasy(){
        let hard=document.getElementById("radioHard");
    let easy=document.getElementById("radioEasy");
        if (hard.checked && hard.value == "hard") {
           
            document.getElementById("radioHard").className="d-none";
            document.getElementById("radioEasy").className="d-none";
            document.getElementById("LabelHard").className="d-none";
            document.getElementById("LabelEasy").className="d-none";
            if (snakeX >= canvas.width){

                document.getElementById("GameOver").innerHTML=`
                <button class="btn btn-outline-danger "><h1  class="fs-1 ">GAME OVER😞😞😞</h1></button>
                `;
                document.getElementById("GameOver").style.display="block"
                clearInterval(playGame);
                document.getElementById("Pause").style.display="none"
                document.getElementById("radioHard").className="d-inline";
            document.getElementById("radioEasy").className="d-inline";
            document.getElementById("LabelHard").className="d-inline";
            document.getElementById("LabelEasy").className="d-inline";
               
                
            }
            if (snakeX < -20 ){
                document.getElementById("GameOver").innerHTML=`
                <button class="btn btn-outline-danger "><h1  class="fs-1 ">GAME OVER😞😞😞</h1></button>
                `;
                document.getElementById("GameOver").style.display="block"
                clearInterval(playGame);
                document.getElementById("Pause").style.display="none"
                document.getElementById("radioHard").className="d-inline";
            document.getElementById("radioEasy").className="d-inline";
            document.getElementById("LabelHard").className="d-inline";
            document.getElementById("LabelEasy").className="d-inline";
        
            }
            if(snakeY >= canvas.height){
                document.getElementById("GameOver").innerHTML=`
                <button class="btn btn-outline-danger "><h1  class="fs-1 ">GAME OVER😞😞😞</h1></button>
                `;
                document.getElementById("GameOver").style.display="block"
                clearInterval(playGame);
                document.getElementById("Pause").style.display="none"
                document.getElementById("radioHard").className="d-inline";
            document.getElementById("radioEasy").className="d-inline";
            document.getElementById("LabelHard").className="d-inline";
            document.getElementById("LabelEasy").className="d-inline";
            } 
            if (snakeY <= -20) {

                document.getElementById("GameOver").innerHTML=`
                <button class="btn btn-outline-danger "><h1  class="fs-1 ">GAME OVER😞😞😞</h1></button>
                `;
                document.getElementById("GameOver").style.display="block"
                clearInterval(playGame);
                document.getElementById("Pause").style.display="none"
                document.getElementById("radioHard").className="d-inline";
            document.getElementById("radioEasy").className="d-inline";
            document.getElementById("LabelHard").className="d-inline";
            document.getElementById("LabelEasy").className="d-inline";
                
            }
        } 
         else if(easy.checked && easy.value == "easy"){
            document.getElementById("radioHard").className="d-none";
            document.getElementById("radioEasy").className="d-none";
            document.getElementById("LabelHard").className="d-none";
            document.getElementById("LabelEasy").className="d-none";
            if (snakeX > canvas.width) {
                
                snakeX = 0;
              }
              if (snakeY > canvas.height) {
                
                snakeY = 0;
              }
              if (snakeX < 0) {
                
                snakeX = canvas.width;
              }
              if (snakeY < 0) {
                

                snakeY = canvas.height;
              }
        } else {
            document.getElementById("radioHard").className="d-none";
            document.getElementById("radioEasy").className="d-none";
            document.getElementById("LabelHard").className="d-none";
            document.getElementById("LabelEasy").className="d-none";
            if (snakeX > canvas.width) {
                snakeX = 0;
              }
              if (snakeY > canvas.height) {
                snakeY = 0;
              }
              if (snakeX < 0) {
                snakeX = canvas.width;
              }
              if (snakeY < 0) {
                snakeY = canvas.height;
              }
        }
    }
    HardEasy();
    
    if (snakeX == food.x && snakeY == food.y) {
        score++
        food={
            x:(Math.floor(Math.random()*columns))*scale,
            y:(Math.floor(Math.random()*rows))*scale
        }
        document.getElementById("score").innerHTML=score;
        
    } else{
        snake.pop()
    }
    


    let newHead={
        x:snakeX,
        y:snakeY
    }
   
    if (eatSelf(newHead,snake)) {
        document.getElementById("GameOver").innerHTML=`
        <button class="btn btn-outline-danger "><h1  class="fs-1 ">GAME OVER😞😞😞</h1></button>
        `;
        document.getElementById("GameOver").style.display="block"
        clearInterval(playGame);
        document.getElementById("Pause").style.display="none"
        document.getElementById("radioHard").className="d-inline";
        document.getElementById("radioEasy").className="d-inline";
        document.getElementById("LabelHard").className="d-inline";
        document.getElementById("LabelEasy").className="d-inline";
        
        

    }
    
   
 
   
    snake.unshift(newHead);
    function eatSelf(head,array) {
        for(let i=0; i<array.length; i++){
            if (head.x==array[i].x && head.y==array[i].y) {
                return true;
                
            }
        }
        return false;
        
    }


}
    

function NewGame(){
  
    
    clearInterval(playGame);
    playGame=setInterval(draw,100);
    d="right"
    ctx.clearRect(0,0,canvas.width,canvas.height);
    document.getElementById("score").innerHTML=score=0;
document.getElementById("GameOver").style.display="none";
    snake=[];
snake[0]={
    x:(Math.floor(Math.random()*columns))*scale,
    y:(Math.floor(Math.random()*rows))*scale
}
 food={
    x:(Math.floor(Math.random()*columns))*scale,
    y:(Math.floor(Math.random()*rows))*scale
}



document.getElementById("Pause").style.display="inline";



   


}


function PauseClick(){
    let Pause = document.getElementById("Pause");
    
   if (Pause.value=="Pause") {
    clearInterval(playGame);
    Pause.className="btn btn-primary bi bi-play"
    Pause.innerHTML="Resume"
    Pause.value="Resume"
    
   } else {
    clearInterval(playGame);
     playGame=setInterval(draw,100);
    Pause.className="btn btn-warning bi bi-pause"
    Pause.innerHTML="Pause"
    Pause.value="Pause"
   }

   
    
    
}
function LevelClick(){
    document.getElementById("radioHard").className="d-inline";
        document.getElementById("radioEasy").className="d-inline";
        document.getElementById("LabelHard").className="d-inline";
        document.getElementById("LabelEasy").className="d-inline";
}


