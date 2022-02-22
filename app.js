const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

function createImage(source){
    const image = new Image();
    image.src = source;
    return image;
}

const batman = createImage('./assets/Character/batman.png')
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
        this.width = 30;
        this.height = 30;
    }
    draw(){
        context.fillStyle = 'red'; // setting rectangle to color red
        context.fillRect(this.position.x, this.position.y, this.width, this.height) //assiging constructor values to rectangle
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

// event listner for when user presses space; object goes up by 5
addEventListener('keydown', ({key})=>{
    if (key == ' '){
        player.speed.y -= 5;            //subtracting player.speed.y by 5 and storing into player.spped.y
        player.speed.x = 0.3;   //starting speed of object
    }
})
// event listner for when user lets go of space; object goes up by 1
addEventListener('keyup', ({key})=>{
    if (key == ' ')
        player.speed.y -= 1;           //subtracting player.speed.y by 1 and storing into player.spped.y
    })

const tubeBottom = createImage('./assets/maps/tube.png');
const tubeTop = createImage('./assets/maps/tubeUpsideDown.png');

//class for tubes
class Tubes{
    constructor({x, y, img}){
        this.position = {
            x,
            y
        }
        this.img = img;
        this.width = img.width;
        this.height = img.height;
    }
    draw(){
        context.drawImage(this.img, this.position.x, this.position.y)
    }
}


const tubes = [new Tubes({x: 300, y: 400, img: tubeBottom})];
tubes.push(new Tubes({x: 300, y: -220, img: tubeTop}))
tubes.push(new Tubes({x: 300*2.5, y: 400, img: tubeBottom}));
tubes.push(new Tubes({x: 300*2.5, y: -180, img: tubeTop}));



// calling player class
const player = new Player();

function animate(){
    requestAnimationFrame(animate);     // recursively calling animate function
    context.clearRect(0,0,canvas.width,canvas.height);   //clears past drawn objects on canvas
    context.drawImage(gothamCity,0,0);         //adding background to canvas
    
    
    //drawing tubes
    tubes.forEach(tube => {
        tube.draw();
    })
    
    player.update();    //calling update function in class Player
}
animate();
