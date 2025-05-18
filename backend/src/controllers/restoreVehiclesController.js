const  RestoredVehicleController = {};

import {v2 as cloudinary} from 'cloudinary'
import {config} from '../config.js'
import RestoredVehicleModel from "../models/Restorevehicles.js"


cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
})

//SELECT
RestoredVehicleController.getRestoredVehicle = async (req, res) => {
   const evaluation = await RestoredVehicleModel.find().populate('idBrand').populate('idModel')
   res.json(evaluation)
}

//INSERT
RestoredVehicleController.insertRestoredVehicle = async (req, res) => {
    try {
        const { idBrand, idModel, year, price, type, color, description, specs, availability, restorationSpecs, restorationCost} = req.body;
    let imgUrl = ""
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {folder: 'public', allowed_formats: ['jpg', 'png', 'jpeg']})
        imgUrl = result.secure_url
    }

    const newRestoredVehicle = new RestoredVehicleModel({ idBrand, idModel, year, price, type, color, description, specs, availability, restorationSpecs, restorationCost, image: imgUrl })

    await newRestoredVehicle.save()

    res.json({message: "Saved successfully"})

    } catch (error) {
        res.status(500).json({message: "Error saving vehicle"})
    }
}

//DELETE
RestoredVehicleController.deleteRestoredVehicle = async (req, res) => {
    try {
            await RestoredVehicleModel.findByIdAndDelete(req.params.id)
            res.json({message: "Deleted successfully"})

    } catch (error) {
        res.status(500).json({message: "Error deleting vehicle"})
    }
}

//UPDATE
RestoredVehicleController.updateRestoredVehicle = async (req, res) => {
    try {
        const { idBrand, idModel, year, price, type, color, description, specs, availability, restorationSpecs, restorationCost } = req.body;
        let imgUrl = ""
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {folder: 'public', allowed_formats: ['jpg', 'png', 'jpeg']})
        imgUrl = result.secure_url
    }   
    
        const updateRestoredVehicle = await RestoredVehicleModel.findByIdAndUpdate(req.params.id,
        {idBrand, idModel, year, price, type, color, description, specs, availability, restorationSpecs, restorationCost, image: imgUrl}, {new: true}
    )
    
    res.json({message: "Updated successfully"})
    res.status(200).json(updateRestoredVehicle)

    } catch (error) {
        res.status(500).json({message: "Error updating vehicle"})
    }
}

export default RestoredVehicleController;