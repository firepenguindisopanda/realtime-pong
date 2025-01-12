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
    constructor(isTopPaddle=false) {
        this.height = 10;
        this.width = Math.min(100, canvas.width * 0.25);
        this.x = canvas.width / 2 - this.width / 2;
        this.isTopPaddle = isTopPaddle;
        if (isTopPaddle) {
            this.y = 10;
        } else {
            this.y = canvas.height - this.height - 10;
        }
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
        context.fillStyle = this.isTopPaddle ? 'blue' : 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    updatePositionOnResize() {
        // Recalculate position to maintain relative placement on resize
        this.x = Math.min(this.x, canvas.width - this.width);
        if (this.isTopPaddle) {
            this.y = 10;
        } else {
            this.y = canvas.height - this.height - 10;
        }
    }
}

const bottomPaddle = new Paddle(false);
const topPaddle = new Paddle(true);

// Rendering canvas
function renderCanvas() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Fill the background
    context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the paddle
    bottomPaddle.draw();
    topPaddle.draw();
}

// Set up event listeners for paddle movement
document.addEventListener('keydown', (event) => {
    switch(event.key.toLowerCase()) {
        // Bottom paddle controls (Arrow keys)
        case 'arrowleft':
        case 'left':
            bottomPaddle.moveLeft = true;
            break;
        case 'arrowright':
        case 'right':
            bottomPaddle.moveRight = true;
            break;
            
        // Top paddle controls (WASD)
        case 'a':
            topPaddle.moveLeft = true;
            break;
        case 'd':
            topPaddle.moveRight = true;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch(event.key.toLowerCase()) {
        // Bottom paddle controls (Arrow keys)
        case 'arrowleft':
        case 'left':
            bottomPaddle.moveLeft = false;
            break;
        case 'arrowright':
        case 'right':
            bottomPaddle.moveRight = false;
            break;
            
        // Top paddle controls (WASD)
        case 'a':
            topPaddle.moveLeft = false;
            break;
        case 'd':
            topPaddle.moveRight = false;
            break;
    }
});

// Update paddle positions on canvas resize
window.addEventListener('resize', () => {
    resizeCanvas();
    bottomPaddle.updatePositionOnResize();
    topPaddle.updatePositionOnResize();
});

// Animation loop
function animate() {
    renderCanvas();
    bottomPaddle.changePosition();
    topPaddle.changePosition();
    requestAnimationFrame(animate);
}

// Start the game
animate();
