import {Schema, model} from "mongoose";

const vehiclesSchema = new Schema({
  idBrand: {
    type: Schema.Types.ObjectId,
    ref: "brand",
    required: true
  },
  idModel: {
    type: Schema.Types.ObjectId,
    ref: "model",
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  specs: {
    type: Schema.Types.Mixed, 
    required: true
  },
  availability: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  strict: false
});


export default model("vehicles", vehiclesSchema)