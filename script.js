$(document).ready(function() {
	var canvas = document.getElementById("tree");
	var ctx = canvas.getContext("2d");

	wholesomeEn = loadTxt("res/wholesome-en.txt").split("\n");
	wholesomeUa = loadTxt("res/wholesome-ua.txt").split("\n");

	initLines(canvas, ctx);
	setInterval(function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		clipTree(ctx, TRUNK, "olive");
		clipTree(ctx, TREE, "green");
		clipTree(ctx, STAR, "yellow");
		step(canvas, ctx);
	}, 50);

	layout();
	new CircleType(document.getElementById('head-ua'))
			.radius(384);
	new CircleType(document.getElementById('head-en'))
			.radius(384)
			.dir(-1);
	$(window).resize(layout);
});