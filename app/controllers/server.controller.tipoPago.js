// Invocar modo JavaScript 'strict' 
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	TipoPago = mongoose.model('TipoPago');

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

// Crear un nuevo método controller para crear nuevos tipoPagos
exports.create = function(req, res) {
	// Crear un nuevo objeto tipoPago
	var tipoPago = new TipoPago(req.body);

	// Intentar salvar el tipoPago
	tipoPago.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del tipoPago
			res.json(tipoPago);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de tipoPagos
exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de tipoPagos
	TipoPago.find({}, function(err, tipoPagos){
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(tipoPagos);
		}
	});
};

// Crear un nuevo método controller que devuelve un tipoPago existente
exports.read = function(req, res) {
	res.json(req.tipoPago);
};

// Crear un nuevo método controller que actualiza un tipoPago existente
exports.update = function(req, res) {
	// Obtener el tipoPago usando el objeto 'request'
	var tipoPago = req.tipoPago;

	// Actualizar los campos tipoPago
	tipoPago.nombre = req.body.nombre;
	tipoPago.descuento = req.body.descuento;

	// Intentar salvar el tipoPago actualizado
	tipoPago.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del tipoPago 
			res.json(tipoPago);
		}
	});
};

// método controller que borre un tipoPago existente
exports.delete = function(req, res) {
	// Obtener el tipoPago usando el objeto 'request'
	var tipoPago = req.tipoPago;

	// Usar el método model 'remove' para borrar el tipoPago
	tipoPago.remove(function(err) {
		if (err) {
			// Si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del tipoPago
			res.json(tipoPago);
		}
	});
};

// middleware para obtener un documento por su id
// usado en las funciones read, update y delete
exports.tipoPagoByID = function(req, res, next, id){
	TipoPago.findOne({
		_id: id
	}, function(err, tipoPago){
		if (err) return next(err);
		if (!tipoPago) return next(new Error('Fallo al cargar el tipoPago ' + id));
		// Si un tipoPago es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.tipoPago = tipoPago;
		// Llamar al siguiente middleware
		next();
	});
};

// middleware para obtener un documento por su id
// usado en las funciones read, update y delete
exports.tipoPagoByNombre = function(req, res, next, _nombre){
	TipoPago.findOne({
		nombre: _nombre
	}, function(err, tipoPago){
		if (err) return next(err);
		if (!tipoPago) return next(new Error('Fallo al cargar el tipoPago ' + _nombre));
		// Si un tipoPago es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.tipoPago = tipoPago;
		// Llamar al siguiente middleware
		next();
	});
};


exports.tipoPagoByNombreInRequest = function(req, res, next){
	var _nombre = req.body.tipoPago;
	TipoPago.findOne({
		nombre: _nombre
	}, function(err, tipoPago){
		if (err) return next(err);
		if (!tipoPago) return next(new Error('Fallo al cargar el tipoPago ' + _nombre));
		// Si un tipoPago es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.tipoPago = tipoPago;
		// Llamar al siguiente middleware
		next();
	});
};
