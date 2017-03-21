/*
 * logging.js
 * created by Sheldon Law on 2017-03-21
 */
(function() {
	'use strict';

	// TODO: maybe we can add env variable to rm console.log in production.
	var log = function(msg) {
		console.log(msg);
	};

    var Logging = {};

    Logging.version = '1.0.0';

    Logging.check = function(variable) {
		if(variable == null) {
			log('get null exception');
			throw new Error('Get null exception');
		}
    };

    Logging.unReach = function() {
		log('get unreach position');
		throw new Error('Get unreach position in switch');
    };

    window.Logging = Logging;
})();
