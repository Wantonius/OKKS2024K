var canvas;
var ctx;
var running = 0;
var interval;

window.onload = function() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
}

function createRect() {
	let x = 0;
	let y = 0;
	let side = 0;
	let color = "#";
	const colorpicker = "0123456789ABCDEF";
	side = Math.floor((Math.random()*80)+20);
	x = Math.floor((Math.random()*400)+1);
	y = Math.floor((Math.random()*400)+1);
	for(let i=0;i<6;i++) {
		let temp = Math.floor(Math.random()*16);
		color = color + colorpicker[temp];
	}
	ctx.fillStyle = color;
	ctx.fillRect(x,y,side,side);
}

function startCanvas() {
	if(running) {
		running = 0;
		clearInterval(interval);
		document.getElementById("startbutton").innerHTML = "Start";
	} else {
		running = 1;
		interval = setInterval(createRect,200);
		document.getElementById("startbutton").innerHTML = "Stop";
	}
}

function clearCanvas() {
	ctx.clearRect(0,0,500,500);
}