const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d');

function createImage(source){
    const image = new Image();
    image.src = source;
    return image;
}

const batman = createImage('./assets/Character/batman.png')
const gothamCity = createImage('./assets/maps/gothamcity.jpg');


gothamCity.onload = function(){
    context.drawImage(gothamCity,0,0);
}

class Player{
    constructor(){
        this.position = {
            x: 100,
            y: 340
        }
        this.speed = {
            x: 0,
            y: 0
        }
        this.width = 30;
        this.height = 30;
    }
    draw(){
        context.fillStyle = 'red'; 
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update(){
        this.draw()
        this.position.y += this.speed.y;
        this.position.x += this.speed.x;
        
        if(this.position.y + this.height + this.speed.y  <= canvas.height)
            this.speed.y += gravity;
        else
            this.speed.y = 0;
    }
}

const player = new Player();

function animate(){
    requestAnimationFrame(animate);

    player.update();
}

animate();