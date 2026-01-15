let canvas, ctx;
window.onload = function() {
    canvas = document.getElementById('background');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw(100, 0, 150);
    draw(window.innerWidth-100, 0, 150);
    draw(window.innerWidth/2, 0, 300);
    draw(window.innerWidth/3, 0, 150);
    draw(window.innerWidth/(2/3), 0, 150);
    draw(window.innerWidth/2, window.innerHeight/2, 400);
    draw(window.innerWidth-100, window.innerHeight, 150);
    draw(window.innerWidth/2, window.innerHeight, 300);
    draw(window.innerWidth/3, window.innerHeight, 150);
    draw(window.innerWidth/(2/3), window.innerHeight, 150);
    draw(100, window.innerHeight, 150);
}
window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw(100, 0, 150);
    draw(window.innerWidth-100, 0, 150);
    draw(window.innerWidth/2, 0, 300);
    draw(window.innerWidth/3, 0, 150);
    draw(window.innerWidth/(2/3), 0, 150);
    draw(window.innerWidth/2, window.innerHeight/2, 400);
    draw(window.innerWidth-100, window.innerHeight, 150);
    draw(window.innerWidth/2, window.innerHeight, 300);
    draw(window.innerWidth/3, window.innerHeight, 150);
    draw(window.innerWidth/(2/3), window.innerHeight, 150);
    draw(100, window.innerHeight, 150);
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function draw(x1,x2, ct){
    if(ct<=0) return;
    let x= randomIntFromInterval(0,3)
    if(x==0){
        setTimeout(()=> orizontalPlus(x1,x2, ct), 300);
    }
    else if(x==1){
        setTimeout(()=> verticalPlus(x1,x2, ct), 300);
    }
    else if(x==2){
        setTimeout(()=> verticalMinus(x1,x2, ct), 300);
    }
    else{
        setTimeout(()=> orizontalMinus(x1,x2, ct), 300);
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
    draw(x + 30, y, ct - 1);
}

function orizontalMinus(x,y,ct) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 30, y);
    ctx.strokeStyle = '#5e0808';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
    draw(x - 30, y, ct - 1);
}

function verticalPlus(x,y,ct) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 30);
    ctx.strokeStyle = '#5e0808';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
    draw(x, y + 30, ct - 1);
}

function verticalMinus(x,y,ct) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 30);
    ctx.strokeStyle = '#5e0808';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
    draw(x, y - 30, ct - 1);
}