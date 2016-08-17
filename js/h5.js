function draw(ctx, op) {
    var beginPoint = { x: 50, y: 50 };
    ctx.beginPath();
    ctx.moveTo(beginPoint.x, beginPoint.y);
    ctx.lineTo(beginPoint.x + op.width, beginPoint.y);
    ctx.lineTo(beginPoint.x + op.width, beginPoint.y + op.height);
    ctx.lineTo(beginPoint.x + op.width, beginPoint.y);
    ctx.lineTo(beginPoint.x, beginPoint.y + op.height);
    ctx.closePath();
    ctx.fillStyle = op.fillColor || "black";
    ctx.strokeStyle = op.lineColor || "black";
    ctx.lineWidth = op.lineWidth || 1;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

draw(ctx,{
    width : 100,
    height : 100
})