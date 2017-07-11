// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'pacientes'
angular.module('medicos').factory('MedicosResource', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' paciente
    return $resource('api/medicos/:medicoId', {
        medicoId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);