
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const sendEmail = async (to, url, subject, txt) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

      
    await transporter.verify();
   

    const mailOptions = {
      from: `"Pattys" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: `
        <div style="max-width: 700px; margin: 40px auto; border: 1px solid #F05D23; border-radius: 10px; padding: 50px 20px; font-size: 110%">
          <h2 style="text-align: center; text-transform: uppercase; color: #260C1A; font-weight: 700">Pattys</h2>
          <p>
            You requested for a password reset. If this was you, Please click the button or link below.
          </p>
          <a href="${url}" style="border: 1px solid #C5D86D; border-radius: 10px; text-decoration: none; background-color: #C5D86D; color: #F7F7F2; font-size: 1.5rem; padding: 10px 20px; margin: 10px auto; display: inline-block;">${txt}</a>
          <div style="margin-top: 20px">${url}</div>
          <p>Otherwise ignore this email.</p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.messageId);
    return result;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

export default sendEmail;


