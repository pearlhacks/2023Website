var canvas;
var context;
var screenH;
var screenW;
var stars = [];
var fps = 60;
var numStars = 500;

$('document').ready(function () {

	// Calculate the screen size
	screenH = $(window).height();
	screenW = $(window).width();

	// Get the canvas
	canvas = $('#space');

	// Fill out the canvas
	canvas.attr('height', screenH);
	canvas.attr('width', screenW);
	context = canvas[0].getContext('2d');

	// Create all the stars
	for (var i = 0; i < numStars; i++) {
		var x = Math.round(Math.random() * screenW);
		var y = Math.round(Math.random() * screenH);
		var length = 1 + Math.random() * 1.5;
		var opacity = Math.random();

		// Create a new star and draw
		var star = new Star(x, y, length, opacity);

		// Add the the stars array
		stars.push(star);
	}

	animateInterval = setInterval(animate, 1000 / fps);
});

/**
 * Animate the canvas
 */
function animate() {
	context.clearRect(0, 0, screenW, screenH);
	$.each(stars, function () {
		this.draw(context);
	})
}

/* stop Animation */
function stopAnimation() {
	clearInterval(animateInterval);
}

//stopAnimation();

function Star(x, y, length, opacity) {
	this.x = parseInt(x);
	this.y = parseInt(y);
	this.length = parseInt(length);
	this.opacity = opacity;
	this.factor = 1;
	this.increment = Math.random() * .03;
}

Star.prototype.draw = function () {
	context.rotate((Math.PI * 1 / 10));

	// Save the context
	context.save();

	// move into the middle of the canvas, just to make room
	context.translate(this.x, this.y);

	// Change the opacity
	if (this.opacity > 1) {
		this.factor = -1;
	}
	else if (this.opacity <= 0) {
		this.factor = 1;

		this.x = Math.round(Math.random() * screenW);
		this.y = Math.round(Math.random() * screenH);
	}

	this.opacity += this.increment * this.factor;

	context.beginPath()
	for (var i = 5; i--;) {
		context.lineTo(0, this.length);
		context.translate(0, this.length);
		context.rotate((Math.PI * 2 / 10));
		context.lineTo(0, - this.length);
		context.translate(0, - this.length);
		context.rotate(-(Math.PI * 6 / 10));
	}
	context.lineTo(0, this.length);
	context.closePath();
	context.fillStyle = "rgba(255, 255, 200, " + this.opacity + ")";
	context.shadowBlur = 5;
	context.shadowColor = '#fff';
	context.fill();

	context.restore();
}
// <![CDATA[
var colour = "white";
var sparkles = 65;
var x = ox = 400;
var y = oy = 300;
var swide = 800;
var shigh = 600;
var sleft = sdown = 0;
var tiny = new Array();
var star = new Array();
var starv = new Array();
var starx = new Array();
var stary = new Array();
var tinyx = new Array();
var tinyy = new Array();
var tinyv = new Array();
window.onload = function () {
	if (document.getElementById) {
		var i, rats, rlef, rdow;
		for (var i = 0; i < sparkles; i++) {
			var rats = createDiv(3, 3);
			rats.style.visibility = "hidden";
			document.body.appendChild(tiny[i] = rats);
			starv[i] = 0;
			tinyv[i] = 0;
			var rats = createDiv(5, 5);
			rats.style.backgroundColor = "transparent";
			rats.style.visibility = "hidden";
			var rlef = createDiv(1, 5);
			var rdow = createDiv(5, 1);
			rats.appendChild(rlef);
			rats.appendChild(rdow);
			rlef.style.top = "2px";
			rlef.style.left = "0px";
			rdow.style.top = "0px";
			rdow.style.left = "2px";
			document.body.appendChild(star[i] = rats);
		}
		set_width();
		sparkle();
	}
}
function sparkle() {
	var c;
	if (x != ox || y != oy) {
		ox = x;
		oy = y;
		for (c = 0; c < sparkles; c++) if (!starv[c]) {
			star[c].style.left = (starx[c] = x) + "px";
			star[c].style.top = (stary[c] = y) + "px";
			star[c].style.clip = "rect(0px, 5px, 5px, 0px)";
			star[c].style.visibility = "visible";
			starv[c] = 50;
			break;
		}
	}
	for (c = 0; c < sparkles; c++) {
		if (starv[c]) update_star(c);
		if (tinyv[c]) update_tiny(c);
	}
	setTimeout("sparkle()", 40);
}
function update_star(i) {
	if (--starv[i] == 25) star[i].style.clip = "rect(1px, 4px, 4px, 1px)";
	if (starv[i]) {
		stary[i] += 1 + Math.random() * 3;
		if (stary[i] < shigh + sdown) {
			star[i].style.top = stary[i] + "px";
			starx[i] += (i % 5 - 2) / 5;
			star[i].style.left = starx[i] + "px";
		}
		else {
			star[i].style.visibility = "hidden";
			starv[i] = 0;
			return;
		}
	}
	else {
		tinyv[i] = 50;
		tiny[i].style.top = (tinyy[i] = stary[i]) + "px";
		tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
		tiny[i].style.width = "2px";
		tiny[i].style.height = "2px";
		star[i].style.visibility = "hidden";
		tiny[i].style.visibility = "visible"
	}
}
function update_tiny(i) {
	if (--tinyv[i] == 25) {
		tiny[i].style.width = "1px";
		tiny[i].style.height = "1px";
	}
	if (tinyv[i]) {
		tinyy[i] += 1 + Math.random() * 3;
		if (tinyy[i] < shigh + sdown) {
			tiny[i].style.top = tinyy[i] + "px";
			tinyx[i] += (i % 5 - 2) / 5;
			tiny[i].style.left = tinyx[i] + "px";
		}
		else {
			tiny[i].style.visibility = "hidden";
			tinyv[i] = 0;
			return;
		}
	}
	else tiny[i].style.visibility = "hidden";
}
document.onmousemove = mouse;
function mouse(e) {
	set_scroll();
	y = (e) ? e.pageY : event.y + sdown;
	x = (e) ? e.pageX : event.x + sleft;
}
function set_scroll() {
	if (typeof (self.pageYOffset) == "number") {
		sdown = self.pageYOffset;
		sleft = self.pageXOffset;
	}
	else if (document.body.scrollTop || document.body.scrollLeft) {
		sdown = document.body.scrollTop;
		sleft = document.body.scrollLeft;
	}
	else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
		sleft = document.documentElement.scrollLeft;
		sdown = document.documentElement.scrollTop;
	}
	else {
		sdown = 0;
		sleft = 0;
	}
}
window.onresize = set_width;
function set_width() {
	if (typeof (self.innerWidth) == "number") {
		swide = self.innerWidth;
		shigh = self.innerHeight;
	}
	else if (document.documentElement && document.documentElement.clientWidth) {
		swide = document.documentElement.clientWidth;
		shigh = document.documentElement.clientHeight;
	}
	else if (document.body.clientWidth) {
		swide = document.body.clientWidth;
		shigh = document.body.clientHeight;
	}
}
function createDiv(height, width) {
	var div = document.createElement("div");
	div.style.position = "absolute";
	div.style.height = height + "px";
	div.style.width = width + "px";
	div.style.overflow = "hidden";
	div.style.backgroundColor = colour;
	return (div);
}
// ]]>


var countDownDate = new Date("Februrary 20 2022 11:00:00 EDT").getTime();
var myfunc = setInterval(function () {


	var now = new Date().getTime();

	var timeleft = countDownDate - now;

	var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
	var hours = Math.floor(timeleft / (1000 * 60 * 60) % 24);
	var minutes = Math.floor(timeleft / (1000 * 60) % 60);
	var seconds = Math.floor(timeleft / 1000 % 60);

	if (days < 0) {
		document.getElementById("d").innerHTML = "00:";
		document.getElementById("h").innerHTML = "00:";
		document.getElementById("m").innerHTML = "00:";
		document.getElementById("s").innerHTML = "00";
	} else {
		document.getElementById("d").innerHTML = pad(days, 2);
		document.getElementById("h").innerHTML = pad(hours, 2);
		document.getElementById("m").innerHTML = pad(minutes, 2);
		document.getElementById("s").innerHTML = pad(seconds, 2);
	}
}, 1000);

function pad(num, size) {
	var s = num + "";
	while (s.length < size) s = "0" + s;
	return s;
}

const scrollToContent = function () {
	var element = document.getElementById("resources");
	var headerOffset = 65;
	var elementPosition = element.getBoundingClientRect().top;
	var offsetPosition = elementPosition - headerOffset;
	window.scrollTo({
		top: offsetPosition,
		behavior: "smooth",
	});
};