import { Schema, model} from "mongoose"

const brandSchema = new Schema({
    brandName: {
        type : "string",
        required : true
    }
}, {
    timestamps : true,
    strict : false
});

export default model("brand", brandSchema);