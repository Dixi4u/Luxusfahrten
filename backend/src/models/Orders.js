import { Schema, model } from "mongoose";
import './User.js';

const ordersSchema = new Schema({
  // Campos existentes del modelo original
  fullName: {
    type: String,
    required: true,
  },
  documentId: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  insuranceSelected: {
    type: Boolean,
    default: false,
  },
  termsAccepted: {
    type: Boolean,
    required: true,
  },

  idVehiculo: {
    type: Schema.Types.ObjectId,
    ref: 'vehicles',
    required: false, 
  },
  idCliente: {
    type: Schema.Types.ObjectId,
    ref: 'user', // <-- Este nombre debe coincidir con el que usaste en model("users", userSchema)
    required: false, 
  },
  orderStatus: {
    type: String,
    enum: ['Pendiente', 'Procesando', 'Confirmado', 'En Preparación', 'Listo para Entrega', 'Entregado', 'Completado', 'Cancelado'],
    default: 'Pendiente'
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  totalPrice: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

export default model("orders", ordersSchema);