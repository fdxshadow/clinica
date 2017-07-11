// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definir nuevo Schema
var TipoPagoSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    default: '',
    required: 'Debe ingresar nombre del procedimiento'
  },
  descuento: {
    type: Number,
    default: 0
  }
});

mongoose.model('TipoPago', TipoPagoSchema);