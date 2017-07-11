// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'pacientes'
angular.module('licitaciones').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/licitaciones', {
			templateUrl: 'licitaciones/views/client.view.licitaciones.html',
			controller: 'LicitacionesController'
		}).
		when('/licitaciones/create', {
			templateUrl: 'licitaciones/views/client.view.licitacion.add.html',
			controller: 'LicitacionesController'
		}).
		when('/licitaciones/:licitacionId', {
			templateUrl: 'licitaciones/views/client.view.licitacion.html',
			controller: 'LicitacionesController'
		}).
		when('/licitaciones/:licitacionId/edit', {
			templateUrl: 'licitaciones/views/client.view.licitaciones.edit.html',
			controller: 'LicitacionesController'
		});
	}
]); 