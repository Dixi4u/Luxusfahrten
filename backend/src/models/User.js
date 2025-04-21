import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    telephone: { 
        type: String, 
        required: true
    },
    dui: {
        type: String,
        required: true,
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['admin', 'employee', 'user'],
        required: true
    },

    providerData: {
        addressProvider: String,
        typeSupplier: String
    },
    adminData: {
        permissions: [String] 
    }

}, {
    timestamps: true,
    strict: false
});

export default model("users", userSchema);
