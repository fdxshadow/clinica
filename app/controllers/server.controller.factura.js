// Invocar modo JavaScript 'strict' 
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	Factura = mongoose.model('Factura'),
	Counters = mongoose.model('Counters');

// Crear un nuevo método controller para el manejo de errores
var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Error de servidor desconocido';
	}
};

// Crear un nuevo método controller para crear nuevos facturas
exports.create = function(req, res, next) {
	// Crear un nuevo objeto factura
	var factura = new Factura(req.body);
	// asignar el Schema.ObjectIdcorrespondiente, ya que req.body.tipoPago contiene solo el nombre del tipo de pago de la factura
	factura.tipoPago = req.tipoPago;
	factura.estado = 'Espera';
	factura.idFacturaInterno = req.idFacturaInterno;
	//  Intentar salvar el factura
 	factura.save(function(err) {
 		if (err) {
 			// Si ocurre algún error enviar el mensaje de error
 			return res.status(400).send({
 				message: getErrorMessage(err)
			});
		} else {
			req.factura = factura;
			next();
			// Enviar una representación JSON del factura
//			res.json(factura);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de facturas
exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de facturas
	Factura.find({}, function(err, facturas){
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(facturas);
		}
	});
};
// Crear un nuevo método controller que recupera una lista de facturas
exports.listByTipoPago = function(req, res) {
	// Usar el método model 'find' para obtener una lista de facturas
	Factura.find({tipoPago: req.tipoPago}, function(err, facturas){
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(facturas);
		}
	});
};
// Crear un nuevo método controller que recupera una lista de facturas
exports.listByTipoPago_estado = function(req, res) {
	// Usar el método model 'find' para obtener una lista de facturas
	Factura.find({tipoPago: req.tipoPago, estado: req.estado}, function(err, facturas){
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(facturas);
		}
	});
};


// Crear un nuevo método controller que devuelve un factura existente
exports.read = function(req, res) {
	res.json(req.factura);
};

// Crear un nuevo método controller que actualiza un factura existente
exports.update = function(req, res) {
	// Obtener el factura usando el objeto 'request'
	var factura = req.factura;
	// Actualizar los campos factura
	factura.codigoPago = req.body.codigoPago;
	factura.estado = req.body.estado;
	factura.monto = req.body.monto;
	factura.tipoPago = req.body.tipoPago;
	factura.glosa = req.body.glosa;
	factura.condicionesPago = req.body.condicionesPago;

	// Intentar salvar el factura actualizado
	factura.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del factura 
			res.json(factura);
		}
	});
};

// método controller que borre un factura existente
exports.delete = function(req, res) {
	// Obtener el factura usando el objeto 'request'
	var factura = req.factura;

	// Usar el método model 'remove' para borrar el factura
	factura.remove(function(err) {
		if (err) {
			// Si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del factura
			res.json(factura);
		}
	});
};

// middleware para obtener un documento por su id
// usado en las funciones read, update y delete
exports.facturaByID = function(req, res, next, id){
	Factura.findOne({
		_id: id
	}, function(err, factura){
		if (err) return next(err);
		if (!factura) return next(new Error('Fallo al cargar el factura ' + id));
		// Si un factura es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.factura = factura;
		// Llamar al siguiente middleware
		next();
	});
};

exports.getIdFacturaInterno = function(req, res, next){
    Counters.findOneAndUpdate(
    	{ _id: 'idFacturaInterno' },
    	{ $inc: { seq: 1 } },
    	function(err, counter){
			if (err) return next(err);
			if (!counter) return next(new Error('Fallo al cargar el counter ' + id));
			// Si un factura es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
			req.idFacturaInterno = counter.seq;
			next();
		}
	);
};
