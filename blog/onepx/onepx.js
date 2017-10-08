// 自动适配设备devicePixelRatio，打造完美1px边框

(function() {
	var scale = 1 / window.devicePixelRatio;
	var style = document.createElement('style');
	var styleText = '';
	styleText += '.b-1-left:after, .b-1-right:after { transform: scaleX(' + scale + ')!important; -webkit-transform: scaleX(' + scale + ')!important; }';
	styleText += '.b-1-top:after, .b-1-bottom:after { transform: scaleY(' + scale + ')!important; -webkit-transform: scaleY(' + scale + ')!important; }';
	styleText += '.b-o.b-1-left:after {margin-left: -' + scale + 'px!important; } .b-o.b-1-right:after {margin-right: -' + scale + 'px!important; } .b-o.b-1-top:after {margin-top: -' + scale + 'px!important; } .b-o.b-1-bottom:after {margin-bottom: -' + scale + 'px!important; }';
  styleText += '.b-o-n.b-1-left {margin-left: ' + scale + 'px!important; } .b-o-n.b-1-left:after {margin-left: -' + scale + 'px!important; } .b-o-n.b-1-right {margin-right: ' + scale + 'px!important; } .b-o-n.b-1-right:after {margin-right: -' + scale + 'px!important; } .b-o-n.b-1-top {margin-top: ' + scale + 'px!important; } .b-o-n.b-1-top:after {margin-top: -' + scale + 'px!important; } .b-o-n.b-1-bottom {margin-bottom: ' + scale + 'px!important; } .b-o-n.b-1-bottom:after {margin-bottom: -' + scale + 'px!important; }';
  style.innerText = styleText;
	document.head.append(style);
})();
