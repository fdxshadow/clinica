// Invocar modo JavaScript 'strict' 
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	Procedimiento = mongoose.model('Procedimiento');

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

// Crear un nuevo método controller para crear nuevos procedimientos
exports.create = function(req, res) {
	// Crear un nuevo objeto procedimiento
	var procedimiento = new Procedimiento(req.body);

	// Intentar salvar el procedimiento
	procedimiento.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del procedimiento
			res.json(procedimiento);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de procedimientos
exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de procedimientos
	Procedimiento.find({}, function(err, procedimientos){
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(procedimientos);
		}
	});
};

// Crear un nuevo método controller que devuelve un procedimiento existente
exports.read = function(req, res) {
	res.json(req.procedimiento);
};

// Crear un nuevo método controller que actualiza un procedimiento existente
exports.update = function(req, res) {
	// Obtener el procedimiento usando el objeto 'request'
	var procedimiento = req.procedimiento;

	// Actualizar los campos procedimiento
	procedimiento.nombre = req.body.nombre;
	procedimiento.precio = req.body.precio;

	// Intentar salvar el procedimiento actualizado
	procedimiento.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del procedimiento 
			res.json(procedimiento);
		}
	});
};

// método controller que borre un procedimiento existente
exports.delete = function(req, res) {
	// Obtener el procedimiento usando el objeto 'request'
	var procedimiento = req.procedimiento;

	// Usar el método model 'remove' para borrar el procedimiento
	procedimiento.remove(function(err) {
		if (err) {
			// Si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del procedimiento
			res.json(procedimiento);
		}
	});
};

// middleware para obtener un documento por su id
// usado en las funciones read, update y delete
exports.procedimientoByID = function(req, res, next, id){
	Procedimiento.findOne({
		_id: id
	}, function(err, procedimiento){
		if (err) return next(err);
		if (!procedimiento) return next(new Error('Fallo al cargar el procedimiento ' + id));
		// Si un procedimiento es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.procedimiento = procedimiento;
		// Llamar al siguiente middleware
		next();
	});
};
