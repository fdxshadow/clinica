// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definir nuevo Schema
var FacturaSchema = new Schema({
  codigoPago: {
    type: String,
    trim: true,
    default: null    
  },
  monto: {
    type: Number,
    default: 0
  },
  tipoPago: {
    type: String,
    trim: true,
    required: 'Debe ingresar el tipo de la Factura'
  },
  glosa: {
    type: String,
    trim: true,
    required: 'Debe ingresar el tipo de la Factura'
  },
  condicionesPago: {
    type: String,
    trim: true,
    required: 'Debe ingresar la condición de pago de la Factura'
  },
  idFacturaInterno: {
    type: Number,
    default: 0
  },
  estado: {
    type: String,
    trim: true,
    required: 'Debe ingresar el estado de la Factura'
  }
});

mongoose.model('Factura', FacturaSchema);
