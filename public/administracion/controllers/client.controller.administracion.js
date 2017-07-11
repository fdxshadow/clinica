angular.module('administracion').controller('AdministracionController', ['$scope', 'Authentication',
	function($scope, Authentication){
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;
	}
]);