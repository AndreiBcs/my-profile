let canvas, ctx;
window.onload = function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();

}
const x=100;

function draw() {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, 200);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.stroke();
}