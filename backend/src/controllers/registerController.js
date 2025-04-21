import usersModels from '../models/User.js';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { config } from '../config.js';

const register = {};

register.Register = async (req, res) => {
    const {
        name,
        lastName,
        birthday,
        email,
        password,
        telephone,
        dui,
        isVerified,
        role,
        providerData,
        adminData
    } = req.body;

    try {
        
        const validRoles = ['admin', 'provider', 'user'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Rol no válido. Debe ser 'admin', 'provider' o 'user'." });
        }

        
        const existUser = await usersModels.findOne({ $or: [{ email }, { dui }] });
        if (existUser) {
            return res.status(400).json({ message: "El email o el DUI ya se encuentra registrado." });
        }

        const passwordHash = await bcryptjs.hash(password, 10);

    
        const newUserData = {
            name,
            lastName,
            birthday,
            email,
            password: passwordHash,
            telephone,
            dui,
            isVerified,
            role
        };

        if (role === 'provider' && providerData) {
            newUserData.providerData = providerData;
        }

        if (role === 'admin' && adminData) {
            newUserData.adminData = adminData;
        }

        const newUser = new usersModels(newUserData);
        await newUser.save();

       
        jsonwebtoken.sign(
            { id: newUser._id, role: newUser.role },
            config.JWT.secret,
            { expiresIn: config.JWT.expiresIn },
            (err, token) => {
                if (err) {
                    console.log("Hubo un error en el token: " + err.message);
                    return res.status(500).json({ message: "Error al generar el token" });
                }

                res.cookie("authtoken", token);
                res.json({ message: `El ${role} se ha registrado correctamente.` });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Hubo un error en el registro." });
    }
};

export default register;
