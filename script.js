// Setup canvas
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const frameRate = 1000 / 60;
let timer = 0;
let speed = 4;
let obstacleSpeed = 2;
let score = 0;
let collisionCount = 0;

function resizeCanvas() {
    const container = document.querySelector('.game-container');
    const containerStyles = getComputedStyle(container);
    const padding = parseFloat(containerStyles.padding) || 0;
    
    const containerWidth = container.clientWidth - padding * 2;
    const containerHeight = container.clientHeight - padding * 2;
    
    const targetHeight = Math.min(900, containerHeight);
    const targetWidth = targetHeight * (2/3);
    
    canvas.width = Math.min(600, targetWidth);
    canvas.height = targetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Paddle class
class Paddle {
    constructor() {
        this.height = 10;
        this.width = Math.min(100, canvas.width * 0.25);
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 10;
        this.moveLeft = false;
        this.moveRight = false;
    }

    changePosition() {
        if (this.moveLeft && this.x > 0) {
            this.x -= 5;
        }
        if (this.moveRight && this.x < canvas.width - this.width) {
            this.x += 5;
        }
    }

    draw() {
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    updatePositionOnResize() {
        // Recalculate position to maintain relative placement on resize
        this.x = Math.min(this.x, canvas.width - this.width);
        this.y = canvas.height - this.height - 10;
    }
}

const paddle = new Paddle();

// Rendering canvas
function renderCanvas() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Fill the background
    context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the paddle
    paddle.draw();
}

// Set up event listeners for paddle movement
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'Left') {
        paddle.moveLeft = true;
    } else if (event.key === 'ArrowRight' || event.key === 'Right') {
        paddle.moveRight = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'Left') {
        paddle.moveLeft = false;
    } else if (event.key === 'ArrowRight' || event.key === 'Right') {
        paddle.moveRight = false;
    }
});

// Update paddle position on canvas resize
window.addEventListener('resize', () => {
    resizeCanvas();
    paddle.updatePositionOnResize();
});

// Animation loop
function animate() {
    renderCanvas();
    paddle.changePosition();
    requestAnimationFrame(animate);
}

// Start the game
animate();
