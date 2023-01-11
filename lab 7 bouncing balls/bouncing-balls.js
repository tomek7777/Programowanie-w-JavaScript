const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let playerBall;

let beta;
let gamma;



class Ball{
    constructor(x, y, velx, vely, size, color){
        this.x = x; //horizontal position of ball
        this.y = y; //vertical position of ball
        this.velx = velx; // predkosc x 
        this.vely = vely; // predkosc y
        this.size = size; // promień piłki
        this.color = color; // wypełnia piłke kolorem

    }

    // funckja rysowania
    drawBall(){
        ctx.beginPath(); 
        ctx.fillStyle = this.color; // wypełnia piłke kolorem

        // x i y to środek piłki
        // rozmiar promienia pilki
        // 0 to punkt początkowy stopnia wokół piłki
        // 2 * Math.PI to punkt końcowy, który odpowiada 360 stopniom
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill(); // koniec rysowania

    }

    updateBall(){

        // jeśli pozycja x i y jest większa lub mniejsza
        // niż rzutnia przeglądarki, kulki obracają się w innym kierunku

        if (this.x + this.velx >= width || this.x + this.velx <= 0) {
            this.velx = 0;
        }
        if (this.y + this.vely >= height || this.y + this.vely <= 0) {
            this.vely = 0;
        }

        // Prędkość x i y jest dodawana do współrzędnych x i y za każdym razem
        // gdy wywoływana jest funkcja updateBall
        this.x += this.velx;
        this.y += this.vely;
    }
}

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}


let balls = [];

function createBallsHole() {
    while(balls.length < 20) {
        let size = random(10, 20)    
        
        const ball = new Ball(
        random(size, width - size),
        random(size, height - size),
        random(-5, 5),
        random(-5, 5),
        size,
        `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
        );
        

    
        balls.push(ball); 
    }
}

function createPlayerBall() {
    const radius = 20;

    playerBall = new Ball (
        random(radius, width - radius),
        random(radius, height - radius),
        1,
        0,
        radius,
        `red`,
      
    );
    
    console.log(playerBall);
}

window.addEventListener("deviceorientation", ballSpeed);

function loop() {
    
    ctx.fillStyle = 'yellow';
    ctx.fillRect(0, 0, width, height);

    playerBall.drawBall();
    playerBall.updateBall();

    for(let i = 0; i < balls.length; i++){
        balls[i].drawBall();        
        
    }


    balls = balls.filter((ball) => {
        return (
          Math.hypot(playerBall.x - ball.x, playerBall.y - ball.y) >=
          playerBall.size + ball.size
        );
    });

    requestAnimationFrame(loop);


}

function ballSpeed(event) {
    beta = event.beta / 20;
    gamma = event.gamma / 20;
    playerBall.velx = gamma;
    playerBall.vely = beta;
}

createBallsHole();
createPlayerBall();
loop();