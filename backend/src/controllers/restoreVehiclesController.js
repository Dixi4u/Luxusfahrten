const RestoredVehicleController = {};

import { v2 as cloudinary } from 'cloudinary'
import { config } from '../config.js'
import RestoredVehicleModel from "../models/Restorevehicles.js"
import mongoose from "mongoose";


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

// INSERT - Mejorado con logs y manejo de errores
RestoredVehicleController.insertRestoredVehicle = async (req, res) => {
    try {
        // Los campos de texto vienen en req.body
        // El archivo viene en req.file
        const { idBrand,
            idModel,
            year,
            price,
            type,
            color,
            description,
            specs,
            availability,
            restorationSpecs,
            restorationCost } = req.body;
        let imgUrl = ""
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'public', allowed_formats: ['jpg', 'png', 'jpeg'] })
            imgUrl = result.secure_url
        }
        const newVehicle = new RestoredVehicleModel({
            idBrand,
            idModel,
            year,
            price,
            type,
            color,
            description,
            specs,
            availability,
            restorationSpecs,
            restorationCost,
            image: imgUrl
        })
        await newVehicle.save()
        res.status(201).json({ message: "Vehículo guardado correctamente" })
    } catch (error) {
        console.error("❌ Error insertando vehículo restaurado:", error)
        res.status(500).json({ message: "Error saving restored vehicle", error: error.message })
    }

};


//DELETE
RestoredVehicleController.deleteRestoredVehicle = async (req, res) => {
    try {
        await RestoredVehicleModel.findByIdAndDelete(req.params.id)
        res.json({ message: "Deleted successfully" })

    } catch (error) {
        res.status(500).json({ message: "Error deleting vehicle" })
    }
}

//UPDATE
RestoredVehicleController.updateRestoredVehicle = async (req, res) => {
    try {
        if (typeof req.body.specs === 'string') {
            req.body.specs = JSON.parse(req.body.specs);
        }

        // Solo actualiza los campos enviados en el body
        const updateFields = { ...req.body };

        // Si hay archivo, sube la imagen y actualiza el campo image
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'public', allowed_formats: ['jpg', 'png', 'jpeg'] });
            updateFields.image = result.secure_url;
        }

        const updateRestoredVehicle = await RestoredVehicleModel.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        );

        res.json({ message: "Updated successfully", data: updateRestoredVehicle });

    } catch (error) {
        res.status(500).json({ message: "Error updating vehicle" });
    }
}

//GET BY ID
RestoredVehicleController.getRestoredVehicleById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid vehicle ID" });
        }
        const vehicle = await RestoredVehicleModel.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: "Restored vehicle not found" });
        }
        res.json(vehicle);
    } catch (error) {
        console.error(error); // <-- Esto te mostrará el error real en consola
        res.status(500).json({ message: "Error fetching restored vehicle" });
    }
}

export default RestoredVehicleController;