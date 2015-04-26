(function(angular){
	'use strict';

	angular.module('App.register.controller', [])
		.controller('RegisterController', RegisterController);

		function RegisterController($scope, toastr, Auth){
			var vm = this;

			vm.register = function(){
				if(!$scope.email && !$scope.password){
					toastr.error('Parece que voce esqueceu de preencher os campos', 'Ooops!');
				} else if(!$scope.email){
					toastr.error('Para se cadastrar, preencha o e-mail!', 'Hey!');
				} else if(!$scope.password){
					toastr.error('Cade sua senha?', 'Ooooow!');
				} else {
					Auth.$createUser({
						email    : $scope.email,
						password : $scope.password
					}).then(function(userData) {
						console.log("Successfully created user account with uid:", userData.uid);
						toastr.success('Usuário '+ userData.uid + ' criado com maestria!', 'Aeeee!');

						Auth.$authWithPassword({
							email: $scope.email,
							password: $scope.password
						}).then(function(userData){
							toastr.success('Usuário '+ userData.uid + ' agora está logado!', 'Aeeee!');
						}).catch(function(err){
							toastr.error('Erro ao tentar logar', 'Fuuu!');
						});

					}).catch(function(err){
						if(err) toastr.error('Algo deu errado!', 'Viiiish');
					});
				}
			}
		}
})(angular);