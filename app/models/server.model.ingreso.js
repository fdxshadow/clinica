// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definir nuevo Schema
var IngresoSchema = new Schema({
  codigoPago: {
    type: String,
    trim: true,
    default: ''
  },
  paciente: {
    type: Schema.ObjectId,
    ref: 'Paciente'
  },
  medico: {
    type: Schema.ObjectId,
    ref: 'Medico'
  },
  procedimiento: {
    type: Schema.ObjectId,
    ref: 'Procedimiento'
  },
  tipoPago: {
    type: Schema.ObjectId,
    ref: 'TipoPago'
  },
  monto: {
    type: Number,
    required: 'Debe ingresar el monto del ingreso'
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    trim: true,
    required: 'Debe especificar el estado del ingreso'
  },
  factura: {
    type: Schema.ObjectId,
    ref: 'Factura',
    default: null
  },
  responsable: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'Debe especificar el responsable del ingreso'
  }
});

mongoose.model('Ingreso', IngresoSchema);
