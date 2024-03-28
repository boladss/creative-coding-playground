const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1000, 1000 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    context.strokeStyle = 'white';

    const count = 5;
    const boxWidth = width * 0.1;
    const boxHeight = height * 0.1;
    const boxGap = width * 0.025;
    
    const xStart = (width - ((boxWidth*count) + (boxGap*(count-1))))/2;
    const yStart = (height - ((boxWidth*count) + (boxGap*(count-1))))/2;;
    let x, y;

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        x = xStart + i*(boxWidth + boxGap);
        y = yStart + j*(boxHeight + boxGap);
        
        context.beginPath();
        context.rect(x, y, boxWidth, boxHeight);
        context.stroke();

        if (Math.random() > 0.5) {
          context.beginPath();
          context.rect(x+(boxWidth*0.1), y+(boxWidth*0.1), boxWidth*0.8, boxHeight*0.8);
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
