// Invocar al modo JavaScript 'strict'
'use strict';

// cargar modelo 'User' desde mongoDB
var User = require('mongoose').model('User'),
	ObjectID = require('mongodb').ObjectID,
	passport = require('passport');


var getErrorMessage = function(err){
	var message = '';
	// si es un error interno de mongoDB, obtener mensaje alias
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

exports.renderSignin = function(req, res, next){
	if(!req.user){
		res.render('signin', {
			title: 'Login',
			messages:  req.flash('error') || req.flash('info')
		});
	}else{
		return res.redirect('/redirect');
	}
};

exports.renderSignup = function(req, res, next){
	if(!req.user){
		res.render('signup', {
			title: 'Registrar Nuevo Usuario',
			messages:  req.flash('error')
		});
	}else{
		return res.redirect('/redirect');
	}
};

exports.signout = function(req,res){
	req.logout();
	res.redirect('/signin');
};

exports.requiresLogin = function(req, res, next){
	// si el usuario no esta autentificado envia mensaje de error apropiado
	if(!req.isAuthenticated()){
		return res.status(401).send({
			message: 'Usuario no está autentificado'
		});
	}
	// llamar al siguiente middleware en la cadena
	next();
};

exports.signup = function(req, res, next){
	// Si user no esta conectado, crear nuevo usuario y hacer login
	if(!req.user){
		// crear nueva instancia del objeto user
		var user = new User(req.body);
		// configurar la propiedad user provider
		user.provider = 'local';
		// Intenta guardar el nuevo documento user
		user.save(function(err){
			if(err){
				// si ocurre un error, usa el mensaje flash oara obtener el mensaje de error
				var message = getErrorMessage(err);
				// Configurar los mensajes flash
				req.flash('error', message);
				// redirecciona al usuario de vuelta a la pagina signup
				return res.redirect('/signup');
			}

			// Si el usuario fue creado de modo correcto usa el metodo login de passport para hacer login
			req.login(user, function(err){
				// si ocurre un error de login moverse al sgte middleware
				if(err) return next(err);
				// redireccionar al usuario de vuelta a la pagina ppal de la app
				return res.redirect('/signin');
			});
		});

	}else{
		return res.redirect('/signin');
	}
};




exports.create = function(req, res, next){
	var user = new User(req.body);
	user.provider = 'local';
	// usar metodo save para guardar el nuevo usuario
	user.save(function(err){
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(user);
		}
	});
};


exports.listAll = function(req, res, next){
	// usar el modelo estatico 'User'	
	User.find({}, function(err, users){
		if(err){
			// Llamar al siguiente middleware con el mensaje de error
			return next(err);
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(users);
		}
	});
};

// leer un documento
exports.read = function(req, res, next){	
	// usar objeto response (res) para enviar una respuesta JSON
	res.json(req.user);
};

// actualizar un documento
exports.update = function(req, res, next){
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
		if(err){
			// Llamar al siguiente middleware con el mensaje de error
			return next(err);
		}else{
			res.json(user);
		}
	});
};

// eliminar un documento
exports.delete = function(req, res, next){
	var user = req.user;

	user.remove(function(err){
		if(err){
			// Llamar al siguiente middleware con el mensaje de error
			return next(err);
		}else{
			res.json(user);
		}
	});
};

// middleware para obtener un documento por su id
// usado en las funciones read, update y delete
exports.findUserByID = function(req, res, next, id){
	User.findOne({
		_id: id
	}, function(err, user){
		if(err){
			// Llamar al siguiente middleware con el mensaje de error
			return next(err);
		}else{
			req.user = user;
			next();
		}
	});
};

