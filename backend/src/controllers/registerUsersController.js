import jsonwebtoken from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import userModel from '../models/User.js'
import crypto from 'crypto'
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

        const verificationCode = crypto.randomBytes(2).toString('hex')
        console.log('Verification code:',  verificationCode)

        const token = jsonwebtoken.sign({email, verificationCode}, config.JWT.secret, { expiresIn: '2h' })
        res.cookie('verificationCode', token, { httpOnly: true, maxAge: 2*60*60*1000 }) 

        await sendVerificationEmail(email, verificationCode)

        return res.status(201).json({ message: 'User registered successfully', token })

    }catch (error) {
        console.log('Error'+ error)
        res.status(500).json({ message: error.message })
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

        const verificationCode = crypto.randomBytes(2).toString('hex')
        console.log('Verification code:', verificationCode)

        const token = jsonwebtoken.sign(
            { email, verificationCode },
            config.JWT.secret,
            { expiresIn: '2h' }
        )
        res.cookie('verificationCode', token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }) 

        await sendVerificationEmail(email, verificationCode)

        return res.status(201).json({ message: 'Provider registered successfully', token })

    } catch (error) {
        return res.status(500).json({ message: 'Error registering provider', error })
    }
}
register.verificationCode = async (req, res) => {   
    const { code } = req.body
    const token = req.cookies.verificationCode

    if (!token) {
        return res.status(400).json({ message: "Verification token not found in cookies" })
    }

    try {
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const { email, verificationCode: storedCode } = decoded

        if (!email || !storedCode) {
            return res.status(400).json({ message: "Token is invalid or missing required fields" })
        }

        if (code !== storedCode) {
            return res.status(401).json({ message: "Invalid verification code" })
        }

    
        let client = await userModel.findOne({ email })
        if (!client) {
            client = await providerModel.findOne({ email })
        }

        if (!client) {
            return res.status(404).json({ message: `User with email ${email} not found in userModel or providerModel` })
        }

        client.isVerified = true
        await client.save()

        res.clearCookie("verificationCode")
        return res.status(200).json({ message: "Email verified successfully" })

    } catch (error) {
        console.error("Error verifying code:", error)
        return res.status(500).json({ message: "Error verifying code", error: error.message })
    }
}


export default register