import nodemailer from 'nodemailer';
import {google} from 'googleapis';
import dotenv from 'dotenv';

const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

dotenv.config();

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REFRESH_TOKEN,
    OAUTH_PLAYGROUND
);

// send mail
const sendEmail = (to, url, txt) => {
    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    });

    // const accessToken = oauth2Client.getAccessToken();
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.SENDER_EMAIL_ADDRESS,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.ACCESS_TOKEN
        }
    });


    const mailOptions = {
        from: process.env.SENDER_EMAIL_ADDRESS,
        to: to,
        subject: 'Pattys',
        html: `
            <div style = "max-width: 80%; margin: 4rem auto; border: 10px solid #4297A0; border-radius: 40px; padding: 50px 20px; font-size: 110%">
                <h2 style = "text-align: center; text-transform: uppercase; color: #2F5061">Pattys</h2>
                <p>
                    You requested for a password reset. If this was you, Please click the button or link below.
                </p>
                    
                <a href=${url} style="background: none; text-decoration: none; color: #E57F84; padding: 10px 20px; margin: 10px 0; display: inline-block; border: 1px solid #B52B40">${txt}</a>
                <div>${url}</div>
                <p>Otherwise ignore</p>
                
            </div>
        `
    }

    smtpTransport.sendMail(mailOptions, (err, info) => {
        if(err) return err;
        return info
    });
}

export default sendEmail