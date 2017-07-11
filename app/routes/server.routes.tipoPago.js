// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var users = require('../../app/controllers/server.controller.users'),
	tipoPago = require('../../app/controllers/server.controller.tipoPago');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'tipoPagos'  
	app.route('/api/tipoPagos')
	   .get(users.requiresLogin, tipoPago.list)
	   .post(users.requiresLogin, tipoPago.create);
	
	// Configurar las rutas 'tipoPagos' parametrizadas
	app.route('/api/tipoPagos/:tipoPagoId')
	   .get(users.requiresLogin, tipoPago.read)
	   .put(users.requiresLogin, tipoPago.update)
	   .delete(users.requiresLogin, tipoPago.delete);

	// Configurar el parámetro middleware 'tipoPagoId'   
	app.param('tipoPagoId', tipoPago.tipoPagoByID);
};