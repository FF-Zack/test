function windowToCanvas(canvas, x, y) {     //将窗口的鼠标对于回canvas里的鼠标位置
    var bbox = canvas.getBoundingClientRect();
    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    };
}
/*canvas.onmousemove = function (e) {
 var loc = windowToCanvas(canvas, e.clientX, e.clientY);
 };*/


//demo for windowToCanvas()
function drawGrid(color, stepx, stepy) {                       //画框格
    context.save();

    context.strokeStyle = color;
    context.lineWidth = 0.5;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, context.canvas.height);
        context.stroke();
    }

    for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(context.canvas.width, i);
        context.stroke();
    }

    context.restore();
}

function roundedRect(cornerX, cornerY, width, height, cornerRadius) {          //话圆角矩形
    if (width > 0) context.moveTo(cornerX + cornerRadius, cornerY);
    else           context.moveTo(cornerX - cornerRadius, cornerY);

    context.arcTo(cornerX + width, cornerY,
        cornerX + width, cornerY + height,
        cornerRadius);

    context.arcTo(cornerX + width, cornerY + height,
        cornerX, cornerY + height,
        cornerRadius);

    context.arcTo(cornerX, cornerY + height,
        cornerX, cornerY,
        cornerRadius);

    if (width > 0) {
        context.arcTo(cornerX, cornerY,
            cornerX + cornerRadius, cornerY,
            cornerRadius);
    }
    else {
        context.arcTo(cornerX, cornerY,
            cornerX - cornerRadius, cornerY,
            cornerRadius);
    }
}

function drawDashedLine(context, x1, y1, x2, y2, dashLength) {            //画虚线
    dashLength = dashLength === undefined ? 5 : dashLength;

    var deltaX = x2 - x1;
    var deltaY = y2 - y1;
    var numDashes = Math.floor(
        Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength);

    for (var i = 0; i < numDashes; ++i) {
        context[i % 2 === 0 ? 'moveTo' : 'lineTo']
        (x1 + (deltaX / numDashes) * i, y1 + (deltaY / numDashes) * i);
    }

    context.stroke();
}

function saveDrawingSurface() {
    drawingSurfaceImageData = context.getImageData(0, 0,
        canvas.width,
        canvas.height);
}

function restoreDrawingSurface() {
    context.putImageData(drawingSurfaceImageData, 0, 0);
}

function getPolygonPoints(centerX, centerY, radius, sides, startAngle) {         //获取到多边形的各个端点
    var points = [],
        angle = startAngle || 0;

    for (var i = 0; i < sides; ++i) {
        points.push(new Point(centerX + radius * Math.sin(angle),
            centerY - radius * Math.cos(angle)));
        angle += 2 * Math.PI / sides;
    }

    return points;
}

function createPolygonPath(centerX, centerY, radius, sides, startAngle) {        //画多边形
    var points = getPolygonPoints(centerX, centerY, radius, sides, startAngle);

    context.beginPath();

    context.moveTo(points[0].x, points[0].y);

    for (var i = 1; i < sides; ++i) {
        context.lineTo(points[i].x, points[i].y);
    }

    context.closePath();
}



