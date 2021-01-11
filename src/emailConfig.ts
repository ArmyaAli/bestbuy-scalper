import { config } from 'dotenv';
import { createTransport } from 'nodemailer';
config();


export const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
});

const mailOptions = {
    from: 'ali.umar.work@gmail.com',
    to: 'ali.umar.work@gmail.com',
    subject: 'Yoinked card',
    text: 'Helloworld'
};

export default mailOptions;