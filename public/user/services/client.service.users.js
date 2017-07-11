// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'pacientes'
angular.module('users').factory('UsersResource', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' paciente
    return $resource('api/users/:userId', {
        userId: '@_id'
    },
    {
        update: {
            method: 'PUT'
        }
    });
}]);