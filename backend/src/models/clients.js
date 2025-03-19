/*
    Campos:
        nombre
        descripcion
        precio
        stock
*/

import { Schema, model } from "mongoose";

const clientsSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    dateOfBirthday: {
      type: Date,
      require: true,
    },

    address: {
      type: String,
      require: true,
    },

    email: {
        type: String,
        require: true,
      },

     address: {
        type: String,
        require: true,
      },

    password: {
      type: String,
      require: true,
    },

    telephone: {
        type: String,
        require: true,
      },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("clients", clientsSchema);
