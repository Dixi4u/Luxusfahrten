import nodemailer from 'nodemailer'
import { config } from '../config.js'

const sendVerificationEmail = async (emails, verificationCodes) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.email.email_user,
            pass: config.email.email_pass
        }
    })

    const mailOptions = {
        from: config.email.email_user,
        to: emails,
        subject: "Verificación de correo - Luxusfahrten",
        html: `
            <div style="max-width: 600px; margin: 20px auto; background-color: #f9f9f9; border-radius: 12px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden; border: 2px solid #1a202c; font-family: Arial, sans-serif;">
                <div style="background-color: #1a202c; color: #ffffff; text-align: center; padding: 20px; font-size: 24px; font-weight: bold;">
                    🚘 ¡Bienvenido a Luxusfahrten!
                </div>
                <div style="padding: 20px; color: #333333; line-height: 1.6;">
                    <p>Estimado/a,</p>
                    <p>Gracias por registrarte en Luxusfahrten. Para completar tu verificación, por favor utiliza el siguiente código:</p>
                    <div style="display: block; margin: 20px auto; padding: 12px 24px; background-color: #2d3748; color: #ffffff; font-size: 22px; font-weight: bold; text-align: center; border-radius: 8px; width: fit-content;">
                        ${verificationCodes}
                    </div>
                    <p>Este código expirará en <strong>2 horas</strong>. Si no solicitaste este correo, por favor ignóralo.</p>
                    <p>Si necesitas asistencia, puedes comunicarte con nuestro equipo de soporte.</p>
                </div>
                <div style="background-color: #1a202c; text-align: center; padding: 12px; font-size: 14px; color: #ffffff;">
                    Luxusfahrten - El viaje de lujo que mereces ✨
                </div>
            </div>
        `
    }

    return transporter.sendMail(mailOptions)
}

export default sendVerificationEmail
