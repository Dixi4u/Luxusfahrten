import nodemailer from "nodemailer";
import { config } from "../config.js";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.email.email_user,
        pass: config.email.email_pass
    }
});

const sendMail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: '"Luxusfahrten" <info@luxusfahrten.com>',
            to,
            subject,
            text,
            html
        });
        return info;
    } catch (error) {
        console.log("Error sending recovery mail:", error);
        throw error;
    }
};

const HTMLRecoveryEmail = (code) => {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Recuperación de Contraseña</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: 'Poppins', sans-serif;
                background-color: #0e0e0e;
                color: #e0e0e0;
            }

            .container {
                max-width: 600px;
                margin: 30px auto;
                background-color: #1a1a1a;
                border: 1px solid #333;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 0 10px rgba(255, 215, 0, 0.2);
            }

            .header {
                background-color: #111;
                padding: 40px 30px;
                text-align: center;
                color: #ffd700;
            }

            .header h1 {
                font-size: 24px;
                margin: 0;
                letter-spacing: 1px;
            }

            .content {
                padding: 30px;
                color: #ddd;
                font-size: 15px;
                line-height: 1.6;
            }

            .code-box {
                background-color: #222;
                border: 2px solid #ffd700;
                color: #ffd700;
                font-size: 28px;
                font-weight: bold;
                letter-spacing: 6px;
                text-align: center;
                padding: 20px;
                margin: 30px 0;
                border-radius: 10px;
            }

            .button {
                display: inline-block;
                background-color: #ffd700;
                color: #111;
                text-decoration: none;
                padding: 14px 28px;
                font-weight: bold;
                border-radius: 50px;
                margin: 20px 0;
                transition: background-color 0.3s ease;
            }

            .button:hover {
                background-color: #e6c200;
            }

            .footer {
                background-color: #111;
                color: #888;
                text-align: center;
                font-size: 12px;
                padding: 20px;
                border-top: 1px solid #333;
            }

            .logo {
                font-size: 18px;
                font-weight: 700;
                margin-bottom: 10px;
                color: #ffd700;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">Luxusfahrten</div>
                <h1>Recuperación de Contraseña</h1>
            </div>
            <div class="content">
                <p>Hola,</p>
                <p>Hemos recibido una solicitud para restablecer tu contraseña. Si fuiste tú, usa el siguiente código:</p>
                <div class="code-box">${code}</div>
                <p>Este código expirará en 30 minutos. Si no realizaste esta solicitud, puedes ignorar este mensaje.</p>
                <p style="text-align:center;">
                    <a href="#" class="button">Ir a Luxusfahrten</a>
                </p>
            </div>
            <div class="footer">
                &copy; ${new Date().getFullYear()} Luxusfahrten. Todos los derechos reservados.<br/>
                Este correo fue enviado automáticamente, por favor no respondas a este mensaje.
            </div>
        </div>
    </body>
    </html>
    `;
};

export { sendMail, HTMLRecoveryEmail };
