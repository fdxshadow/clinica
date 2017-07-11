// Invocar modo JavaScript 'strict' 
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	Licitacion = mongoose.model('Licitacion');

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

// Crear un nuevo método controller para crear nuevos licitaciones
exports.create = function(req, res) {
	// Crear un nuevo objeto licitacion
	var licitacion = new licitacion(req.body);

	// Intentar salvar el licitacion
	licitacion.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del licitacion
			res.json(licitacion);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de licitaciones
exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de licitaciones
	Licitacion.find({}, function(err, licitacions){
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(licitacions);
		}
	});
};

// Crear un nuevo método controller que devuelve un licitacion existente
exports.read = function(req, res) {
	res.json(req.licitacion);
};

// Crear un nuevo método controller que actualiza un licitacion existente
exports.update = function(req, res) {
	// Obtener el licitacion usando el objeto 'request'
	var licitacion = req.licitacion;

	// Actualizar los campos licitacion
	licitacion.run = req.body.run;
	licitacion.nombre = req.body.nombre;
	licitacion.especialidad = req.body.especialidad;

	// Intentar salvar el licitacion actualizado
	licitacion.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del licitacion 
			res.json(licitacion);
		}
	});
};

// método controller que borre un licitacion existente
exports.delete = function(req, res) {
	// Obtener el licitacion usando el objeto 'request'
	var licitacion = req.licitacion;

	// Usar el método model 'remove' para borrar el licitacion
	licitacion.remove(function(err) {
		if (err) {
			// Si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del licitacion
			res.json(licitacion);
		}
	});
};

// middleware para obtener un documento por su id
// usado en las funciones read, update y delete
exports.licitacionByID = function(req, res, next, id){
	Licitacion.findOne({
		_id: id
	}, function(err, licitacion){
		if (err) return next(err);
		if (!licitacion) return next(new Error('Fallo al cargar el licitacion ' + id));
		// Si un licitacion es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.licitacion = licitacion;
		// Llamar al siguiente middleware
		next();
	});
};
