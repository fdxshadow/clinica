angular.module('clinicaApp').controller('ExampleController', ['$scope', 'Authentication', 
	function($scope, Authentication){
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;
	}
]);