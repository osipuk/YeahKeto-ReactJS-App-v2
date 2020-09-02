(function() {
	var head = document.getElementsByTagName("head")[0];
	var script = document.createElement('SCRIPT');

	script.src = "/static/assets/js/googleTagManagerHead.js";

	head.insertBefore(script, head.childNodes[2]);
})();
