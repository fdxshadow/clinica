// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'compradirecta'
angular.module('compraDirecta').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/compraDirecta', {
			templateUrl: 'compradirecta/views/client.view.compradirecta.html',
			controller: 'CompraDirectaController'
		}).
		when('/compraDirecta/create', {
			templateUrl: 'compradirecta/views/client.view.compradirecta.add.html',
			controller: 'CompraDirectaController'
		}).
		when('/compraDirecta/:medicoId/edit', {
			templateUrl: 'compradirecta/views/client.view.compradirecta.edit.html',
			controller: 'CompraDirectaController'
		});
	}
]); 