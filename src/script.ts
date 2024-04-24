// Initialize Canvases
import initArcs from "./arcs";
import initNodes from "./nodes";
import initBoids from "./boids";
export { colorA, colorB };

// function

const colorA = getComputedStyle(document.body).getPropertyValue('--foreground-color');
const colorB = getComputedStyle(document.body).getPropertyValue('--background-color');

function init() {
  
  let canvas1 = document.getElementById("canvas1") as HTMLCanvasElement;
  let context1 = canvas1.getContext('2d') as CanvasRenderingContext2D;
  const width = canvas1.width;
  const height = canvas1.height;
  // console.log("nodes call");
  initNodes(context1, width, height);
  
  let canvas2 = document.getElementById("canvas2") as HTMLCanvasElement;
  let context2 = canvas2.getContext('2d') as CanvasRenderingContext2D;
  // console.log("arcs call");
  initArcs(context2, width, height);

  let canvas3 = document.getElementById("canvas3") as HTMLCanvasElement;
  let context3 = canvas3.getContext('2d') as CanvasRenderingContext2D;
  // console.log("boids call");
  initBoids(context3, width, height);
}

init();

