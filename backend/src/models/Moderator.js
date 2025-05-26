import { Schema, model } from "mongoose";

const moderatorSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    actualDate: { 
        type: String, 
        required: true 
    },
    birthday: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
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
    employeeType: { 
        type: String, 
        default: true 
    },
    image: { 
        type: String 
    }
}, {
    timestamps: true
});

export default model("moderators", moderatorSchema);
