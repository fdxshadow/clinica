// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'facturas'
angular.module('facturas').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/facturas', {
			templateUrl: 'facturas/views/client.view.facturas.html',
			controller: 'FacturasController'
		}).
		when('/facturas/create', {
			templateUrl: 'facturas/views/client.view.factura.add.html',
			controller: 'FacturasController'
		}).
		when('/facturas/:facturaId/edit', {
			templateUrl: 'facturas/views/client.view.factura.edit.html',
			controller: 'FacturasController'
		});
	}
]); 