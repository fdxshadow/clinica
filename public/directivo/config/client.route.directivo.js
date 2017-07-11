angular.module('directivos').config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/resumen_financiero', {
		templateUrl: 'directivo/views/client.view.resumen_financiero.html',
		controller: 'DirectivosController'
	})
	.when('/resumen_ingresos', {
		templateUrl: 'directivo/views/client.view.resumen_ingresos.html',
		controller: 'IngresosController'
	})
	.when('/resumen_egresos', {
		templateUrl: 'directivo/views/client.view.resumen_egresos.html'
	});
}]);