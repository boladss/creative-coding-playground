// Initialize Canvases
import initArcs from "./arcs";

// function

function init() {
  let canvas1 = document.getElementById("canvas1") as HTMLCanvasElement;
  let context1 = canvas1.getContext('2d') as CanvasRenderingContext2D;
  const width1 = canvas1.width;
  const height1 = canvas1.height;
  console.log("test");
  initArcs(context1, width1, height1);
}

init();

