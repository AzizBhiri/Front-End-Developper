function mouseTracker(){
const canvas = document.getElementById('clouds');
const ctx = canvas.getContext('2d');
ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;

let particleArray = [];
const colors = ['#ffffff', '#28b9ad', '#000000'];

const maxSize = 40;
const minSize = 0;
const radius = 60;

let mouse = {
    x: null, y: null
};

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

function Particle(x, y, directionX, directionY, size, color){
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
}

Particle.prototype.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
}

Particle.prototype.update = function(){
    if(this.x + this.size * 2 > canvas.width || this.x - this.size * 2 < 0){
        this.directionX = -this.directionX;
    }
    if (this.y + this.size * 2 > canvas.height || this.y - this.size * 2 < 0) {
        this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;

    //mouse innteractivity
    if (mouse.x - this.x < radius && mouse.x - this.x > -radius 
        && mouse.y - this.y < radius && mouse.y - this.y > -radius){
            if(this.size < maxSize){
                this.size += 2;
            }

    } else if (this.size > minSize) {
        this.size -= 0.2;
    }
    if(this.size < 0){
        this.size = 0;
    }
    this.draw();
}

function init(){
    particleArray = [];
    for(let i = 0; i < 500; i++){
        let size = 0;
        let x = (Math.random() * ((innerWidth - size * 2) - size * 2)) + size * 2;
        let y = (Math.random() * ((innerHeight - size * 2) - size * 2)) + size * 2;
        let directionX = (Math.random() * 0.2 - 0.1);
        let directionY = (Math.random() * 0.2 - 0.1);
        let color = colors[Math.floor(Math.random()* colors.length)];
        particleArray.push(new Particle(x, y, directionX, directionY, size, color)); 
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
}

init();
animate();

window.addEventListener('resize', function(){
    canvas.height = innerHeight;
    canvas.width = innerWidth;
})

setInterval(function(){
    mouse.x = undefined;
    mouse.y = undefined;
}, 0);
}

mouseTracker();


