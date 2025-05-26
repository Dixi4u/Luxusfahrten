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
        const { name, actualDate, birthday, address, email, password, telephone, employeeType } = req.body
        
        // Obtener el moderador existente para conservar la imagen actual si no se sube una nueva
        const existingModerator = await moderatorModel.findById(req.params.id)
        if (!existingModerator) {
            return res.status(404).json({ message: 'Moderator not found' })
        }

        let imgUrl = existingModerator.image // Mantener la imagen existente por defecto
        
        // Solo actualizar la imagen si se subió un nuevo archivo
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { 
                folder: 'public', 
                allowed_formats: ['jpg', 'png', 'jpeg'] 
            })
            imgUrl = result.secure_url
        }

        // Preparar los datos a actualizar
        const updateData = { 
            name, 
            actualDate, 
            birthday, 
            address, 
            email, 
            telephone, 
            employeeType, 
            image: imgUrl 
        }

        // Solo incluir password si se proporcionó
        if (password && password.trim() !== '') {
            updateData.password = password
        }

        const updatedModerator = await moderatorModel.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true }
        )
        
        res.json({ 
            message: 'Moderator updated',
            moderator: updatedModerator 
        })
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