import { Schema, model } from "mongoose";

const providerSchema = new Schema({
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
    addressProvider: { 
        type: String 
    },
    typeSupplier: { 
        type: String 
    },
    image: { 
        type: String 
    }
}, {
    timestamps: true
});

export default model("provider", providerSchema);
