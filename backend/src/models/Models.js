import {Schema, model} from "mongoose";

const modelsSchema = new Schema({
    idBrand: {
        type: Schema.Types.ObjectId,
        ref: "brand", // Asegúrate de que coincida con el nombre del modelo de Brand
        required: true // Corregir "require" por "required"
    },
    nameModel: {
        type: String,
        required: true // Corregir "require" por "required"
    }
}, {
    timestamps: true,
    strict: false
})

export default model("model", modelsSchema)