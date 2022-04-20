import nodemailer from "nodemailer";

const sendEmail = async (to, url, txt) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const mailOptions = { 
        from: `${process.env.SMTP_NAME} <${process.env.SMTP_USER}>`,
        to: to,
        subject: 'Pattys',
        html: `
            <div style = "max-width: 700px; margin: 40px auto; border: 4px solid #4297A0; border-radius: 4px; padding: 50px 20px; font-size: 110%">
                <h2 style = "text-align: center; text-transform: uppercase; color: #B52B40">Pattys</h2>
                <p>
                    You requested for a password reset. If this was you, Please click the button or link below.
                </p>
                    
                <a href=${url} style="border: 1px solid #E57F84; border-radius: 40px; text-decoration: none; color: #2F5061; 
                font-size: 1.5rem; font-weight: 600; padding: 10px 20px; margin: 10px auto; display: inline-block;">${txt}</a>
                <div style = "margin-top: 20px">${url}</div>
                <p>Otherwise ignore</p>
                
            </div>
        `
    }

    await transporter.sendMail(mailOptions)
}

export default sendEmail;