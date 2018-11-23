function layout() {
	$('.panel').css("height", $(window).height());
	new CircleType(document.getElementById('head-ua'))
			.radius(384);
	new CircleType(document.getElementById('head-en'))
			.radius(384)
			.dir(-1);
	$('#tree').css("height", $(window).height() * 0.75);
}