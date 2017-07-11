// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var users = require('../../app/controllers/server.controller.users'),
	factura = require('../../app/controllers/server.controller.factura'),
	ingreso = require('../../app/controllers/server.controller.ingreso'),
	tipoPago = require('../../app/controllers/server.controller.tipoPago');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'facturas'  
	app.route('/api/facturas')
	   .get(users.requiresLogin, factura.list)
	   .post(users.requiresLogin, tipoPago.tipoPagoByNombreInRequest ,factura.getIdFacturaInterno, factura.create, ingreso.facturarIngresos);
	
	// Configurar las rutas 'facturas' parametrizadas
	app.route('/api/facturas/:nombreTipoPago')
	   .get(users.requiresLogin, factura.listByTipoPago);
//	   .post(users.requiresLogin, factura.getIdFacturaInterno, factura.create, ingreso.facturarIngresos);

	app.route('/api/facturas/:nombreTipoPago/:nombreEstado')
	   .get(users.requiresLogin, factura.listByTipoPago_estado);

	// Configurar las rutas 'facturas' parametrizadas
	app.route('/api/facturas/:facturaId')
	   .get(users.requiresLogin, factura.read)
	   .put(users.requiresLogin, factura.update)
	   .delete(users.requiresLogin, factura.delete);

	// Configurar el parámetro middleware 'facturaId'   
	app.param('facturaId', factura.facturaByID);
	app.param('nombreTipoPago', tipoPago.tipoPagoByNombre);
	app.param('nombreEstado', ingreso.paramEstado);
};