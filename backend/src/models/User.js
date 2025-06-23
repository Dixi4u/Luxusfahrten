import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default model("user", userSchema);
