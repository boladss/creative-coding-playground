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
    context.fillStyle = 'black';

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

function degToRad(n: number) {
  return n * Math.PI / 180;
}

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Main
export default function initArcs(context: CanvasRenderingContext2D, width: number, height: number): void {
  const segments1: Segment[] = [];
  const segments2: Segment[] = [];
  const count = 50;

  const cx = width * 0.5;
  const cy = height * 0.5;
  const center = new Vector(cx, cy);

  const w = width * 0.01;
  const h = height * 2;
  const radius = width * 0.25;

  const generateSegments = (segments: Segment[], flag: boolean) => {
    for (let i = 0; i < count; i++) {
      const slice = degToRad(360/count);
      const angle = slice * i;
  
      const position = getPosition(center, radius, angle);
  
      // let wScaled = w * getRandom(0.1, 1);
      let wScaled = w*0.25;

      let speed = flag ? 0.005 : -0.005;

      segments.push(new Segment(position, speed, angle, wScaled, h, i));
    }
  };

  generateSegments(segments1, true);
  generateSegments(segments2, false);

  const animate = () => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
  
    segments1.forEach(segment => {
      segment.update(center, radius);
      segment.draw(context);
    })

    segments2.forEach(segment => {
      segment.update(center, radius);
      segment.draw(context);
    })
  
    let fps = 60;
    let fpsInterval = 1000/fps;
  
    setTimeout(() => {
      window.requestAnimationFrame(animate);
    }, fpsInterval);
  };

  animate();
}