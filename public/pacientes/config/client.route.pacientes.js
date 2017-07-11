// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'pacientes'
angular.module('pacientes').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/tipo_paciente', {
			templateUrl: 'pacientes/views/client.view.tipo_paciente.html'
		}).
		when('/pacientes', {
			templateUrl: 'pacientes/views/client.view.pacientes.html',
			controller: 'PacientesController'
		}).
		when('/pacientes/create', {
			templateUrl: 'pacientes/views/client.view.paciente.add.html',
			controller: 'PacientesController'
		}).
		when('/pacientes/:pacienteId', {
			templateUrl: 'pacientes/views/client.view.paciente.html',
			controller: 'PacientesController'
		}).
		when('/pacientes/:pacienteId/edit', {
			templateUrl: 'pacientes/views/client.view.paciente.edit.html',
			controller: 'PacientesController'
		});
	}
]); 