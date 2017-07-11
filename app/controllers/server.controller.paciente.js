// Invocar modo JavaScript 'strict' 
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	Paciente = mongoose.model('Paciente');

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

// Crear un nuevo método controller para crear nuevos artículos
exports.create = function(req, res) {
	// Crear un nuevo objeto paciente
	var paciente = new Paciente(req.body);

	// Intentar salvar el paciente
	paciente.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del paciente
			res.json(paciente);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de pacientes
exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de pacientes
	Paciente.find({}, function(err, pacientes){
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(pacientes);
		}
	});
};

// Crear un nuevo método controller que devuelve un paciente existente
exports.read = function(req, res) {
	res.json(req.paciente);
};

// Crear un nuevo método controller que actualiza un paciente existente
exports.update = function(req, res) {
	// Obtener el paciente usando el objeto 'request'
	var paciente = req.paciente;

	// Actualizar los campos paciente
	paciente.run = req.body.run;
	paciente.nombre = req.body.nombre;
	paciente.fono = req.body.fono;

	// Intentar salvar el paciente actualizado
	paciente.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del paciente 
			res.json(paciente);
		}
	});
};

// método controller que borre un paciente existente
exports.delete = function(req, res) {
	// Obtener el paciente usando el objeto 'request'
	var paciente = req.paciente;

	// Usar el método model 'remove' para borrar el paciente
	paciente.remove(function(err) {
		if (err) {
			// Si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del paciente
			res.json(paciente);
		}
	});
};

// middleware para obtener un documento por su id
// usado en las funciones read, update y delete
exports.pacienteByID = function(req, res, next, id){
	Paciente.findOne({
		_id: id
	}, function(err, paciente){
		if (err) return next(err);
		if (!paciente) return next(new Error('Fallo al cargar el paciente ' + id));
		// Si un paciente es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.paciente = paciente;
		// Llamar al siguiente middleware
		next();
	});
};
