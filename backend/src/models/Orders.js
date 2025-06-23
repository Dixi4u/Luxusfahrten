import { Schema, model } from "mongoose";

const ordersSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  documentId: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  insuranceSelected: {
    type: Boolean,
    default: false,
  },
  termsAccepted: {
    type: Boolean,
    required: true,
  }
}, {
  timestamps: true
});

export default model("orders", ordersSchema);
