import userModel from "../models/User.js"
import { v2 as cloudinary } from "cloudinary"
import { config } from "../config.js"

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
        const { name, lastName, birthday, email, password, telephone, dui, isVerified } = req.params
        let imgUrl = ""
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { folder: "public", allowed_formats: ["jpg", "png", "jpeg"] })
            imgUrl = result.secure_url
        }
        const updateUser = await userModel.findOneAndUpdate(req.params.id, { name, lastName, birthday, email, password, telephone, dui, isVerified , image: imgUrl }, { new: true })
        res.json({ message: "User updated" })
        res.status(200).json({ message: "User updated successfully", user: updateUser })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error updating user" })
    }
}

userControllers.deleteUser = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        res.json({ message: "User deleted" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error deleting user" })
    }
}

export default userControllers