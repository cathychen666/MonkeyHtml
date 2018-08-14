function show() {
    document.getElementById("background").style.display = "block";
}
 
window.onclick = function close(e) {
    var div = document.getElementById("background");
	if (e.target == div) {
		div.style.display = "none";
	}
}