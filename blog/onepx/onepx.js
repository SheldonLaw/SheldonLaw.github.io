// 自动适配设备devicePixelRatio，打造完美1px边框

(function() {
	var scale = 1 / window.devicePixelRatio;
	var style = document.createElement('style');
	var styleText = "";
	styleText += ".b-1-left:after, .b-1-right:after { transform: scaleX(" + scale + "); -webkit-transform: scaleX(" + scale + "); }";
	styleText += ".b-1-top:after, .b-1-bottom:after { transform: scaleY(" + scale + "); -webkit-transform: scaleY(" + scale + "); }";
	style.innerText = styleText;
	document.head.append(style);
})();