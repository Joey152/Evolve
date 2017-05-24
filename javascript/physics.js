var Vertex = function(x, y, z) {
	this.x = parseFloat(x);
	this.y = parseFloat(y);
	this.z = parseFloat(z);
}

var Cube = function(center, size) {
	var d = size/2;

	this.vertices = [
		new Vertex(center.x - d, center.y - d, center.z + d),
        new Vertex(center.x - d, center.y - d, center.z - d),
        new Vertex(center.x + d, center.y - d, center.z - d),
        new Vertex(center.x + d, center.y - d, center.z + d),
        new Vertex(center.x + d, center.y + d, center.z + d),
        new Vertex(center.x + d, center.y + d, center.z - d),
        new Vertex(center.x - d, center.y + d, center.z - d),
        new Vertex(center.x - d, center.y + d, center.z + d)
	];

	this.faces = [
		[this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]],
		[this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]],
        [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]],
        [this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]],
        [this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]],
        [this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]]
	];
}

var Vertex2D = function(x, y) {
	this.x = parseFloat(x);
	this.y = parseFloat(y);
}

function render(objects, ctx, dx, dy) {
	// Clear the previous 
	ctx.clearRect(0, 0, 2*dx, 2*dy);

	for (var i = 0; i < objects.length; i++) {
		for (var j = 0; j < objects[i].faces.length; j++) {
			var face = objects[i].faces[j];

			// draw first vertex
			var P = project(face[0]);
			ctx.beginPath();
			ctx.moveTo(P.x + dx, P.y + dy);

			// draw other vertices
			for (var v = 1; v < face.length; v++) {
				P = project(face[v]);
				ctx.lineTo(P.x + dx, P.y + dy);
			}

			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		}
	}
}

function project(M) {
	var d = 200;
	var r = d / M.y;

	return new Vertex2D(r * M.x, r * M.z);
}

function rotate(M, center, theta, phi) {
	var ct = Math.cos(theta);
	var st = Math.sin(theta);
	var cp = Math.cos(theta);
	var sp = Math.sin(theta);

	var x = M.x - center.x;
	var y = M.y - center.y;
	var z = M.z - center.z;

	M.x = ct * x - st * cp * y + st * sp * z + center.x;
    M.y = st * x + ct * cp * y - ct * sp * z + center.y;
    M.z = sp * y + cp * z + center.z;
}

(function() {
	var canvas = document.getElementById('gameDisplay');
	canvas.width = canvas.getAttribute('width');
	canvas.height = canvas.getAttribute('height');
	console.log(canvas.height);
	var dx = canvas.width / 2;
	var dy = canvas.height / 2;

	var ctx = canvas.getContext('2d');
	ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
	ctx.fillStyle = 'rgba(0, 150, 255, 0.3)';

	var cubeCenter = new Vertex(0, 11 * dy / 10, 0);
	var cube = new Cube(cubeCenter, dy);
	var objects = [cube];

	render(objects, ctx, dx, dy);

	function autorotate() {
        for (var i = 0; i < 8; ++i)
            rotate(cube.vertices[i], cubeCenter, -Math.PI / 720, Math.PI / 720);

        render(objects, ctx, dx, dy);

        autorotate_timeout = setTimeout(autorotate, 30);
    }
    autorotate_timeout = setTimeout(autorotate, 2000);
})();
