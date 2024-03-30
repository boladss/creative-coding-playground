// Initialize Canvases
import { init as initArcs } from "./src/arcs.js";

// function

let canvas1 = document.getElementById("canvas1");
let context1 = canvas.getContext('2d');
const width1 = canvas1.width;
const height1 = canvas1.height;
initArcs({ context1, width1, height1 });

