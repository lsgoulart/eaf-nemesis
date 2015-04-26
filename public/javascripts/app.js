(function(angular){
	'use strict';

	angular.module('App', [
		'ngRoute',
		'ngAnimate',
		'toastr',
		'firebase',

		'App.controllers',
		'App.services',
	])
	.config(function($routeProvider, $locationProvider){

		$routeProvider
			.when('/', {
				controller: 'LoginController',
				controllerAs: 'vm',
				templateUrl: 'javascripts/login/view.html',
				resolve: {
				    "currentAuth": ['Auth', '$location', function(Auth, $location) {
				    	Auth.$waitForAuth().then(function(data){
				    		if(data){
				    			$location.path('/dashboard');
				    		}
				    	});

						return Auth.$waitForAuth();
				    }]
				}
			})
			.when('/dashboard', {
				controller: 'DashboardController',
				controllerAs: 'vm',
				templateUrl: 'javascripts/dashboard/view.html',
				resolve: {
				    "currentAuth": ["Auth", function(Auth) {
						return Auth.$requireAuth();
				    }]
				}
			})
			.when('/register', {
				controller: 'RegisterController',
				controllerAs: 'vm',
				templateUrl: 'javascripts/register/view.html'
			})
			.otherwise({
				redirectTo: '/'
			});
		$locationProvider.html5Mode(true);

	}).run(['$rootScope', 'Auth', function($rootScope, Auth){

		Auth.$onAuth(function(user){
			$rootScope.loggedIn = !!user;
		});

	}]).run(["$rootScope", "$location", function($rootScope, $location) {

		$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
			if (error === "AUTH_REQUIRED") {
				$location.path("/");
			}
		});

	}]);

})(angular);