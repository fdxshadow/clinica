// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'ingresos'
angular.module('ingresos').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/ingresos', {
			templateUrl: 'ingresos/views/client.view.ingresos.html',
			controller: 'ingresosController'
		}).
		when('/registrar_ingreso', {
			templateUrl: 'ingresos/views/client.view.ingreso.add.html',
			controller: 'RegistrarIngresoController'
		})
	}
]); 