// Classes
class Vector {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x,y) {
    this.position = new Vector(x,y);
  }

  update() {}
  draw(context) {}
}

// Helper Functions

// Main
function init({ context, width, height }) {
  // Initialization
  
  const animate = () => {
    // Canvas background
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // Update agents

    // Frame settings
    let fps = 60;
    let fpsInterval = 1000/fps;

    setTimeout(() => {
      window.requestAnimationFrame(animate);
    }, fpsInterval);
  };

  animate();
}

// Initialize Canvas
let canvas = document.getElementById("canvas");
let context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

init({ context, width, height });