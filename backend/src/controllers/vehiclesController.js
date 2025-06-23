const  vehiclesController = {};
import vehiclesModel from "../models/Vehicles.js"
import {v2 as cloudinary} from 'cloudinary'
import {config} from '../config.js'
import mongoose from "mongoose";

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
        // Los campos de texto vienen en req.body
        // El archivo viene en req.file
        const { idBrand, idModel, year, price, type, color, description, specs, availability } = req.body;
        let imgUrl = ""
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {folder: 'public', allowed_formats: ['jpg', 'png', 'jpeg']})
            imgUrl = result.secure_url
        }
        const newVehicle = new vehiclesModel({ idBrand, idModel, year, price, type, color, description, specs, availability, image: imgUrl })
        await newVehicle.save()
        res.status(201).json({ message: "Vehículo guardado correctamente" })
    } catch (error) {
        res.status(500).json({ message: "Error saving vehicle", error: error.message })
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
       if (typeof req.body.specs === 'string') {
           req.body.specs = JSON.parse(req.body.specs);
       }
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

//GET BY ID
vehiclesController.getVehicleById = async (req, res) => {
    try {
        // Verifica si el id es válido de acuerdo a mongoose
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid vehicle ID" });
        }
        const vehicle = await vehiclesModel.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vehicle" });
    }
}

export default vehiclesController;