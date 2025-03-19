
import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
  {
    name:  {
      type: String,
      require: true,
    },

    hireDate: {
      type: Date,
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

    password: {
      type: String,
      require: true,
    },

    telephone: {
        type: String,
        require: true,
      },

      typeEmployee: {
        type: String,
        require: true,
      },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("employee", employeeSchema);
