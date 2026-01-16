let canvas, ctx;
let timeouts = [];
let running = true;
const btn = document.getElementById('btn')
let rainInterval;
window.onload = function() {
    running = true;
    canvas = document.getElementById('background');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw1()
}
window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw1()
}

btn.addEventListener('click', e => {
    running = false;
    timeouts.forEach(id => clearTimeout(id));
    timeouts.length = 0;
    clearCanvas()
    //draw2();
    //drawGrid(0, 0, 63, 26, createPoly(EDGES));
    drawGrid(0, 0, Math.ceil(window.innerWidth/30)+1, Math.ceil(window.innerHeight/30)-3, createPoly(EDGES));
})

function clearCanvas(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function draw1(){
    drawInitialLayout(100, 0, 400);
    drawInitialLayout(window.innerWidth-100, 0, 400);
    drawInitialLayout(window.innerWidth/2, 0, 400);
    drawInitialLayout(window.innerWidth/3, 0, 400);
    drawInitialLayout(window.innerWidth/(2/3), 0, 400);
    drawInitialLayout(window.innerWidth/2, window.innerHeight/2, 400);
    drawInitialLayout(window.innerWidth-100, window.innerHeight, 400);
    drawInitialLayout(window.innerWidth/2, window.innerHeight, 400);
    drawInitialLayout(window.innerWidth/3, window.innerHeight, 400);
    drawInitialLayout(window.innerWidth/(2/3), window.innerHeight, 400);
    drawInitialLayout(100, window.innerHeight, 400);
}

function schedule(fn, delay) {
  const id = setTimeout(fn, delay);
  timeouts.push(id);
  return id;
}

function drawInitialLayout(x1,x2, ct){
    if (!running) return;
    if(ct<=0) return;
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    ctx.strokeStyle = "rgb("+red+","+green+"," +blue+" )";
    let x= randomIntFromInterval(0,3)
    if(x==0){
        schedule(()=> orizontalPlus(x1,x2, ct), 150);
    }
    else if(x==1){
        schedule(()=> verticalPlus(x1,x2, ct), 150);
    }
    else if(x==2){
        schedule(()=> verticalMinus(x1,x2, ct), 150);
    }
    else{
        schedule(()=> orizontalMinus(x1,x2, ct), 150);
    }
}

function orizontalPlus(x,y,ct) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 30, y);
    ctx.strokeStyle = 'rgba(94, 8, 8, 1)';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
    drawInitialLayout(x + 30, y, ct - 1);
}

function orizontalMinus(x,y,ct) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 30, y);
    ctx.strokeStyle = '#5e0808';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
    drawInitialLayout(x - 30, y, ct - 1);
}

function verticalPlus(x,y,ct) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 30);
    ctx.strokeStyle = '#5e0808';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
    drawInitialLayout(x, y + 30, ct - 1);
}

function verticalMinus(x,y,ct) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 30);
    ctx.strokeStyle = '#5e0808';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
    drawInitialLayout(x, y - 30, ct - 1);
}

function draw2() {
    if (rainInterval) clearInterval(rainInterval);
    rainInterval = setInterval(() => {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        drawHexagon(x, y);
    }, 300);
}

function drawCircle(x, y) {
    ctx.fillStyle = '#5e0808';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2, true);
    ctx.arc(x, y, 26, 0, Math.PI * 2, true);
    ctx.fill("evenodd");
}

const shapeType = 6;
const angle = 2 * Math.PI / shapeType;
const radius = 15;

function drawHexagon(x, y) {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    ctx.strokeStyle = "rgb("+red+","+green+"," +blue+" )";
    ctx.beginPath();
    for (let i = 0; i < shapeType; i++) {
        let xx = x + radius * Math.cos(angle * i);
        let yy = y + radius * Math.sin(angle * i);
        ctx.lineTo(xx, yy);
    }
    ctx.closePath();
    ctx.stroke();
}

// Source - https://stackoverflow.com/a
// Posted by Blindman67, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-16, License - CC BY-SA 4.0

const P2 = (x, y) => ({x,y});
const EDGES = 6;
const RADIUS = 20;
const TAU = 2 * Math.PI;
const EDGE_LEN = Math.sin(Math.PI / EDGES) * RADIUS * 2;
const GRID_Y_SPACE = Math.cos(Math.PI / EDGES) * RADIUS * 2;
const GRID_X_SPACE = RADIUS * 2 - EDGE_LEN * 0.5;
const GRID_Y_OFFSET = GRID_Y_SPACE * 0.5;
const COLS = "=#3c2f18,#01335f,#3f0e77,#204a73,#511d94,#fe1f00,#0060fd,#fe7603,#f0ca1d,#b085e8,#e9cafa".split(",");
const rndItem = arr => arr[Math.random() * arr.length | 0];

function drawGrid(x, y, w, h, points) {
  const p = P2();
  var gy, gx;
  for (gy = y; gy < y + h; gy++) {
      for (gx = x; gx < x + w; gx++) {
          ctx.fillStyle = rndItem(COLS);
          drawPoly(gridToPixel(gx, gy, p), points);
      }
  }
}
function gridToPixel(gx, gy, p = {}) {
    p.x = gx * GRID_X_SPACE;
    p.y = gy * GRID_Y_SPACE + (gx % 2 ? GRID_Y_OFFSET : 0);       
    return p;
}
function drawPoly(p, points) { // p.x, p.y is center
    ctx.setTransform(1, 0, 0, 1, p.x, p.y);
    var i = 0;
    ctx.beginPath();
    while (i < points.length) {
        const p2 = points[i++];
        ctx.lineTo(p2.x, p2.y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
function createPoly(sides, points = []) {
    const step = TAU / sides;
    var ang = 0, i = sides;
    while (i--) {
        points.push(P2(RADIUS * Math.cos(ang), RADIUS * Math.sin(ang)));
        ang += step;
    }
    return points;
}