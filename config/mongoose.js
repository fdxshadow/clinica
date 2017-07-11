var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function(){
	// Conectar a mongo db

	var db = mongoose.connect(config.DBuri);
	// Cargar modelos de base de datos
	require('../app/models/server.model.user');

	require('../app/models/server.model.ingreso');
	require('../app/models/server.model.paciente');
	require('../app/models/server.model.medico');
	require('../app/models/server.model.procedimiento');
	require('../app/models/server.model.tipoPago');
	require('../app/models/server.model.factura');

	require('../app/models/server.model.licitacion');
	require('../app/models/server.model.compradirecta');
	require('../app/models/server.model.producto');
	require('../app/models/server.model.counters');
	//retornar instancia de mongoose
	return db;
}


