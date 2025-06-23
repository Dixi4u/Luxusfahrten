import userModel from "../models/User.js"
import { v2 as cloudinary } from "cloudinary"
import { config } from "../config.js"
import mongoose from "mongoose"

cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
})

const userControllers = {}

userControllers.getUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        res.json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error fetching users" })
    }
}

userControllers.updateUser = async (req, res) => {
    try {
        // Validar que el ID sea válido
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const { name, lastName, birthday, email, password, telephone, dui, isVerified } = req.body
        let imgUrl = ""
        
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { 
                folder: "public", 
                allowed_formats: ["jpg", "png", "jpeg"] 
            })
            imgUrl = result.secure_url
        }

        const updateUser = await userModel.findByIdAndUpdate(
            req.params.id, 
            { name, lastName, birthday, email, password, telephone, dui, isVerified, image: imgUrl }, 
            { new: true }
        )

        // Verificar si el usuario existe
        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updateUser })
    } catch (error) {
        console.error(error) // <-- Esto te mostrará el error real en consola
        res.status(500).json({ message: "Error updating user" })
    }
}

userControllers.getUserById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error); // <-- Esto te mostrará el error real en consola
        res.status(500).json({ message: "Error fetching user" });
    }
}

userControllers.deleteUser = async (req, res) => {
    try {
        // Validar que el ID sea válido
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const deletedUser = await userModel.findByIdAndDelete(req.params.id)
        
        // Verificar si el usuario existe
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" })
    } catch (error) {
        console.error(error) // <-- Esto te mostrará el error real en consola
        res.status(500).json({ message: "Error deleting user" })
    }
}

export default userControllers