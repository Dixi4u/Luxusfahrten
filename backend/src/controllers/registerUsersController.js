import jsonwebtoken from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import userModel from '../models/User.js'
import providerModel from '../models/Provider.js'
import { config } from '../config.js'
import sendVerificationEmail from '../utils/verificationCode.js'

const register = {}

register.registerUser = async (req, res) => {
    const { name, lastName, birthday, email, password, telephone, dui, isVerified } = req.body
    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' })
        }
        const passwordHash = await bcryptjs.hash(password, 10)
        const newUser = new userModel({name,lastName,birthday,email,password: passwordHash,telephone,dui,isVerified
        })
        await newUser.save()

        const verificationCode = crypto.randomBytes(3).toString('hex')
        console.log(verificationCode)

        const token = jsonwebtoken.sign({email, verificationCode}, config.JWT.secret, { expiresIn: '2h' })
        res.cookie('verificationCode', token, { httpOnly: true, maxAge: 2*60*60*1000 }) // 2 hours

        await sendVerificationEmail(email, verificationCode)

        return res.status(201).json({ message: 'User registered successfully', token })

    }catch (error) {
        return res.status(500).json({ message: 'Error checking existing user', error })
    }
}


register.registerProvider = async (req, res) => {
    const { 
        name, lastName, birthday, email, password, telephone, dui, 
        isVerified, addressProvider, typeSupplier 
    } = req.body

    try {
        const existingProvider = await providerModel.findOne({ email })
        if (existingProvider) {
            return res.status(400).json({ message: 'Email already exists' })
        }

        const passwordHash = await bcryptjs.hash(password, 10)

        const newProvider = new providerModel({
            name,
            lastName,
            birthday,
            email,
            password: passwordHash,
            telephone,
            dui,
            isVerified,
            addressProvider,
            typeSupplier
        })

        await newProvider.save()

        const verificationCode = crypto.randomBytes(3).toString('hex')
        console.log('Verification code:', verificationCode)

        const token = jsonwebtoken.sign(
            { email, verificationCode },
            config.JWT.secret,
            { expiresIn: '2h' }
        )
        res.cookie('verificationCode', token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }) // 2 horas

        await sendVerificationEmail(email, verificationCode)

        return res.status(201).json({ message: 'Provider registered successfully', token })

    } catch (error) {
        return res.status(500).json({ message: 'Error registering provider', error })
    }
}
register.verifyUser = async (req, res) => {
    const { email, verificationCode } = req.body
    try {
        const token = req.cookies.verificationCode
        if (!token) {
            return res.status(401).json({ message: 'No verification code provided' })
        }

        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        if (decoded.email !== email || decoded.verificationCode !== verificationCode) {
            return res.status(401).json({ message: 'Invalid verification code' })
        }

        await userModel.updateOne({ email }, { isVerified: true })

        return res.status(200).json({ message: 'User verified successfully' })
    } catch (error) {
        return res.status(500).json({ message: 'Error verifying user', error })
    }
}

export default register