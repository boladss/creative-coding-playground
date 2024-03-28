const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1000, 1000 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    context.fillStyle = 'black';

    const cx = width;
    const cy = height;

    const w = width * 0.01;
    const h = height * 0.2;
    let x,y;

    const count = 100;
    const radius = width * 0.8;

    for (let i = 0; i < count; i++) {
      const slice = math.degToRad(360/count);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      // Clock markers
      // context.save();
      // context.translate(x, y);
      // context.rotate(-angle);
      
      // let rand = random.range(0.1, 1)
      // context.scale(rand, 1);
  
      // context.beginPath();
      // // context.rect(-w*0.5, random.range(0, -h*0.5), w, h);
      // context.rect(-w*0.5, -h*0.5, w, h);
      // context.fill();
      // context.restore();

      // Arcs
      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);
      
      context.lineWidth = random.range(1,25);

      context.beginPath();
      context.arc(0,0,radius * random.range(0.75, 1.25), slice*random.range(1,-3), slice*random.range(1,10));
      context.stroke();
      context.restore();
    }

  };
};

canvasSketch(sketch, settings);
