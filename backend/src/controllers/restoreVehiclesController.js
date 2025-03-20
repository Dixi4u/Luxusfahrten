const  RestoredVehicleController = {};
import RestoredVehicleModel from "../models/Restorevehicles.js"

//SELECT
RestoredVehicleController.getRestoredVehicle = async (req, res) => {
   const evaluation = await RestoredVehicleModel.find().populate('idBrand').populate('idModel')
   res.json(evaluation)
}

//INSERT
RestoredVehicleController.insertRestoredVehicle = async (req, res) => {
    const { idBrand, idModel, year, price, type, color, description, specs, availability, restorationSpecs, restorationCost } = req.body;
    const newRestoredVehicle = new RestoredVehicleModel({ idBrand, idModel, year, price, type, color, description, specs, availability, restorationSpecs, restorationCost })
    await newRestoredVehicle.save()
    res.json({message: "Saved successfully"})
}

//DELETE
RestoredVehicleController.deleteRestoredVehicle = async (req, res) => {
    await RestoredVehicleModel.findByIdAndDelete(req.params.id)
    res.json({message: "Deleted successfully"})
}

//UPDATE
RestoredVehicleController.updateRestoredVehicle = async (req, res) => {
    const { idBrand, idModel, year, price, type, color, description, specs, availability, restorationSpecs, restorationCost } = req.body;
    const updateRestoredVehicle = await RestoredVehicleModel.findByIdAndUpdate(req.params.id,
        {idBrand, idModel, year, price, type, color, description, specs, availability, restorationSpecs, restorationCost}, {new: true}
    )
    res.json({message: "Updated successfully"})
}

export default RestoredVehicleController;