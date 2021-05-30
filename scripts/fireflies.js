let WIDTH;
let HEIGHT;
let canvas;
let context;
let gradient;
let fireflies = new Array();
let rint = 50;

$(document).ready(function(){
  WIDTH = $('.fireflies-container').width();
  HEIGHT = $('.fireflies-container').height();
	canvas = document.getElementById('fireflies');
	$(canvas).attr('width', WIDTH).attr('height',HEIGHT);
	context = canvas.getContext('2d');
	for(let i = 0; i < rint; i++) {
		fireflies[i] = new Circle();
		fireflies[i].reset();
	}
	setInterval(draw,rint);
});

function draw() {
	context.clearRect(0,0,WIDTH,HEIGHT);
	for(let i = 0; i < fireflies.length; i++) {
		fireflies[i].fade();
		fireflies[i].move();
		fireflies[i].draw();
	}
}


class Circle {
    constructor() {
        this.s = { ttl: 8000, xmax: 5, ymax: 2, rmax: 10, rt: 1, xdef: 960, ydef: 540, xdrift: 4, ydrift: 4, random: true, blink: true };

        this.reset = function () {
            this.x = (this.s.random ? WIDTH * Math.random() : this.s.xdef);
            this.y = (this.s.random ? HEIGHT * Math.random() : this.s.ydef);
            this.r = ((this.s.rmax - 1) * Math.random()) + 1;
            this.dx = (Math.random() * this.s.xmax) * (Math.random() < .5 ? -1 : 1);
            this.dy = (Math.random() * this.s.ymax) * (Math.random() < .5 ? -1 : 1);
            this.hl = (this.s.ttl / rint) * (this.r / this.s.rmax);
            this.rt = Math.random() * this.hl;
            this.s.rt = Math.random() + 1;
            this.stop = Math.random() * .2 + .4;
            this.s.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
            this.s.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
        };

        this.fade = function () {
            this.rt += this.s.rt;
        };

        this.draw = function () {
            if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl))
                this.s.rt = this.s.rt * -1;
            else if (this.rt >= this.hl)
                this.reset();
            let newo = 1 - (this.rt / this.hl);
            context.beginPath();
            context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
            context.closePath();
            let cr = this.r * newo;
            gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
            gradient.addColorStop(0.0, 'rgba(255, 255, 224,' + newo + ')');
            gradient.addColorStop(this.stop, 'rgba(255, 255, 224,' + (newo * .2) + ')');
            gradient.addColorStop(1.0, 'rgba(255, 255, 224,0)');
            context.fillStyle = gradient;
            context.fill();
        };

        this.move = function () {
            this.x += (this.rt / this.hl) * this.dx;
            this.y += (this.rt / this.hl) * this.dy;
            if (this.x > WIDTH || this.x < 0)
                this.dx *= -1;
            if (this.y > HEIGHT || this.y < 0)
                this.dy *= -1;
        };

        this.getX = function () { return this.x; };
        this.getY = function () { return this.y; };
    }
}
