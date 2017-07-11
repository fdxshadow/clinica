// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'pacientes'
angular.module('procedimientos').factory('ProcedimientosResource', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' paciente
    return $resource('api/procedimientos/:procedimientoId', {
        procedimientoId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);