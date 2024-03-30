export { init };

// Classes
class Vector {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}

class Segment {
  constructor(x, y, v, angle, w, h, label) {
    this.pos = new Vector(x,y);
    this.v = v;
    this.angle = angle;
    this.w = w;
    this.h = h;
    this.label = label;
  }

  update(cx, cy, radius) {
    this.angle += this.v;

    this.x = getX(cx, radius, this.angle);
    this.y = getY(cy, radius, this.angle);
    if (this.label == 50) console.log(this.label, this.x, this.y, this.angle);
  }

  draw(context) {
    context.fillStyle = 'black';

    if (this.label == 50) context.fillStyle = 'red';

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

// Helper functions
function getX(cx, radius, angle) {
  return cx + radius * Math.sin(angle);
}

function getY(cy, radius, angle) {
  return cy + radius * Math.cos(angle);
}

function degToRad(n) {
  return n * Math.PI / 180;
}

// Main
function init({ context, width, height }) {
  const segments = [];
  const count = 100;

  const cx = width * 0.5;
  const cy = height * 0.5;
  let x,y;

  const w = width * 0.01;
  const h = height * 2;
  const radius = width * 0.3;

  for (let i = 0; i < count; i++) {
    const slice = degToRad(360/count);
    const angle = slice * i;

    x = getX(cx, radius, angle);
    y = getY(cy, radius, angle);

    // wScaled = w * random.range(0.1, 1);
    let wScaled = w*0.25;

    segments.push(new Segment(x, y, 0.01, angle, wScaled, h));
  }

  const animate = () => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
  
    segments.forEach(segment => {
      segment.update(cx, cy, radius);
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

// let canvas = document.getElementById("canvas1");
// let context = canvas.getContext('2d');

// const width = canvas.width;
// const height = canvas.height;

// init({ context, width, height });