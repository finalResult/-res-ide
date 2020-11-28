CanvasRenderingContext2D.prototype.roundRect = function ( x, y, w, h, r ) {
	if (w < 2 * r) {r = w / 2;}
	if (h < 2 * r) {r = h / 2;}
	this.beginPath();
	this.moveTo(x + r, y);
	this.arcTo(x + w, y, x + w, y + h, r);
	this.arcTo(x + w, y + h, x, y + h, r);
	this.arcTo(x, y + h, x, y, r);
	this.arcTo(x, y, x + w, y, r);
	this.closePath();
	return this;
}

CanvasRenderingContext2D.prototype.path = function ( main ) {
	this.save();
		this.beginPath();
			main();
		this.closePath();
	this.restore();
	return this;
}

function getPosition( event ) {
	return {
		x: event.offsetX,
		y: event.offsetY
	};
}

let getLength = ( x0, y0, x1, y1 ) => Math.sqrt( ( x0 - x1 ) ** 2 + ( y0 - y1 ) ** 2 );

function onMouse( sx, sy, ex, ey ) {
	return (sx > Position.x) && (ex < Position.x) && (sy < Position.y) && (ey > Position.y);
}

function Count( string, count ) {
	let c = 0;
	for (let i = 0; i < string.length; i++) {
		if (string[i] === count) c++;
	}
	return c;
}

function UpDataView( ctx, w, h ) {
    ctx.font = "10px Monaco";
	ctx.clearRect(0, 0, w, h);
	ctx.fillStyle = "#141414";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "#333";
	ctx.path(function (){
		ctx.roundRect(0, 0, leftView, h - buttomView, 5);
		ctx.stroke();
		ctx.clip();
		leftViewBox( ctx, leftView, h - buttomView, {
			x: Position.x,
			y: Position.y
		} );
	});
	ctx.path(function (){
		ctx.roundRect(leftView, 0, w - leftView, h - buttomView, 5);
		ctx.stroke();
		ctx.clip();
		ctx.translate( leftView, 0 );
		rightViewBox( ctx, w - leftView, h - buttomView, {
			x: Position.x - leftView,
			y: Position.y
		} );
	});
	ctx.path(function (){
		ctx.roundRect(0, h - buttomView, w, buttomView, 5);
		ctx.stroke();
		ctx.clip();
		ctx.translate( 0, h - buttomView );
		buttomViewBox( ctx, w, buttomView, {
			x: Position.x,
			y: Position.y - h + buttomView
		} );
	});
	ctx.fillStyle = "#FFF";
	ctx.path(function (){
		ctx.fillText("Position: " + Position.x + ", " + Position.y + " MouseDown: " + MouseDown + "[" + Cursor + "]", 4, h - 5, w)
	});
}

let view = document.getElementById("ide");

let w, h;

w = document.getElementsByTagName("html")[0].offsetWidth;
h = document.getElementsByTagName("html")[0].offsetHeight;

view.width = w;
view.height = h;

let ctx = view.getContext("2d");
let leftView = w * (1/5);
let buttomView = h * (1/4);
let Position = {x: 0, y: 0};
let fontSize = 12;

let Cursor = 0;
let sCursor = 0;

let MouseDown = false;

let Current = "class HelloWorld {\n" +
	"\n" +
	"    public static void main( String args[*] ) {\n" +
	"\n" +
	"        System.out.printIn( \"\\nHello, world!\\n\" );\n" +
	"\n" +
	"    }\n" +
	"\n" +
	"} ";

let highLighting = [];

document.onkeydown = function ( event ) {
	let e = event || window.event || arguments.callee.caller.arguments[0];
	keys( e );
};

window.setInterval(function () {
	UpDataView( ctx, w, h );
}, 0);