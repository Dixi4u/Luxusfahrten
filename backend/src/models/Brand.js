import { Schema, model} from "mongoose"

const brandSchema = new Schema({
    brandName: {
        type: String, // Cambiar "string" por String (sin comillas)
        required: true
    }
}, {
    timestamps: true,
    strict: false
});

export default model("brand", brandSchema);