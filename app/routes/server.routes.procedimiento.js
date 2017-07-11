// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var users = require('../../app/controllers/server.controller.users'),
	procedimiento = require('../../app/controllers/server.controller.procedimiento');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'procedimientos'  
	app.route('/api/procedimientos')
	   .get(users.requiresLogin, procedimiento.list)
	   .post(users.requiresLogin, procedimiento.create);
	
	// Configurar las rutas 'procedimientos' parametrizadas
	app.route('/api/procedimientos/:procedimientoId')
	   .get(users.requiresLogin, procedimiento.read)
	   .put(users.requiresLogin, procedimiento.update)
	   .delete(users.requiresLogin, procedimiento.delete);

	// Configurar el parámetro middleware 'procedimientoId'   
	app.param('procedimientoId', procedimiento.procedimientoByID);
};