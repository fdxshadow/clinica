// Invocar modo JavaScript 'strict' 
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	CompraDirecta = mongoose.model('CompraDirecta');

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

// Crear un nuevo método controller para crear nuevos compraDirectas
exports.create = function(req, res) {
	// Crear un nuevo objeto compraDirecta
	var compraDirecta = new CompraDirecta(req.body);

	// Intentar salvar el compraDirecta
	compraDirecta.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			console.log(err);
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del compraDirecta
			res.json(compraDirecta);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de compraDirectas
exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de compraDirectas
	CompraDirecta.find({}, function(err, compraDirectas){
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(compraDirectas);
		}
	});
};

// Crear un nuevo método controller que devuelve un compraDirecta existente
exports.read = function(req, res) {
	res.json(req.compraDirecta);
};

// Crear un nuevo método controller que actualiza un compraDirecta existente
exports.update = function(req, res) {
	// Obtener el compraDirecta usando el objeto 'request'
	var compraDirecta = req.compraDirecta;

	// Actualizar los campos compraDirecta
	compraDirecta.run = req.body.run;
	compraDirecta.nombre = req.body.nombre;
	compraDirecta.especialidad = req.body.especialidad;

	// Intentar salvar el compraDirecta actualizado
	compraDirecta.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del compraDirecta 
			res.json(compraDirecta);
		}
	});
};

// método controller que borre un compraDirecta existente
exports.delete = function(req, res) {
	// Obtener el compraDirecta usando el objeto 'request'
	var compraDirecta = req.compraDirecta;

	// Usar el método model 'remove' para borrar el compraDirecta
	compraDirecta.remove(function(err) {
		if (err) {
			// Si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del compraDirecta
			res.json(compraDirecta);
		}
	});
};

// middleware para obtener un documento por su id
// usado en las funciones read, update y delete
exports.compraDirectaByID = function(req, res, next, id){
	CompraDirecta.findOne({
		_id: id
	}, function(err, compraDirecta){
		if (err) return next(err);
		if (!compraDirecta) return next(new Error('Fallo al cargar el compraDirecta ' + id));
		// Si un compraDirecta es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.compraDirecta = compraDirecta;
		// Llamar al siguiente middleware
		next();
	});
};
