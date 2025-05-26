import moderatorModel from '../models/Moderator.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import { config } from '../config.js'

const register = {}

cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
})

register.registerModerator = async (req, res) => {
    const { name, actualDate, birthday, address, email, password, telephone, employeeType } = req.body;
    let imgUrl = "";
    try {
        const existingModerator = await moderatorModel.findOne({ email });
        if (existingModerator) {
            return res.status(400).json({ message: 'The email is already in use' });
        }
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'public', allowed_formats: ['jpg', 'png', 'jpeg'] });
            imgUrl = result.secure_url;
        }
        const passwordHash = await bcryptjs.hash(password, 10);

        // Validar fechas
        const parsedBirthday = new Date(birthday);
        const parsedActualDate = new Date(actualDate);
        if (isNaN(parsedBirthday) || isNaN(parsedActualDate)) {
            return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD.' });
        }

        const newModerator = new moderatorModel({
            name,
            actualDate: parsedActualDate,
            birthday: parsedBirthday,
            address,
            email,
            password: passwordHash,
            telephone,
            employeeType,
            image: imgUrl
        });
        await newModerator.save();

        jwt.sign(
            { id: newModerator._id },
            config.JWT.secret,
            { expiresIn: config.JWT.expiresIn },
            (error, token) => {
                if (error) {
                    return res.status(500).json({ message: 'Error generating the token' });
                }
                res.cookie('authToken', token);
                res.status(201).json({ message: 'Moderator registered successfully' });
            }
        );
    } catch (error) {
        console.error('Error registering moderator', error);
        res.status(500).json({ message: 'Error registering moderator' });
    }
}

export default register