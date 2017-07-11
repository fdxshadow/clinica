// Invocar modo JavaScript 'strict' 
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	Ingreso = mongoose.model('Ingreso');

// Crear un nuevo método controller para el manejo de errores
var getErrorMessage = function(err) {
	var message = '';
	if(err.code){
		switch(error.code){
			case 11000:
			case 11001:
				message = 'Usuario Ya Existe';
				break;
			default: 
				message = 'Se ha producido un error'
		}
	}else{
		for(var errName in err.errors){
			// quedarse con el primer mensaje de la pila de errores (ultimo mensaje generado)
			if(err.errors[errName].message) message = err.errors[errName].message;
		}
	}
	return message;
};

// Crear un nuevo método controller para crear nuevos ingresos
exports.create = function(req, res) {
	// Crear un nuevo objeto ingreso
	var ingreso = new Ingreso(req.body);
	ingreso.responsable = req.user;
	// Intentar salvar el ingreso
	ingreso.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del ingreso
			res.json(ingreso);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de ingresos
exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de ingresos
	Ingreso.find()
	.populate('paciente', 'nombre')
	.populate('medico', 'nombre')
	.populate('procedimiento', 'nombre')
	.populate('tipoPago', 'nombre')
	.exec(function(err, ingresos) {
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(ingresos);
		}
	});
};
// Crear un nuevo método controller que recupera una lista de ingresos
exports.listByTipoPago = function(req, res) {
	// Usar el método model 'find' para obtener una lista de ingresos
	Ingreso.find({tipoPago: req.tipoPago})
	.populate('paciente', 'nombre')
	.populate('medico', 'nombre')
	.populate('procedimiento', 'nombre')
	.populate('tipoPago', 'nombre')
	.exec(function(err, ingresos) {
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(ingresos);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de ingresos
exports.listByTipoPago_Estado = function(req, res) {
	// Usar el método model 'find' para obtener una lista de ingresos
	Ingreso.find({tipoPago: req.tipoPago, estado: req.estado})
	.populate('paciente', 'nombre')
	.populate('medico', 'nombre')
	.populate('procedimiento', 'nombre')
	.populate('tipoPago', 'nombre')
	.exec(function(err, ingresos) {
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(ingresos);
		}
	});
};
// Crear un nuevo método controller que recupera una lista de ingresos
exports.listByFactura = function(req, res) {
	// Usar el método model 'find' para obtener una lista de ingresos
	Ingreso.find({factura: req.facturaId})
	.populate('paciente', 'nombre')
	.populate('medico', 'nombre')
	.populate('procedimiento', 'nombre')
	.populate('tipoPago', 'nombre')
	.exec(function(err, ingresos) {
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(ingresos);
		}
	});
};
// Crear un nuevo método controller que recupera una lista de ingresos
exports.listByFecha = function(req, res) {
	// Usar el método model 'find' para obtener una lista de ingresos
	console.log('filter by fecha: '+req.fecha);
	Ingreso.find({
        fecha: {"$gt" : req.fecha}
	})
	.populate('paciente', 'nombre')
	.populate('medico', 'nombre')
	.populate('procedimiento', 'nombre')
	.populate('tipoPago', 'nombre')
	.exec(function(err, ingresos) {
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(ingresos);
		}
	});
};

// Crear un nuevo método controller que devuelve un ingreso existente
exports.read = function(req, res) {
	res.json(req.ingreso);
};

// Crear un nuevo método controller que actualiza un ingreso existente
exports.update = function(req, res) {
	// Obtener el ingreso usando el objeto 'request'
	var ingreso = req.ingreso;

	// Actualizar los campos ingreso
	ingreso.codigoPago = req.body.codigoPago;
	ingreso.monto = req.body.monto;
	ingreso.estado = req.body.estado;

	// Intentar salvar el ingreso actualizado
	ingreso.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del ingreso 
			res.json(ingreso);
		}
	});
};

// método controller que borre un ingreso existente
exports.delete = function(req, res) {
	// Obtener el ingreso usando el objeto 'request'
	var ingreso = req.ingreso;

	// Usar el método model 'remove' para borrar el ingreso
	ingreso.remove(function(err) {
		if (err) {
			// Si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del ingreso
			res.json(ingreso);
		}
	});
};

// middleware para obtener un documento por su id
// usado en las funciones read, update y delete
exports.ingresoByID = function(req, res, next, id){
	console.log('================| ingreso BY ID: '+id);
	Ingreso.findOne({
		_id: id
	}, function(err, ingreso){
		if (err) return next(err);
		if (!ingreso) return next(new Error('Fallo al cargar el ingreso ' + id));
		// Si un ingreso es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.ingreso = ingreso;
		// Llamar al siguiente middleware
		next();
	});
};

exports.paramEstado = function(req, res, next, _estado){
	req.estado = _estado;
	next();
};
exports.paramFacturaID = function(req, res, next, _facturaId){
	req.facturaId = _facturaId;
	next();
};
exports.dateByString = function(req, res, next, _fecha){
	req.fecha = new Date(_fecha);
	next();
};

exports.facturarIngresos = function(req, res){
	console.log('===UPDATE:');
	console.log('	query = tipoPago: '+ req.tipoPago._id+', estado: Creado');
	console.log('	update = factura: '+ req.factura._id +', estado: Espera');
	// cambiar estado de los ingresos
	Ingreso.update(
		{tipoPago: req.tipoPago._id, estado: 'Creado'}, // query
		{factura: req.factura._id, estado: 'Espera'}, 	// cambio
		{multi: true},							// opciones: multi para que actualice a todos los usuarios que cumplan con query
		function(err, numAffected) {			// callback
			if (err) {
				console.log('ERROR: '+err);
				// Si ocurre un error enviar el mensaje de error
				return res.status(400).send({
					message: getErrorMessage(err)
				});
			} else {
				// Enviar una representación JSON del ingreso
				console.log(numAffected+' FACTURAR INGRESOS SUCCESSFUL');
				res.json({message: numAffected+' Ingresos facturados correctamente'});
			}
		}
	);
};

exports.RegistrarIngresosByFactura = function(req, res){
	// cambiar estado de los ingresos
	Ingreso.update(
		{factura: req.factura._id, estado: 'Espera'}, // query
		{codigoPago: req.factura.codigoPago, estado: 'Registrado'}, 	// cambio
		{multi: true},							// opciones: multi para que actualice a todos los usuarios que cumplan con query
		function(err, numAffected) {			// callback
			if (err) {
				// Si ocurre un error enviar el mensaje de error
				return res.status(400).send({
					message: getErrorMessage(err)
				});
			} else {
				// Enviar una representación JSON del ingreso
				res.json({message: numAffected+' Ingresos facturados correctamente'});
			}
		}
	);
};
