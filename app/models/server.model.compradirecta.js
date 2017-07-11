// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definir nuevo Schema
var CompraDirectaSchema = new Schema({
  unidad: {
    type: String,
    trim: true,
    required: 'Debe ingresar la unidad de la CompraDirecta'
  },
  centroResponsabilidad: {
    type: String,
    trim: true,
    required: 'Debe ingresar el centro de responsabilidad de la CompraDirecta'
  },
  nombreSolicitante: {
    type: String,
    trim: true,
    required: 'Debe ingresar el nombre del solicitante de la CompraDirecta'
  },
  lugarDespacho: {
    type: String,
    trim: true,
    required: 'Debe ingresar el lugar de despacho de la CompraDirecta'
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  monto: {
    type: Number,
    default: 0,
    required: 'Debe ingresar el monto de la CompraDirecta'
  }
});

mongoose.model('CompraDirecta', CompraDirectaSchema);
