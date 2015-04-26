(function(angular){
	'use strict';

	angular.module('App.dashboard.controller', [])
		.controller('DashboardController', DashboardController);

		function DashboardController($scope, toastr, Auth, $location){
			var vm = this;

			vm.logout = function(){
				console.log(Auth);
				Auth.$unauth();
				$location.path("/");
			};
		}
})(angular);