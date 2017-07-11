angular.module('administracion').config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/home_administrador', {
		templateUrl: 'administracion/views/client.view.home_administrador.html',
		controller: 'AdministracionController'
	})
}]);