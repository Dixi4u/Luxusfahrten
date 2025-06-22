import jsonwebtoken from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

import userModel from '../models/User.js'
import providerModel from '../models/Provider.js'
import moderatorModel from '../models/Moderator.js'

import { config } from '../config.js'
import { sendMail, HTMLRecoveryEmail } from '../utils/emailPassRecov.js'

const passRecov = {}
passRecov.requestCode = async (req, res) => {
    const { email } = req.body;

  
    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ message: 'Invalid or missing email address' });
    }

    try {
        let userFound;
        let userType;

        userFound = await moderatorModel.findOne({ email });
        if (userFound) {
            userType = 'moderator';
        } else {
            userFound = await providerModel.findOne({ email });
            if (userFound) {
                userType = 'provider';
            } else {
                userFound = await userModel.findOne({ email });
                if (userFound) {
                    userType = 'user';
                }
            }
        }

        if (!userFound) {
            return res.status(404).json({ message: 'User not found' });
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        const token = jsonwebtoken.sign(
            { email, code, userType, verified: false },
            config.JWT.secret,
            { expiresIn: '1h' }
        );

        res.cookie("tokenRecoveryCode", token, { maxAge: 20 * 60 * 1000 })

        console.log('Sending recovery code to:', email);

        await sendMail(
            email,
            "Password recovery code",
            `Your verification code is: ${code}`, 
            HTMLRecoveryEmail(code)
        )

        res.status(200).json({ message: 'Recovery code sent to email' });

    } catch (error) {
        console.error('Error requesting password recovery:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



passRecov.verifyCode = async (req, res) => {
    const { code } = req.body

    try {
        const token = req.cookies.tokenRecoveryCode

        if (!token) {
            return res.status(401).json({ message: 'No token provided' })
        }
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if (decoded.code !== code) {
            return res.status(401).json({ message: 'Invalid code' })
        }

        const newToken = jsonwebtoken.sign(
            {   email: decoded.email, 
                code: decoded.code,
                userType: decoded.userType, 
                verified: true 
            },
            config.JWT.secret,
            { expiresIn: '1h' }
        )

        res.cookie('tokenRecoveryCode', newToken, { maxAge: 60 * 60 * 1000})

        res.status(200).json({ message: 'Recovery code verified' })

    } catch (error) {
        console.error("Error verifying recovery code:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

passRecov.resetPassword = async (req, res) => {
    const { password } = req.body

    try {
        const token = req.cookies.tokenRecoveryCode

        if (!token) {
            return res.status(401).json({ message: 'No token provided' })
        }

        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if (!decoded.verified) {
            return res.status(401).json({ message: 'Code not verified' })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        let userFound
        if (decoded.userType === 'moderator') {
            userFound = await moderatorModel.findOneAndUpdate(
                { email: decoded.email },
                { password: hashedPassword },
                { new: true }
            )
        } else if (decoded.userType === 'provider') {
            userFound = await providerModel.findOneAndUpdate(
                { email: decoded.email },
                { password: hashedPassword },
                { new: true }
            )
        } else if (decoded.userType === 'user') {
            userFound = await userModel.findOneAndUpdate(
                { email: decoded.email },
                { password: hashedPassword },
                { new: true }
            )
        }

        if (!userFound) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.clearCookie('tokenRecoveryCode')

        res.status(200).json({ message: 'Password reset successfully' })

    } catch (error) {
        console.error("Error resetting password:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export default passRecov