// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'pacientes'
angular.module('tipoPago').factory('TipoPagoResource', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' paciente
    return $resource('api/tipoPagos/:tipoPagoId', {
        tipoPagoId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);