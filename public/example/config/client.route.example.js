angular.module('clinicaApp').config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/home_administrativo', {
		templateUrl: 'example/views/client.view.home_administrativo.html',
		controller: 'ExampleController'
	})
	.when('/home_directivo', {
		templateUrl: 'example/views/client.view.home_directivo.html',
		controller: 'ExampleController'
	})
	.when('/movimientos_detallados', {
		templateUrl: 'example/views/client.view.movimientos_detallados.html',
		controller: 'MovimientosDetalladosController'
	})
	.when('/tipo_egreso', {
		templateUrl: 'example/views/client.view.tipo_egreso.html'
	})
	.when('/not_found', {
		templateUrl: '/example/views/404.html'
	})
	.when('/', {
		redirectTo: '/not_found'
	})
	.otherwise({
		redirectTo: '/not_found'
	});
}]);