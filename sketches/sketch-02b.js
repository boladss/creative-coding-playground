const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const getX = (cx, radius, angle) => {
  return cx + radius * Math.sin(angle);
};

const getY = (cy, radius, angle) => {
  return cy + radius * Math.cos(angle);
};

const settings = {
  dimensions: [ 1000, 1000 ]
};

const sketch = ({ context, width, height }) => {
  const segments = [];
  const count = 100;

  const cx = width * 0.5;
  const cy = height * 0.5;
  let x,y;

  const w = width * 0.01;
  const h = height * 0.2;
  const radius = width * 0.2;

  for (i = 0; i < count; i++) {
    const slice = math.degToRad(360/count);
    const angle = slice * i;

    x = getX(cx, radius, angle);
    y = getY(cy, radius, angle);

    // wScaled = w * random.range(0.1, 1);
    wScaled = w*0.25;
  
    segments.push(new Segment(x, y, 0.01, angle, wScaled, h));
  }
  
  return () => {
    const animate = () => {
      context.fillStyle = 'white';
      context.fillRect(0, 0, width, height);

      segments.forEach(segment => {
        // segment.update();
        segment.update(cx, cy, radius);
        segment.draw(context);
      })

      let fps = 144;
      let fpsInterval = 1000/fps;

      setTimeout(() => {
        requestAnimationFrame(animate);
      }, fpsInterval);

    };

    animate();

  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}

class Segment {
  constructor(x, y, v, angle, w, h) {
    this.pos = new Vector(x,y);
    this.v = v;
    this.angle = angle;
    this.w = w;
    this.h = h;
  }

  update(cx, cy, radius) {
    this.angle += this.v;

    this.x = getX(cx, radius, this.angle);
    this.y = getY(cy, radius, this.angle);
  }

  draw(context) {
    context.fillStyle = 'black';
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.rotate(-this.angle);

    context.beginPath();
    // context.rect(-w*0.5, random.range(0, -h*0.5), w, h);
    context.rect(-this.w*0.5, -this.h*0.5, this.w, this.h);
    context.fill();
    context.restore();
  }
}