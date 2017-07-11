// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'tipoPago'
angular.module('tipoPago').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/tipoPagos', {
			templateUrl: 'tipoPago/views/client.view.tipoPagos.html',
			controller: 'TipoPagoController'
		}).
		when('/tipoPagos/create', {
			templateUrl: 'tipoPago/views/client.view.tipoPago.add.html',
			controller: 'TipoPagoController'
		}).
		when('/tipoPagos/:tipoPagoId/edit', {
			templateUrl: 'tipoPago/views/client.view.tipoPago.edit.html',
			controller: 'TipoPagoController'
		});
	}
]); 