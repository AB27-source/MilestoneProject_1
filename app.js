const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

function createImage(source){
    const image = new Image();
    image.src = source;
    return image;
}

const batMobile = createImage('./assets/Character/batmobile.png')
const gothamCity = createImage('./assets/maps/gothamcity.jpg');

// gothamCity.onload = function(){
//     backgroundContext.drawImage(gothamCity,0,0);
// }

const gravity = 0.1;

class Player{
    constructor(){
        // Position of character on canvas
        this.position = {
            x: 100,
            y: 340
        }
        // Speed 
        this.speed = {
            x: 0,
            y: 2
        }
        this.image = batMobile;
        this.width = batMobile.width;
        this.height = batMobile.height-5;
    }
    draw(){
        context.drawImage(this.image, this.position.x, this.position.y)
    }
    // updates player position
    update(){
        this.draw() //calling draw function above
        // Referenced from W3 Schools Game Gravity
        this.position.x += this.speed.x;    //updating position.x, position.x = position.x + speed.x
        this.position.y += this.speed.y;    //updating position.y, position.y = position.y + speed.y
        
        // conditional that stops character at the bottom of the canvas
        if(this.position.y + this.height + this.speed.y  <= canvas.height)
            this.speed.y += gravity;

        else
            this.speed.y = 0;
        

    }
}

var keyPressed = false;


// event listner for when user presses space; object goes up by 5
addEventListener('keydown', ({key})=>{
    if (key == ' '){
        player.speed.y -= 4;            //subtracting player.speed.y by 5 and storing into player.spped.y
    }
    if (key == 'd'){
        keyPressed = true;
    }
})
// event listner for when user lets go of space; object goes up by 1
addEventListener('keyup', ({key})=>{
    if (key == ' '){
        player.speed.y -= 1;           //subtracting player.speed.y by 1 and storing into player.spped.y
    }
    if (key == 'd'){
        player.speed.x = 0;            //player speed set to 0 when user lets go of keypress
        keyPressed = false;
    }
    })

const tubeBottom = createImage('./assets/maps/tube.png');
const tubeTop = createImage('./assets/maps/tubeUpsideDown.png');
const batSignal = createImage('./assets/maps/batSignal.png')
//class for tubes
class Tubes{
    constructor({x, y, img}){
        this.position = {
            x,
            y
        }
        this.img = img;
        this.width = img.width;
        this.height = img.height-20;
    }
    draw(){
        context.drawImage(this.img, this.position.x, this.position.y)
    }
}
class WinBeacon{
    constructor({x, y, img}){
        this.position = {
            x,
            y
        }
        this.img = img;
        this.width = img.width;
        this.height = img.height-20;
    }
    draw(){
        context.drawImage(this.img, this.position.x, this.position.y)
    }
}

// Creating tubes
const tubes = [new Tubes({x: 300, y: 400, img: tubeBottom})];
tubes.push(new Tubes({x: 300, y: -220, img: tubeTop}))
tubes.push(new Tubes({x: 300*2, y: 400, img: tubeBottom}));
tubes.push(new Tubes({x: 300*2, y: -180, img: tubeTop}));
tubes.push(new Tubes({x: 300*3, y: 340, img: tubeBottom}));
tubes.push(new Tubes({x: 300*3, y: -240, img: tubeTop}));
tubes.push(new Tubes({x: 300*4, y: 440, img: tubeBottom}));
tubes.push(new Tubes({x: 300*4, y: -170, img: tubeTop}));
tubes.push(new Tubes({x: 300*5, y: 440, img: tubeBottom}));
tubes.push(new Tubes({x: 300*5, y: -170, img: tubeTop}));
tubes.push(new Tubes({x: 300*6, y: 490, img: tubeBottom}));
tubes.push(new Tubes({x: 300*6, y: -110, img: tubeTop}));
tubes.push(new Tubes({x: 300*7, y: 510, img: tubeBottom}));
tubes.push(new Tubes({x: 300*7, y: -90, img: tubeTop}));
tubes.push(new Tubes({x: 300*8, y: 400, img: tubeBottom}));
tubes.push(new Tubes({x: 300*8, y: -180, img: tubeTop}));
tubes.push(new Tubes({x: 300*9, y: 470, img: tubeBottom}));
tubes.push(new Tubes({x: 300*9, y: -120, img: tubeTop}));
tubes.push(new Tubes({x: 300*10, y: 500, img: tubeBottom}));
tubes.push(new Tubes({x: 300*10, y: -100, img: tubeTop}));
tubes.push(new Tubes({x: 300*11.2, y: 500, img: tubeBottom}));

const winBeacon = new WinBeacon({x: 300*11.25, y: 210, img: batSignal});



// calling player class
const player = new Player();

var score = 0;
var highScore = localStorage.getItem("highScore");

function drawHighScore() {
    context.font = "20px Retro Game Font"
    context.fillStyle = "white";
    context.fillText("High Score: "+ highScore, 790, 30);
}
function drawScore() {
    context.font = "30px Retro Game Font"
    context.fillStyle = "white";
    context.fillText("Score: "+ score, 430, 60);
}
function drawLossMessage() {
    context.font = "80px Retro Game Font"
    context.fillStyle = "Red";
    context.fillText("You Lose!", 300, 300);
}
function drawWinMessage() {
    context.font = "80px Retro Game Font"
    context.fillStyle = "Blue";
    context.fillText("You Win!", 300, 300);
}


function animate(){
    requestAnimationFrame(animate);     // recursively calling animate function
    context.clearRect(0,0,canvas.width,canvas.height);   //clears past drawn objects on canvas
    context.drawImage(gothamCity,0,0);         //adding background to canvas
    
    player.update();    //calling update function in class Player

    //drawing tubes
    tubes.forEach(tube => {
        tube.draw();
    })
    // Once user reaches end, set player speed = 0;
    // tubes.forEach(tube => {
    //     if(tube.position.x == 165){
    //         drawWinMessage()
    //         player.speed.x = 0;
    //         player.speed.y = 0;
    //         keyPressed = false;
    //     }
    // })
    winBeacon.draw();
    if(winBeacon.position.x == 135){
        drawWinMessage()
        player.speed.x = 0;
        player.speed.y = 0;
        keyPressed = false;
    }

    if (keyPressed == true && player.position.x < 180){
        player.speed.x = 1;   //starting speed of object
    }
    else{
        player.speed.x = 0;
        if (keyPressed == true){
            score++;
            if(highScore !== null){
                if (score > highScore) {
                    localStorage.setItem("highScore", score);
                }
            }
            else{
                localStorage.setItem("highScore", score);
            }
            
            tubes.forEach(tube => {
                tube.position.x -= 2;
            })
            winBeacon.position.x -= 2;
        }
    }
    //collision detection refrenced mdn "2d collision detection";
    tubes.forEach(tube => {
        if (tube.position.x < player.position.x + player.width &&
        tube.position.x + tube.width > player.position.x &&
        tube.position.y < player.position.y + player.height &&
        tube.height + tube.position.y > player.position.y) {
            drawLossMessage();
            player.speed.y = 0;
            player.speed.x = 0;
            keyPressed = false;
        }
    })
    drawScore();
    drawHighScore();
}

animate();
