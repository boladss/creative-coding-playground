import { colorA, colorB } from "./script";
import { getRandomInt } from "./helper";

// Classes
class Vector {
  constructor(
    public x: number,
    public y: number
  ) {}

  getDistance(other: Vector): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx*dx + dy*dy);
  }
}

class Agent {
  constructor(
    public position: Vector,
    private velocity: Vector,
    private radius: number,
    private label: number,
  ) {}

  static default(width: number, height: number, radius?: number): Agent {
    const vMax = 1;
    if (radius == null) radius = 10;

    const position = new Vector(getRandomInt(0, width), getRandomInt(0, height));
    const velocity = new Vector(vMax*getRandomInt(-1,1), vMax*getRandomInt(-1,1));

    return new Agent(position, velocity, radius, 0);
  }

  wrap(width: number, height: number): void {
    if (this.position.x < -5) this.position.x = width+4;
    if (this.position.x > width+5) this.position.x = -4;
    if (this.position.y < -5) this.position.y = height+4;
    if (this.position.y > height+5) this.position.y = -4;
  }

  update(): void {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  draw(context: CanvasRenderingContext2D): void {
    context.save();
    context.translate(this.position.x, this.position.y);

    context.fillStyle = colorB;
    context.strokeStyle = colorA;
    context.lineWidth = 1;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI*2);
    context.fill();
    context.stroke();

    context.restore();
  }
}

// Helper functions

function mapRange(value: number, inputMin: number, inputMax: number, outputMin: number, outputMax: number, clamp?: boolean): number {
  // Reference:
  // https://github.com/mattdesl/canvas-sketch-util/blob/master/math.js
  // https://openframeworks.cc/documentation/math/ofMath/
  if (Math.abs(inputMin - inputMax) < Number.EPSILON) {
    return outputMin;
  } else {
    var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
    if (clamp) {
      if (outputMax < outputMin) {
        if (outVal < outputMax) outVal = outputMax;
        else if (outVal > outputMin) outVal = outputMin;
      } else {
        if (outVal > outputMax) outVal = outputMax;
        else if (outVal < outputMin) outVal = outputMin;
      }
    }
    return outVal;
  }
}

// Main
export default function initNodes(context: CanvasRenderingContext2D, width: number, height: number): void {
  // console.log("nodes.ts");
  const agents: Agent[] = [];
  const radius = 8;
  const count = 50;
  const connectDistance = 75;
  const maxThickness = 10;
  const minThickness = 0.1;

  for (let i = 0; i < count; i++) {
    // Initialize
    agents.push(Agent.default(width, height, radius))
  }

  const animate = () => {
    // Canvas background
    context.fillStyle = colorB;
    context.fillRect(0, 0, width, height);

    // Update agents
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for (let j = i+1; j < agents.length; j++) {
        const other = agents[j];

        // context.beginPath();
        // context.moveTo(agent.position.x, agent.position.y);
        // context.lineTo(other.position.x, other.position.y);
        // context.stroke();
        
        const distance = agent.position.getDistance(other.position);

        if (distance < connectDistance) {
          context.lineWidth = mapRange(distance, 0, connectDistance, maxThickness, minThickness);

          context.beginPath();
          context.strokeStyle = colorA;
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

    // Frame settings
    const fps = 60;
    const fpsInterval = 1000/fps;

    setTimeout(() => {
      window.requestAnimationFrame(animate);
    }, fpsInterval);
  };

  animate();
}