
const employeeController = {};
import employeeModel from "../models/employee.js";


employeeController.getemployee = async (req, res) => {
  const employee = await employeeModel.find();
  res.json(employee);
};

// INSERT
employeeController.createemployee = async (req, res) => {
  const {  name,hireDate, dateOfBirthday, address, email, password, telephone,typeEmployee  } = req.body;
  const newemployee= new employeeModel({ name,hireDate, dateOfBirthday, address, email, password, telephone,typeEmployee  });
  await newemployee.save();
  res.json({ message: "employee save" });
};

// DELETE
employeeController.deleteemployee = async (req, res) => {
const deletedemployee = await employeeModel.findByIdAndDelete(req.params.id);
  if (!deletedemployee) {
    return res.status(404).json({ message: "employee dont find" });
  }
  res.json({ message: "employee deleted" });
};

// UPDATE
employeeController.updateemployee = async (req, res) => {
  // Solicito todos los valores
  const {  name,hireDate, dateOfBirthday, address, email, password, telephone,typeEmployee   } = req.body;
  // Actualizo
  await employeeModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      hireDate, 
      dateOfBirthday, 
      address, 
      email, 
      password, 
      telephone,
      typeEmployee 
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "employee update" });
};

export default employeeController;
