// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var users = require('../../app/controllers/server.controller.users'),
	medico = require('../../app/controllers/server.controller.medico');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'medicos'  
	app.route('/api/medicos')
	   .get(users.requiresLogin, medico.list)
	   .post(users.requiresLogin, medico.create);
	
	// Configurar las rutas 'medicos' parametrizadas
	app.route('/api/medicos/:medicoId')
	   .get(users.requiresLogin, medico.read)
	   .put(users.requiresLogin, medico.update)
	   .delete(users.requiresLogin, medico.delete);

	// Configurar el parámetro middleware 'medicoId'   
	app.param('medicoId', medico.medicoByID);
};