import { config } from 'dotenv';
import { createTransport } from 'nodemailer';

config();

export const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: process.env.PERSONAL_EMAIL_ADDRESS,
    subject: 'Yoinked card',
    text: ''
};

export default mailOptions;