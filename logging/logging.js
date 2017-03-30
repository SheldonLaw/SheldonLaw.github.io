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

    Logging.version = '1.0.1';

    Logging.check = function(target, expectation) {
		// Logging.check(a) 	-> to ensure 'a' is a not null variables
		// Logging.check(a, b) 	-> to ensure 'a = b'
		if(expectation == null) {
			if(target == null) {
				log('get null exception');
				throw new Error('Get null exception');
			}
		}else if(target != expectation) {
			log('get unequal exception');
			throw new Error('Get unequal exception');
		}
    };

    Logging.unReach = function() {
      log('get unreach position');
      throw new Error('Get unreach position in switch');
    };

    Logging.checkUE = function(target, expectation) {
		if(target === expectation) {
			log('get unexpected equality');
			throw new Error('Get unexpected equality');
		}
    };

    window.Logging = Logging;
})();
