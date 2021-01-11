import mailOptions, { transporter } from './emailConfig';

const sendEmail = async (messageToSend?: string) => {
    try {
        if(messageToSend)
            mailOptions.text = messageToSend;
        await transporter.sendMail(mailOptions)
    } catch(error) {
        console.log(`Error occured in email-service.ts ${error}`);
    }
}

export default sendEmail;