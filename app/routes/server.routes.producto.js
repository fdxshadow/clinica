// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var users = require('../../app/controllers/server.controller.users'),
	producto = require('../../app/controllers/server.controller.producto');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'productos'  
	app.route('/api/productos')
	   .get(users.requiresLogin, producto.list)
	   .post(users.requiresLogin, producto.create);
	
	// Configurar las rutas 'productos' parametrizadas
	app.route('/api/productos/:productoId')
	   .get(users.requiresLogin, producto.read)
	   .put(users.requiresLogin, producto.update)
	   .delete(users.requiresLogin, producto.delete);

	// Configurar el parámetro middleware 'productoId'   
	app.param('productoId', producto.productoByID);
};