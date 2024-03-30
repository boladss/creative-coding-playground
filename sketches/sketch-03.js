const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 2048, 2048 ],
  animate: true,
};


const sketch = ({ context, width, height }) => {
  const agents = [];
  const count = 100;

  for (let i = 0; i < count; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x,y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
  
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for (let j = i+1; j < agents.length; j++) {
        const other = agents[j];

        // context.beginPath();
        // context.moveTo(agent.position.x, agent.position.y);
        // context.lineTo(other.position.x, other.position.y);
        // context.stroke();
        
        distance = agent.position.getDistance(other.position);
        if (distance < 100) {
          context.lineWidth = math.mapRange(distance, 0, 200, 20, 1);

          context.beginPath();
          context.moveTo(agent.position.x, agent.position.y);
          context.lineTo(other.position.x, other.position.y);
          context.stroke();
        }
      }
    }

    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      // agent.bounce(width,height);
      agent.wrap(width,height);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;

    return Math.sqrt(dx*dx + dy*dy);
  }
}

class Agent {
  constructor(x,y) {
    const vMax = 1;

    this.position = new Vector(x,y);
    this.velocity = new Vector(vMax*random.range(-1,1),vMax*random.range(-1,1));
    // this.radius = random.range(5,15);
    this.radius = 20;
  }

  bounce(width, height) {
    if (this.position.x <= 0 || this.position.x >= width) this.velocity.x *= -1;
    if (this.position.y <= 0 || this.position.y >= height) this.velocity.y *= -1;
  }

  wrap(width, height) {
    if (this.position.x < -5) this.position.x = width+4;
    if (this.position.x > width+5) this.position.x = -4;
    if (this.position.y < -5) this.position.y = height+4;
    if (this.position.y > height+5) this.position.y = -4;
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  draw(context) {
    context.save();
    context.translate(this.position.x, this.position.y);

    // context.fillStyle = 'black';
    context.lineWidth = 2;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI*2);
    context.fill();
    context.stroke();

    context.restore();
  }
}