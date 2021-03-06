//背景动画开始
var setWidth = document.documentElement.clientWidth;
if (setWidth <= 960) {
    setWidth = 960;
}
var setHeight = setWidth / 3;
$('.canvas').attr('width', setWidth);
$('.canvas').attr('width', setHeight);
$('.bannerAni').css('height', setHeight);

var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d')
canvas.width = setWidth;
canvas.height = setHeight;
ctx.lineWidth = .3;
ctx.strokeStyle = (new Color(150)).style;

var mousePosition = {
    x: 30 * canvas.width / 100,
    y: 30 * canvas.height / 100
};

var dots = {
    nb: 750,
    distance: 50,
    d_radius: 100,
    array: []
};

function colorValue(min) {
    return Math.floor(Math.random() * 255 + min);
}

function createColorStyle(r, g, b) {
    return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
}

function mixComponents(comp1, weight1, comp2, weight2) {
    return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
}

function averageColorStyles(dot1, dot2) {
    var color1 = dot1.color,
        color2 = dot2.color;

    var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
        g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
        b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
    return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
}

function Color(min) {
    min = min || 0;
    this.r = colorValue(min);
    this.g = colorValue(min);
    this.b = colorValue(min);
    //   this.style = createColorStyle(this.r, this.g, this.b);
    this.style = createColorStyle(255, 255, 255);
}

function Dot(num) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = -.5 + Math.random();
    this.vy = -.5 + Math.random();

    if (num % 2 != 0)
        this.radius = Math.random() * 2;
    else if (num % 3 != 0) {
        this.radius = Math.random() * 1.5;
    } else
        this.radius = Math.random();

    this.color = new Color();

}

Dot.prototype = {
    draw: function() {
        ctx.beginPath();
        ctx.fillStyle = this.color.style;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 1, false);
        ctx.fill();
    }
};

function createDots() {
    for (i = 0; i < dots.nb; i++) {
        dots.array.push(new Dot(i));
    }
}

var check = 0;
var join = 0;

function moveDots() {
     
    join++ 
    for (i = 0; i < dots.nb; i++) {

        var dot = dots.array[i];

        if(i%2==0){
             if(join - check > 5 ){
                dot.color.style = "rgba(255,255,255,0.8)"
             }

             if(join - check > 10){
                dot.color.style = "rgba(255,255,255,0.5)"
             }

             if(join - check > 15 ){
                dot.color.style = "rgba(255,255,255,0.3)"
             }

              if(join - check > 20 ){
                dot.color.style = "rgba(255,255,255,0.1)"
             }

              if(join - check > 25 ){
                dot.color.style = "rgba(255,255,255,0.3)"
             }

             if(join - check > 30){
                dot.color.style = "rgba(255,255,255,0.5)"
             }

             if(join - check > 35 ){
                dot.color.style = "rgba(255,255,255,0.8)"
                check = join
             }
        }

        if (dot.y < 0 || dot.y > canvas.height) {
            dot.vx = dot.vx;
            dot.vy = -dot.vy;
        } else if (dot.x < 0 || dot.x > canvas.width) {
            dot.vx = -dot.vx;
            dot.vy = dot.vy;
        }
        dot.x += dot.vx;
        dot.y += dot.vy;

    }
}

function connectDots() {
    for (i = 0; i < dots.nb; i++) {
        for (j = 0; j < dots.nb; j++) {
            i_dot = dots.array[i];
            j_dot = dots.array[j];

            if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > -dots.distance && (i_dot.y - j_dot.y) > -dots.distance) {
                if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > -dots.d_radius && (i_dot.y - mousePosition.y) > -dots.d_radius) {
                    ctx.beginPath();
                    ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
                    ctx.moveTo(i_dot.x, i_dot.y);
                    ctx.lineTo(j_dot.x, j_dot.y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }
}

function drawDots() {
    for (i = 0; i < dots.nb; i++) {
        var dot = dots.array[i];
        dot.draw();
    }
}

function animateDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveDots();
    connectDots();
    drawDots();

    requestAnimationFrame(animateDots);
}


$('canvas').on('mousemove', function(e) {
    mousePosition.x = e.pageX;
    mousePosition.y = e.pageY;
});

$('canvas').on('mouseleave', function(e) {
    mousePosition.x = canvas.width / 2;
    mousePosition.y = canvas.height / 2;
});

createDots();
requestAnimationFrame(animateDots);
//背景动画结束