// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'pacientes'
angular.module('ingresos').factory('IngresosResource', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' paciente
    return $resource('api/ingresos/:ingresoId/:nombreTipoPago/:nombreEstado/:facturaId/:fecha', {
			ingresoId: '@_id',
			nombreTipoPago: '@nombreTipoPago',
			nombreEstado: '@nombreEstado',
            facturaId: '@facturaId',
            fecha: '@fecha'
        }, {
        update: {
            method: 'PUT'
        }
    });
}]);