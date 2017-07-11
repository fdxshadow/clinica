// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'pacientes'
angular.module('directivos').factory('DirectivosResource', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' paciente
    return $resource('api/resumenfinanciero/:year/:month', {
	        year: '@year',
	        month: '@month'
    	}, {
        update: {
            method: 'PUT'
        }
    });
}]);