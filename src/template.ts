import { getRandomInt } from "./helper"
import { colorA, colorB } from "./script"

// Classes
class Vector {
  constructor(
    public x: number,
    public y: number
  ) {}
}

class Agent {
  constructor(
    public position: Vector,
    private velocity: Vector,
    private label: number,
  ) {}

  static default(): Agent {
    const temp = getRandomInt(-1, 1);
    const position = new Vector(temp, temp);
    const velocity = new Vector(temp, temp);
    const label = 0;

    return new Agent(position, velocity, label);
  }

  update(): void {}
  draw(context: CanvasRenderingContext2D): void {}
}

// Helper functions

function initTemplate(context: CanvasRenderingContext2D, width: number, height: number): void {
  // Initialize

  const animate = () => {
    // Canvas background
    context.fillStyle = colorB;
    context.fillRect(0, 0, width, height);

    // Update agents

    // Frame settings
    const fps = 60;
    const fpsInterval = 1000/fps;

    setTimeout(() => {
      window.requestAnimationFrame(animate);
    }, fpsInterval);

    animate();
  }
}