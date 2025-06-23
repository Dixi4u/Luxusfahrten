import { Schema, model } from "mongoose";

const ordersSchema = new Schema({
  // Referencia al cliente
  idCliente: {
    type: Schema.Types.ObjectId,
    ref: 'user', // Debe coincidir con el nombre del modelo en users
    required: true,
  },
  
  // Referencia al vehículo
  idVehiculo: {
    type: Schema.Types.ObjectId,
    ref: 'vehicles', // Debe coincidir con el nombre del modelo en vehicles
    required: true,
  },
  
  // Método de pago
  metodoPago: {
    type: String,
    required: true,
    enum: ['Efectivo', 'Tarjeta de Crédito', 'Tarjeta de Débito', 'Transferencia Bancaria', 'Financiamiento', 'Cheque']
  },
  
  // Términos y condiciones aceptados
  terminosYSeguro: {
    type: Boolean,
    required: true,
    default: false
  },
  
  // Precio total del pedido
  precioTotal: {
    type: Number,
    required: true,
    min: 0
  },
  
  // Estado del pedido
  status: {
    type: String,
    required: true,
    enum: ['Pendiente', 'Procesando', 'Confirmado', 'En Preparación', 'Listo para Entrega', 'Entregado', 'Completado', 'Cancelado'],
    default: 'Pendiente'
  },
  
  // Fecha del pedido (opcional, se genera automáticamente)
  fechaPedido: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Crea automáticamente createdAt y updatedAt
});

export default model("orders", ordersSchema);