const canvas = document.querySelector('canvas');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext('2d');

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
        if(this.x + this.size >= width || this.x - this.size <= 0){
            this.velx = - this.velx;
        }

        if(this.y + this.size <= height || this.y - this.size <= 0){
            this.vely = - this.vely;
        }

        // Prędkość x i y jest dodawana do współrzędnych x i y za każdym razem
        // gdy wywoływana jest funkcja updateBall
        this.x += this.velx;
        this.y += this.vely;
    }
}

// tworzenie pilek i przechowywanie w tablicy
const balls = [];

while(balls.length < 25) {
    
    const ball = new Ball(50, 100, 5, 5, 20, 'rgb(0, 255, 0)');
    balls.push(ball);
} 

// petla
function loop() {

    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for(let i = 0; i < balls.length; i++){
        balls[i].drawBall();
        balls[i].updateBall();
    }
    requestAnimationFrame(loop);
}

loop();