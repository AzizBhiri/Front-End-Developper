function floatingText(){
const canvas = document.getElementById('bits');
const ctx = canvas.getContext('2d');
ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;

let particleArray = [];
const words = ['HTML', 'CSS', 'javaScript', 'C', 'C++', 'HTML', 'CSS', 'javaScript', 'C', 'C++', 'Python', 'Java', 'R', 'C#', 'PHP', 'SQL'];
const colors = ['#ffffff'];

function Particle(x, y, directionX, directionY, size, color, elt) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
    this.elt = elt;
}

Particle.prototype.draw = function () {
    font = this.size + 'px Courier New';
    ctx.beginPath();
    ctx.font = font;
    ctx.fillStyle = this.color;
    ctx.fillText(this.elt, this.x, this.y);
}

Particle.prototype.update = function () {
    if (this.x + this.size * 2 > canvas.width || this.x - this.size * 2 < 0) {
        this.directionX = -this.directionX;
    }
    if (this.y + this.size * 2 > canvas.height || this.y - this.size * 2 < 0) {
        this.directionY = -this.directionY;
    }

    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
}

function init() {
    particleArray = [];
    for (let i = 0; i < 40; i++) {
        let size = Math.random() * 40;
        let x = (Math.random() * (innerWidth - size * 2));
        let y = (Math.random() * (innerHeight - size * 2));
        let directionX = (Math.random() - 0.5) * 2;
        let directionY = (Math.random() - 0.5) * 2;
        let color = colors[Math.floor(Math.random() * colors.length)];
        let elt = words[Math.floor(Math.random() * words.length)];
        particleArray.push(new Particle(x, y, directionX, directionY, size, color, elt));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
}

init();
animate();

window.addEventListener('resize', function () {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
})
}

floatingText();