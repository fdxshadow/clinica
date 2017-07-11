// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var users = require('../../app/controllers/server.controller.users'),
	licitacion = require('../../app/controllers/server.controller.licitacion');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'licitacions'  
	app.route('/api/licitaciones')
	   .get(users.requiresLogin, licitacion.list)
	   .post(users.requiresLogin, licitacion.create);
	
	// Configurar las rutas 'licitacions' parametrizadas
	app.route('/api/licitaciones/:licitacionId')
	   .get(users.requiresLogin, licitacion.read)
	   .put(users.requiresLogin, licitacion.update)
	   .delete(users.requiresLogin, licitacion.delete);

	// Configurar el parámetro middleware 'licitacionId'   
	app.param('licitacionId', licitacion.licitacionByID);
};