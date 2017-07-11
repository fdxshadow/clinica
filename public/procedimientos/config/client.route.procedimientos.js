// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'procedimientos'
angular.module('procedimientos').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/procedimientos', {
			templateUrl: 'procedimientos/views/client.view.procedimientos.html',
			controller: 'ProcedimientosController'
		}).
		when('/procedimientos/create', {
			templateUrl: 'procedimientos/views/client.view.procedimiento.add.html',
			controller: 'ProcedimientosController'
		}).
		when('/procedimientos/:procedimientoId/edit', {
			templateUrl: 'procedimientos/views/client.view.procedimiento.edit.html',
			controller: 'ProcedimientosController'
		});
	}
]); 