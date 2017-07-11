// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definir nuevo Schema
var LicitacionSchema = new Schema({
  descripcion: {
    type: String,
    trim: true,
    required: 'Debe ingresar la descripción de la Licitacion'
  },
  proveedor: {
    type: String,
    trim: true,
    required: 'Debe ingresar el prooveedor de la Licitacion'
  },
  fecha: {
    type: Date,
    default: Date.now,
    required: 'Debe ingresar la fecha de la Licitacion'
  },
  monto: {
    type: Number,
    default: 0,
    required: 'Debe ingresar el monto de la Licitacion'
  },
  estado: {
    type: String,
    trim: true,
    required: 'Debe especificar el estado del ingreso'
  }
});

mongoose.model('Licitacion', LicitacionSchema);
