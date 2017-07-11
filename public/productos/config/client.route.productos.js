// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'pacientes'
angular.module('productos').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/productos', {
			templateUrl: 'productos/views/client.view.productos.html',
			controller: 'ProductosController'
		}).
		when('/productos/create', {
			templateUrl: 'productos/views/client.view.producto.add.html',
			controller: 'ProductosController'
		}).
		when('/productos/:licitacionId', {
			templateUrl: 'productos/views/client.view.producto.html',
			controller: 'ProductosController'
		}).
		when('/productos/:licitacionId/edit', {
			templateUrl: 'productos/views/client.view.producto.edit.html',
			controller: 'ProductosController'
		});
	}
]); 