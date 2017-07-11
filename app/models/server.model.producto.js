// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definir nuevo Schema
var ProductoSchema = new Schema({
  _id: {
    type: String,
    trim: true,
    required: 'Debe ingresar el código ID del producto'
  },
  descripcion: {
    type: String,
    trim: true,
    required: 'Debe ingresar la descripción del producto'
  },
  proveedor: {
    type: String,
    trim: true,
    required: 'Debe ingresar el prooveedor del producto'
  },
  cantidadComprada: {
    type: Number,
    required: 'Debe ingresar la cantidad comprada del producto'
  },
  cantidadRecibida: {
    type: Number,
    default: 0,
  },
  licitacion: {
    type: Schema.ObjectId,
    ref: 'Licitacion',
    default: null
  },
  compraDirecta: {
    type: Schema.ObjectId,
    ref: 'CompraDirecta',
    default: null
  }
});

mongoose.model('Producto', ProductoSchema);
