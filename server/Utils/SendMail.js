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

    const accessToken = oauth2Client.getAccessToken();
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.SENDER_EMAIL_ADDRESS,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken
        }
    });


    const mailOptions = {
        from: process.env.SENDER_EMAIL_ADDRESS,
        to: to,
        subject: 'Pattys',
        html: `
            <div style = "max-width: 700px; margin: auto; border: 10px solid #9C6C4A; padding: 50px 20px; font-size: 110%">
                <h2 style = "text-align: center; text-transform: uppercase; color: #D0B16A"> Welcome to Pattys</h2>
                <p>
                    Congratulations! You are almost ready to shop from Pattys Place
                    Just click the button below to validate your email address.
                </p>
                    
                <a href=${url} style="background: #6A6932; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
                
                <p>If the button doesn't work for any reason, you can also click on the link below:</p>
                
                <div>${url}</div>
            </div>
        `
    }

    smtpTransport.sendMail(mailOptions, (err, info) => {
        if(err) return err
        return info
    });
}

export default sendEmail;