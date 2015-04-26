(function(angular){
	'use strict';

	angular.module('App.login.controller', [])
		.controller('LoginController', LoginController);

	function LoginController($scope, toastr, Auth, $location){
		var vm = this;
		console.log('LoginController');

		vm.login = function(){
			if(!$scope.email && !$scope.password){
				toastr.error('Parece que voce esqueceu de preencher os campos', 'Ooops!');
			} else if(!$scope.email){
				toastr.error('Se quer logar, preenche o e-mail!', 'Hey!');
			} else if(!$scope.password){
				toastr.error('Cade sua senha?', 'Ooooow!');
			} else {
				Auth.$authWithPassword({
					email    : $scope.email,
					password : $scope.password
				}).then(function(authData) {
					if(authData) {
						console.log("Authenticated successfully with payload:", authData);
						$location.path("/dashboard");
					}
				}).catch(function(error){
					if(error){
						console.log(error);
						switch(error.code){
							case 'INVALID_USER':
								toastr.error('Parece que este usuario ainda não foi cadastrado');
								break;

							case 'INVALID_EMAIL':
								toastr.error('Parece que este e-mail ainda não foi cadastrado');
								break;

							case 'INVALID_PASSWORD':
								toastr.error('Parece que voce errou sua senha! Tente novamente!');
								break;
						}
					}
				});
			};
		};
	};

})(angular);