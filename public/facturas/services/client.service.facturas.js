// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'pacientes'
angular.module('facturas').factory('FacturasResource', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' paciente
    return $resource('api/facturas/:facturaId/:nombreTipoPago/:nombreEstado', {
        facturaId: '@_id',
		nombreTipoPago: '@nombreTipoPago',
		nombreEstado: '@nombreEstado'
    },
    {
        update: {
            method: 'PUT'
        }
    });
}]);