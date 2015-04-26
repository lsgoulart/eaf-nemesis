(function(angular){
	'use strict';

	angular.module('App.services', [])
		.factory("Auth", ["$firebaseAuth",
			function($firebaseAuth) {
				var ref = new Firebase("https://ink-schedule.firebaseio.com");
				return  $firebaseAuth(ref);
			}
		]);
})(angular)