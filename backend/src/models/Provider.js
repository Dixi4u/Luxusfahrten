import {Schema, model} from 'mongoose';

const providerSchema = new Schema({
    nameProvider: {
        type: String,
        required: true
    },
    addressProvider: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    typeSupplier: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    strict: false
});

export default model('provider', providerSchema);