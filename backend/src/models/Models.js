import {Schema, model} from "mongoose";

const modelsSchema = new Schema({
    idBranch: {
        type: Schema.Types.ObjectId,
        ref: "branches",
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

export default model("models", modelsSchema)