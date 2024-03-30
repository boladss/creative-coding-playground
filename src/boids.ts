import { getRandomInt } from "./helper"
import { colorA, colorB } from "./script"

// Classes
class Vector {
  constructor(
    public x: number,
    public y: number
  ) {}

  add(vec: Vector): void {
    this.x += vec.x;
    this.y += vec.y;
  }

  sub(vec: Vector): void {
    this.x -= vec.x;
    this.y -= vec.y;
  }

  mul(k: number): void {
    this.x *= k;
    this.y *= k;
  }

  div(k: number): void {
    this.x /= k;
    this.y /= k;
  }

  limit(max: number): void {
    if (this.x >= max) this.x = max;
    if (this.x <= -max) this.x = -max;
    if (this.y >= max) this.y = max
    if (this.y <= -max) this.y = -max
  }

  getDistance(other: Vector): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx*dx + dy*dy);
  }
}

class Boid {
  private radius: number;

  constructor(
    public position: Vector,
    private velocity: Vector,
    private acceleration: Vector,
    private label: number,
  ) {this.radius = 5;}

  static default(width: number, height: number, label?: number): Boid {
    const position = new Vector(getRandomInt(0, width), getRandomInt(0, height));
    const velocity = new Vector(getRandomInt(-1, 1), getRandomInt(-1, 1));
    const acceleration = new Vector(0, 0);
    if (label == null) label = 0;

    return new Boid(position, velocity, acceleration, label);
  }
  
  getNeighboids(boids: Boid[], radius: number): Boid[] {
    const neighboids: Boid[] = [];
    for (const boid of boids) {
      if (this.position.getDistance(boid.position) < radius) neighboids.push(boid);
    }
    return neighboids;
  }
  
  checkVisible(distance: number): boolean {
    return distance <= 100;
  }

  tooClose(distance: number): boolean {
    return distance <= 20;
  }

  alignment(neighboids: Boid[]): Vector {
    let target: Vector = new Vector(0,0);
    
    if (neighboids.length > 0) {
      for (const boid of neighboids) {
        // if (this.position.x === boid.position.x && this.position.y === boid.position.y) continue;
        target.add(boid.velocity);
      }
      target.div(neighboids.length);
      target.sub(this.velocity);
      target.mul(0.1);
    }
    return target;
  }

  cohesion(neighboids: Boid[]): Vector {
    let target: Vector = new Vector(0,0);
    if (neighboids.length > 0) {
      for (const boid of neighboids) {
        // if (this.position.x === boid.position.x && this.position.y === boid.position.y) continue;
        target.add(boid.position);
      }
      target.div(neighboids.length);
      target.sub(this.position);
      target.mul(0.01);
    }
    return target;
  }

  separation(neighboids: Boid[]): Vector {
    let target: Vector = new Vector(0,0);
    if (neighboids.length > 0) {
      for (const boid of neighboids) {
        // if (this.position.x === boid.position.x && this.position.y === boid.position.y) continue;
        const temp: Vector = new Vector(0,0);
        temp.add(this.position);
        temp.sub(boid.position);

        const distance: number = this.position.getDistance(boid.position)
        if (distance !== 0) temp.div(distance);

        target.add(temp);
      }
      target.mul(0.5);
    }
    return target;
  }

  flock(boids: Boid[]): void {
    this.acceleration = new Vector(0,0);
    const neighboids: Boid[] = this.getNeighboids(boids, 100);
    const personalSpace: Boid[] = this.getNeighboids(boids, 20);
    
    const alignment: Vector = this.alignment(neighboids);
    this.acceleration.add(alignment);

    const cohesion: Vector = this.cohesion(neighboids);
    this.acceleration.add(cohesion);

    const separation: Vector = this.separation(personalSpace);
    this.acceleration.add(separation);
    
    if (this.label === 50) console.log("accel: ", this.acceleration.x, this.acceleration.y);
    
    this.velocity.add(this.acceleration);
    this.velocity.limit(2);
  }

  update(): void {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
  }
  
  wrap(width: number, height: number): void {
    const offset = this.radius/2;

    if (this.position.x < -offset) this.position.x = width+(offset-1);
    if (this.position.x > width+5) this.position.x = -(offset-1);
    if (this.position.y < -offset) this.position.y = height+(offset-1);
    if (this.position.y > height+5) this.position.y = -(offset-1);
  }

  // bounce(width: number, height: number): void {
  //   if (this.position.x <= 0 || this.position.x >= width) this.velocity.x *= -1;
  //   if (this.position.y <= 0 || this.position.y >= height) this.velocity.y *= -1;
  // }

  draw(context: CanvasRenderingContext2D): void {
    context.save();
    context.translate(this.position.x, this.position.y);

    context.fillStyle = colorA;
    // context.strokeStyle = colorA;
    // context.lineWidth = 1;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI*2);
    context.fill();
    // context.stroke();

    context.restore();
  }
}

// Helper functions

export default function initBoids(context: CanvasRenderingContext2D, width: number, height: number): void {
  // Initialize
  const boids: Boid[] = [];
  const count = 150;

  for (let i = 0; i < count; i++) {
    boids.push(Boid.default(width, height, i));
  }

  const animate = () => {
    // Canvas background
    context.fillStyle = colorB;
    context.fillRect(0, 0, width, height);

    // Update agents

    boids.forEach(boid => {
      boid.flock(boids);
      boid.update();
      // boid.bounce(width, height);
      boid.wrap(width, height);
      boid.draw(context);
    })

    // Frame settings
    const fps = 60;
    const fpsInterval = 1000/fps;

    setTimeout(() => {
      window.requestAnimationFrame(animate);
    }, fpsInterval);

  }
  animate();
}