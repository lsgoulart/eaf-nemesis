(function(angular){
	'use strict';

	angular.module('App.services', [])
		.factory("Auth", ['$firebaseAuth', 'fbConfig',
			function($firebaseAuth, fbConfig) {
				console.log(fbConfig);
				var ref = new Firebase(fbConfig.uri);
				return  $firebaseAuth(ref);
			}
		]);
})(angular)