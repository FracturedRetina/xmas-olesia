const TRUNK = [[130, 875.8443-412.36214], [230, 875.8443-412.36214], [230, 1000.8443-412.36214], [130, 1000.8443]];
const TREE = [[181.42188, 90], [123.21289, 189.17773], [65.003906, 288.35742], [108.59961, 288.66797], [50.095703, 390], [93.398438, 390], [35.662109, 490], [180, 490], [324.33789, 490], [266.60156, 390], [309.9043, 390], [251.99023, 289.69141], [294.99609, 290], [238.20898, 190], [181.42188, 90]];
const STAR = [[180, 429.4375305175781-412.36214], [199.9703369140625, 469.90179443359375-412.36214], [244.6252899169922, 476.3905334472656-412.36214], [212.31265258789062, 507.8875732421875-412.36214], [219.94061279296875, 552.3621215820312-412.36214], [179.99998474121094, 531.3641357421875-412.36214], [140.05935668945312, 552.3621826171875-412.36214], [147.6873321533203, 507.8876037597656-412.36214], [115.37470245361328, 476.39056396484375-412.36214], [160.02963256835938, 469.9018249511719-412.36214]];
const FULL = [[180, 17.076172], [160.0293, 57.539062], [115.375, 64.029297], [147.6875, 95.525391], [140.05859, 140], [157.43945, 130.86328], [123.21289, 189.17773], [65.003906, 288.35742], [108.59961, 288.66797], [50.095703, 390], [93.398438, 390], [35.662109, 490], [130, 490], [130, 588.48242], [230, 588.48242], [230, 490], [324.33789, 490], [266.60156, 390], [309.9043, 390], [251.99023, 289.69141], [294.99609, 290], [238.20898, 190], [205.50586, 132.41016], [219.94141, 140], [212.3125, 95.525391], [244.625, 64.029297], [199.9707, 57.539062], [180, 17.076172]];

const CYR = "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЮЯЬ";
const LAT = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var wholesomeEn;
var wholesomeUa;

var lines = [];

function loadTxt(url) {
	var text = "";
	$.ajax({
		"url": url,
		"dataType": "text",
		"async": false,
		"success": function(data) {
			text = data;
		}
	});
	return text;
}

function initLines(canvas, ctx) {
	var currY = canvas.height;
	for (var i = 0; currY > 0; i++) {
		lines.push({
			x: 0,
			y: currY,
			str: "",
			width: 0,
			size: (Math.random() * 18) + 12
		});
		var wordList = null;
		ctx.font = lines[i].size + "pt Arial";
		if (i % 2 == 0) {
			while (lines[i].width < canvas.width) {
				lines[i].str += wholesomeEn[Math.floor(wholesomeEn.length * Math.random())] + " ";
				lines[i].width = ctx.measureText(lines[i].str).width;
			}
		} else {
			while (lines[i].width < canvas.width) {
				lines[i].str += wholesomeUa[Math.floor(wholesomeUa.length * Math.random())] + " ";
				lines[i].width = ctx.measureText(lines[i].str).width;
			}
		}

		lines[i].x = Math.random() * lines[i].width;
		currY -= lines[i].size;
	}
}

function step(canvas, ctx) {
	for (var i = 0; i < lines.length; i++) {
		if (lines[i].x > lines[i].width) {
			lines[i].x -= lines[i].width;
		} else if (lines[i].x < -lines[i].width) {
			lines[i].x += lines[i].width;
		}
		if (i % 2 == 0) {
			lines[i].x -= 1;
		} else {
			lines[i].x += 1;
		}
	}
}

function clipTree(ctx, path, color) {
	ctx.save();

	ctx.beginPath();
	for (var i = 0; i < path.length; i++) {
		ctx.lineTo(path[i][0], path[i][1]);
	}
	ctx.closePath();

	ctx.clip();

	ctx.fillStyle = color;
	drawUnclipped(ctx);

	ctx.restore();
}

function drawUnclipped(ctx) {
	for (var i = 0; i < lines.length; i++) {
		ctx.font = lines[i].size + "pt Arial";
		// if (inside([lines[i].x, lines[i].y], TRUNK)) {
		// 	ctx.fillStyle = "olive";
		// } else if (inside([lines[i].x, lines[i].y], TREE)) {
		// 	ctx.fillStyle = "green";
		// } else if (inside([lines[i].x, lines[i].y], STAR)) {
		// 	ctx.fillStyle = "yellow";
		// }
		ctx.fillText(lines[i].str, lines[i].x, lines[i].y);
		ctx.fillText(lines[i].str, lines[i].x - lines[i].width, lines[i].y);
		ctx.fillText(lines[i].str, lines[i].x + lines[i].width, lines[i].y);
	}
}