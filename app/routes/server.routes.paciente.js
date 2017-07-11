// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var users = require('../../app/controllers/server.controller.users'),
	paciente = require('../../app/controllers/server.controller.paciente');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'pacientes'  
	app.route('/api/pacientes')
	   .get(users.requiresLogin, paciente.list)
	   .post(users.requiresLogin, paciente.create);
	
	// Configurar las rutas 'pacientes' parametrizadas
	app.route('/api/pacientes/:pacienteId')
	   .get(users.requiresLogin, paciente.read)
	   .put(users.requiresLogin, paciente.update)
	   .delete(users.requiresLogin, paciente.delete);

	// Configurar el parámetro middleware 'pacienteId'   
	app.param('pacienteId', paciente.pacienteByID);
};