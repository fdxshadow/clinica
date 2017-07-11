// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'pacientes'
angular.module('compraDirecta').factory('CompraDirectaResource', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' compradirectaId
    return $resource('api/compradirecta/:compradirectaId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);