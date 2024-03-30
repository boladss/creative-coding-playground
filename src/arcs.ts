import { colorA, colorB } from "./script"
import { degToRad } from "./helper";
// import { getRandomInt, degToRad } from "./helper";

// Classes
class Vector {
  constructor(
    public x: number,
    public y: number
  ) {}
}

class Segment {
  constructor(
    public position: Vector,
    private speed: number,
    private angle: number,
    private width: number,
    private height: number,
    private label: number,
  ) {}

  update(center: Vector, radius: number): void {
    this.angle += this.speed;
    // this.position = getPosition(center, radius, this.angle);
    // if (this.label === 50) console.log(this.label, this.position.x, this.position.y, this.angle);
  }

  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = colorA;

    // if (this.label === 50) context.fillStyle = 'red';
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(-this.angle);

    context.beginPath();
    context.rect(-this.width*0.5, -this.height*0.5, this.width, this.height);
    context.fill();
    context.restore();
  }
}

// Helper functions
function getPosition(center: Vector, radius: number, angle: number): Vector {
  const x = center.x + radius * Math.sin(angle);
  const y = center.y + radius * Math.cos(angle);

  return new Vector(x, y);
}

// Main
export default function initArcs(context: CanvasRenderingContext2D, width: number, height: number): void {
  const segments1: Segment[] = [];
  const segments2: Segment[] = [];
  const count = 75;
  const speed = 0.005;
  const flag = true;

  const center = new Vector(width*0.5, width*0.5);

  const w = 5;
  const h = height * 2;
  const radius = width * 0.25;

  const generateSegments = (segments: Segment[], direction: number) => {
    for (let i = 0; i < count; i++) {
      const slice = degToRad(360/count);
      const angle = slice * i;
  
      const position = getPosition(center, radius, angle);
  
      // const wScaled = w * getRandom(0.1, 1);
      const wScaled = w*0.25;

      const velocity = direction * speed;

      segments.push(new Segment(position, velocity, angle, wScaled, h, i));
    }
  };

  generateSegments(segments1, 1);
  if (flag) generateSegments(segments2, -1);

  const animate = () => {
    context.fillStyle = colorB;
    context.fillRect(0, 0, width, height);
  
    segments1.forEach(segment => {
      segment.update(center, radius);
      segment.draw(context);
    })

    if (flag) segments2.forEach(segment => {
      segment.update(center, radius);
      segment.draw(context);
    })
  
    const fps = 60;
    const fpsInterval = 1000/fps;
  
    setTimeout(() => {
      window.requestAnimationFrame(animate);
    }, fpsInterval);
  };

  animate();
}