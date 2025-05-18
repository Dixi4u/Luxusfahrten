const providerControllers = {}

import providerModels from "../models/Provider.js"
import { v2 as cloudinary } from 'cloudinary'
import { config } from '../config.js'

cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
})
//Select

providerControllers.getProviders = async (req, res) => {
    const providers = await providerModels.find();
    res.json(providers);
}

//INSERT

providerControllers.insertProvider = async (req, res) => {
    try {
        const { name, lastName, birthday, email, password, telephone, dui, isVerified, addressProvider, typeSupplier } = req.body
        let imgUrl = ""
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'public', allowed_formats: ['jpg', 'png', 'jpeg'] })
            imgUrl = result.secure_url
        }
        const newProvider = new providerModels({ name, lastName, birthday, email, password, telephone, dui, isVerified, addressProvider, typeSupplier, image: imgUrl });
        await newProvider.save();
        res.json({ message: "Provider inserted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error inserting provider" });
    }
}

//UPDATE

providerControllers.updateProvider = async (req, res) => {
    try{
        const { name, lastName, birthday, email, password, telephone, dui, isVerified, addressProvider, typeSupplier } = req.body
        let imgUrl = ""
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'public', allowed_formats: ['jpg', 'png', 'jpeg'] })
            imgUrl = result.secure_url
        }
        const updatedProvider = await providerModels.findByIdAndUpdate(req.params.id, { name, lastName, birthday, email, password, telephone, dui, isVerified, addressProvider, typeSupplier, image: imgUrl }, { new: true });
        res.json({ message: "Provider updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating provider" });
    }
};

//DELETE

providerControllers.deleteProvider = async (req, res) => {
    try {
        await providerModels.findByIdAndDelete(req.params.id);
        res.json({ message: "Provider deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting provider" });
    }
};

export default providerControllers;