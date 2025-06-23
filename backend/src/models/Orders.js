import { Schema, model } from "mongoose";

const ordersSchema = new Schema({
    idVehicle: {
        type: Schema.Types.ObjectId,
        ref: "vehicle",
        require: true
    },
    idCliente: {
        type: Schema.Types.ObjectId,
        ref: "client",
        require: true
    },
    paymentMethod: {
        type: String,
        require: true
    },
    orderStatus: {
        type: String,
        require: true
    },
    orderDate: {
        type: Date,
        require: true
    },
    totalPrice: {
        type: Number,
        require: true
    }
    
}, {
    timestamps: true,
    strict: false
})

export default model("orders", ordersSchema)