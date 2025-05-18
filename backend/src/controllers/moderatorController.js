import moderatorModel from '../models/Moderator.js'
import {v2 as cloudinary} from 'cloudinary'
import {config} from '../config.js'

cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret
})

const moderatorControllers = {}

moderatorControllers.getModerators = async (req, res) => {
    try {
        const moderators = await moderatorModel.find()
        res.json(moderators)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error fetching moderators' })
    }
}

moderatorControllers.updateModerator = async (req, res) => {
    try {
        const { name, lastName, birthday, email, password, telephone, dui, isVerified } = req.body
        let imgUrl = ''
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'public', allowed_formats: ['jpg', 'png', 'jpeg'] })
            imgUrl = result.secure_url
        }
        const updatedModerator = await moderatorModel.findByIdAndUpdate(req.params.id, { name, lastName, birthday, email, password, telephone, dui, isVerified, image: imgUrl }, { new: true })
        res.json({ message: 'Moderator updated' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error updating moderator' })
    }
}

moderatorControllers.deleteModerator = async (req, res) => {
    try {
        await moderatorModel.findByIdAndDelete(req.params.id)
        res.json({ message: 'Moderator deleted' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error deleting moderator' })
    }
}

export default moderatorControllers