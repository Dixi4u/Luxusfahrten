const  vehiclesController = {};
import vehiclesModel from "../models/Vehicles.js"
import {v2 as cloudinary} from 'cloudinary'
import {config} from '../config.js'

cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
})

//SELECT
vehiclesController.getVehicle = async (req, res) => {
   const evaluation = await vehiclesModel.find().populate('idBrand').populate('idModel')
   res.json(evaluation)
}

//INSERT
vehiclesController.insertVehicle = async (req, res) => {
    try {
        const { idBrand, idModel, year, price, type, color, description, specs, availability } = req.body;
        let imgUrl = ""
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {folder: 'public', allowed_formats: ['jpg', 'png', 'jpeg']})
            imgUrl = result.secure_url
        }
        const newVehicle = new vehiclesModel({ idBrand, idModel, year, price, type, color, description, specs, availability, image: imgUrl })
        await newVehicle.save()
        res.json({message: "Saved successfully"})
    } catch (error) {
        res.status(500).json({message: "Error saving vehicle"})
    }
}

//DELETE
vehiclesController.deleteVehicle = async (req, res) => {
   try {
       await vehiclesModel.findByIdAndDelete(req.params.id)
       res.json({message: "Deleted successfully"})
   } catch (error) {
       res.status(500).json({message: "Error deleting vehicle"})
   }
}

//UPDATE
vehiclesController.updateVehicle = async (req, res) => {
   try {
       const { idBrand, idModel, year, price, type, color, description, specs, availability } = req.body;
       let imgUrl = ""
         if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {folder: 'public', allowed_formats: ['jpg', 'png', 'jpeg']})
            imgUrl = result.secure_url
       }
       const updateVehicle = await vehiclesModel.findByIdAndUpdate(req.params.id,
           {idBrand, idModel, year, price, type, color, description, specs, availability, image: imgUrl}, {new: true}
       )

       res.json({message: "Updated successfully"})
       res.status(200).json(updateVehicle)
       
   } catch (error) {
       res.status(500).json({message: "Error updating vehicle"})
   }
}

export default vehiclesController;