const  vehiclesController = {};
import vehiclesModel from "../models/Vehicles.js"

//SELECT
vehiclesController.getVehicle = async (req, res) => {
   const evaluation = await vehiclesModel.find().populate('idBrand')
   res.json(evaluation)
}

//INSERT
vehiclesController.insertVehicle = async (req, res) => {
    const { idBrand, idModel, year, price, type, color, description, specs, availability } = req.body;
    const newVehicle = new vehiclesModel({ idBrand, idModel, year, price, type, color, description, specs, availability })
    await newVehicle.save()
    res.json({message: "Saved successfully"})
}

//DELETE
vehiclesController.deleteVehicle = async (req, res) => {
    await vehiclesModel.findByIdAndDelete(req.params.id)
    res.json({message: "Deleted successfully"})
}

//UPDATE
vehiclesController.updateVehicle = async (req, res) => {
    const { idBrand, idModel, year, price, type, color, description, specs, availability } = req.body;
    const updateVehicle = await vehiclesModel.findByIdAndUpdate(req.params.id,
        {idBrand, idModel, year, price, type, color, description, specs, availability}, {new: true}
    )
    res.json({message: "Updated successfully"})
}

export default vehiclesController;