import {Schema, model} from "mongoose";

const modelsSchema = new Schema({
    idBrand: {
        type: Schema.Types.ObjectId,
        ref: "brand",
        require: true
    },
    nameModel: {
        type: String,
        require: true
    }
    
}, {
    timestamps: true,
    strict: false
})

export default model("model", modelsSchema)