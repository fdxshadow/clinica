// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'pacientes'
angular.module('licitaciones').factory('LicitacionesResource', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' paciente
    return $resource('api/licitaciones/:licitacionId', {
        licitacionId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);