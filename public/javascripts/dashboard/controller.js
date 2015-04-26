(function(angular){
	'use strict';

	angular.module('App.dashboard.controller', [])
		.controller('DashboardController', DashboardController);

		function DashboardController($scope, toastr, Auth, $location){
			var vm = this;

			vm.logout = function(){
				Auth.$unauth();
				$location.path("/");
			};
		}
})(angular);