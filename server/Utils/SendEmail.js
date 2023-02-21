import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (to, url, txt) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
    });

    const mailOptions = { 
        from: process.env.SMTP_NAME,
        to: to,
        subject: 'Pattys',
        html: `
            <div style = "max-width: 700px; margin: 40px auto; border: 1px solid #F05D23; border-radius: 10px; padding: 50px 20px; font-size: 110%">
                <h2 style = "text-align: center; text-transform: uppercase; color: #260C1A; font-weight: 700">Pattys</h2>
                <p>
                    You requested for a password reset. If this was you, Please click the button or link below.
                </p>
                    
                <a href=${url} style="border: 1px solid #C5D86D; border-radius: 10px; text-decoration: none; background-color: #C5D86D; color: #F7F7F2;
                font-size: 1.5rem;  padding: 10px 20px; margin: 10px auto; display: inline-block;">${txt}</a>
                <div style = "margin-top: 20px">${url}</div>
                <p>Otherwise ignore</p>
                
            </div>
        `
    }

    await transporter.sendMail(mailOptions)
}

export default sendEmail;