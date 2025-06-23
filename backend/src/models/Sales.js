import { Schema, model } from "mongoose";

const salesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["transferencia", "efectivo", "tarjeta"], // puedes añadir más si usas otros métodos
        required: true
    },
    insurance: {
        type: Boolean,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    estimatedDeliveryDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    strict: true
});

export default model("sales", salesSchema);
