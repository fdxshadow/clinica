// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var users = require('../../app/controllers/server.controller.users'),
	compraDirecta = require('../../app/controllers/server.controller.compradirecta');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'compradirecta'
	app.route('/api/compradirecta')
	   .get(users.requiresLogin, compraDirecta.list)
	   .post(users.requiresLogin, compraDirecta.create);
	
	// Configurar las rutas 'compradirecta' parametrizadas
	app.route('/api/compradirecta/:compradirectaId')
	   .get(users.requiresLogin, compraDirecta.read)
	   .put(users.requiresLogin, compraDirecta.update)
	   .delete(users.requiresLogin, compraDirecta.delete);

	// Configurar el parámetro middleware 'compradirectaId'   
	app.param('compradirectaId', compraDirecta.compraDirectaByID);
};