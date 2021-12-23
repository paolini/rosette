const input_n = document.getElementById("input_n");

function draw() {
    var canvas = document.getElementById("my_canvas");
    var ctx = canvas.getContext('2d');
    var n = parseInt(input_n.value); // number of rombi coronae
    var m = (n - n%2)/2;
    document.getElementById("span_n").innerText = n;
    var alpha = Math.PI / n;
    var path = [[0,0]]; // m+1 points
    var x = 0;
    var y = 0;
    for (var i=0; i<=m; ++i) {
        if (i%2 == 1) {
            x += Math.cos((i+1)*alpha);
            y += Math.sin((i+1)*alpha);
        } else {
            x += Math.cos(-i*alpha);
            y += Math.sin(-i*alpha);
        }
        path.push([x, y]);
    }
    var center_x = canvas.width / 2;
    var center_y = canvas.height /2;
    var r = Math.min(canvas.width, canvas.height)/2/Math.sqrt(Math.pow(path[m][0],2) + Math.pow(path[m][1],2));

    function draw_rombus(p0, p1, p2, rotation) {
        var xs = [p0[0], p1[0], p2[0], p0[0]+p2[0]-p1[0]];
        var ys = [p0[1], p1[1], p2[1], p0[1]+p2[1]-p1[1]];
        var c = Math.cos(rotation);
        var s = Math.sin(rotation);
        for (var i=0;i<4;++i) {
            // rotation and translation
            [xs[i], ys[i]] = [center_x + r*(c*xs[i] - s*ys[i]), 
                center_y + r*(s*xs[i] + c*ys[i])];
        }
        ctx.beginPath();
        ctx.moveTo(xs[0],ys[0]);
        for (var i=1;i<4;++i) ctx.lineTo(xs[i],ys[i]);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    const palette = ["rgb(185, 131, 255)",
        "rgb(148, 179, 253)",
        "rgb(148, 218, 255)",
        "rgb(153, 254, 255)"];

    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (var i=1; i<m+1; ++i) {
        ctx.fillStyle = palette[(i-1)%palette.length];
        for (var j=0; j<n; ++j) {
            var rotation = 2*Math.PI*j/(n);
            draw_rombus(path[i-1],path[i],path[i+1], rotation);
        }
    }
}

draw();
input_n.onchange = draw;


