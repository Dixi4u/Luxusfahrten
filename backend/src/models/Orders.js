import {Schema, model} from "mongoose";

const ordersSchema = new Schema({
    idVehiculo: { // CORREGIDO: era idVehicle
        type: Schema.Types.ObjectId,
        ref: "vehicles", // CORREGIDO: nombre correcto de la colección
        required: true // CORREGIDO: era require
    },
    idCliente: {
        type: Schema.Types.ObjectId,
        ref: "clients", // CORREGIDO: nombre correcto de la colección
        required: true // CORREGIDO: era require
    },
    paymentMethod: {
        type: String,
        required: true, // CORREGIDO: era require
        enum: [
            'Efectivo',
            'Tarjeta de Crédito',
            'Tarjeta de Débito',
            'Transferencia Bancaria',
            'Financiamiento',
            'Cheque'
        ]
    },
    orderStatus: {
        type: String,
        required: true, // CORREGIDO: era require
        enum: [
            'Pendiente',
            'Procesando',
            'Confirmado',
            'En Preparación',
            'Listo para Entrega',
            'Entregado',
            'Completado',
            'Cancelado'
        ],
        default: 'Pendiente'
    },
    orderDate: {
        type: Date,
        required: true, // CORREGIDO: era require
        default: Date.now
    },
    totalPrice: {
        type: Number,
        required: true, // CORREGIDO: era require
        min: 0
    }
}, {
    timestamps: true,
    strict: false
});

// Middleware para validar antes de guardar
ordersSchema.pre('save', function(next) {
    if (this.totalPrice < 0) {
        next(new Error('El precio total no puede ser negativo'));
    }
    next();
});

// Método para obtener el resumen de la orden
ordersSchema.methods.getSummary = function() {
    return {
        id: this._id,
        status: this.orderStatus,
        total: this.totalPrice,
        date: this.orderDate,
        paymentMethod: this.paymentMethod
    };
};

export default model("orders", ordersSchema);