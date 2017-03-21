(function() {
	'use strict';

	// situation one:
	function getNum(num) {
		if (num > 5) {
			return num;
		}
		return null;
	}
	var num = getNum(10);
	Logging.check(num);

	setTimeout(function() {
		num = getNum(3);
		Logging.check(num);		// will break here
	}, 0);

	// situation two:
	function simpleSwitch(num) {
		switch(num) {
			case 1:
			case 2:
				break;
			default:
				Logging.unReach();
		}
	}
	simpleSwitch(1);
	simpleSwitch(2);
	setTimeout(function() {
		simpleSwitch(3);	// will break here
	}, 0);
})();
