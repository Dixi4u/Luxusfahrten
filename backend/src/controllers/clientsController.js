
const clientsController = {};
import clientsModel from "../models/clients.js";

// SELECT
clientsController.getclients = async (req, res) => {
  const clients = await clientsModel.find();
  res.json(clients);
};

// INSERT
clientsController.createclients = async (req, res) => {
  const { name, dateOfBirthday, address, email, password,  telephone } = req.body;
  const newclients= new clientsModel({ name, dateOfBirthday, address, email, password,  telephone });
  await newclients.save();
  res.json({ message: "clients save" });
};

// DELETE
clientsController.deleteclients = async (req, res) => {
const deleteclients= await clientsModel.findByIdAndDelete(req.params.id);
  if (!deleteclients) {
    return res.status(404).json({ message: "clients dont find" });
  }
  res.json({ message: "clients deleted" });
};

// UPDATE
clientsController.updateclients = async (req, res) => {
  // Solicito todos los valores
  const {  name, dateOfBirthday, address, email, password,  telephone  } = req.body;
  // Actualizo
  await clientsModel.findByIdAndUpdate(
    req.params.id,
    {
        name,
        dateOfBirthday, 
        address, 
        email, 
        password,  
        telephone 
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "clients update" });
};

export default clientsController;
