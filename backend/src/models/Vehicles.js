import {Schema, model} from "mongoose";

const vehiclesSchema = new Schema({
    idBrand: {
        type: Schema.Types.ObjectId,
        ref: "brand",
        require: true
    },
    idModel: {
        type: Schema.Types.ObjectId,
        ref: "model",
        require: true
    },
    year: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    specs: {
        type: String,
        require: true
    },
    availability: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    }
    
}, {
    timestamps: true,
    strict: false
})

export default model("vehicles", vehiclesSchema)