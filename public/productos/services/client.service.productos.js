// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'pacientes'
angular.module('productos').factory('ProductosResource', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' paciente
    return $resource('api/productos/:productoId', {
        productoId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);