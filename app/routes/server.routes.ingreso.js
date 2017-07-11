// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var users = require('../../app/controllers/server.controller.users'),
	ingreso = require('../../app/controllers/server.controller.ingreso'),
	tipoPago = require('../../app/controllers/server.controller.tipoPago');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'ingresos'
	app.route('/api/ingresos')
	   .get(users.requiresLogin, ingreso.list)
	   .post(users.requiresLogin, ingreso.create);

	// Configurar las rutas 'ingresos' parametrizadas
	app.route('/api/ingresos/:fecha')
	   .get(users.requiresLogin, ingreso.listByFecha);
		
	// Configurar las rutas 'ingresos' parametrizadas
	app.route('/api/ingresos/:facturaId')
	   .get(users.requiresLogin, ingreso.listByFactura);

	// Configurar las rutas 'ingresos' parametrizadas
	app.route('/api/ingresos/:ingresoId')
	   .get(users.requiresLogin, ingreso.read)
	   .put(users.requiresLogin, ingreso.update)
	   .delete(users.requiresLogin, ingreso.delete);

	// Configurar las rutas 'ingresos' parametrizadas
	app.route('/api/ingresos/:nombreTipoPago')
	   .get(users.requiresLogin, ingreso.listByTipoPago)
	   .post(users.requiresLogin, ingreso.create);
	// Configurar el parámetro middleware 'tipoPago'

	// Configurar las rutas 'ingresos' parametrizadas
	app.route('/api/ingresos/:nombreTipoPago/:nombreEstado')
	   .get(users.requiresLogin, ingreso.listByTipoPago_Estado)
	   .post(users.requiresLogin, ingreso.create);

	// configurar parametros
	app.param('facturaId', ingreso.paramFacturaID);
	app.param('ingresoId', ingreso.ingresoByID);
	app.param('nombreTipoPago', tipoPago.tipoPagoByNombre);
	app.param('nombreEstado', ingreso.paramEstado);
	app.param('fecha', ingreso.dateByString);
};
