# Bestbuy.ca Scalper & Notifier
## Description

This is a browser automation script using the tool called Puppeteer to automate adding an item that has a competitive stock into your cart and it will notify as soon as that item of your choice is avaliable to purchase. Nodemailer is used to send an email to the user using a mail server of your choice. I used my gmail as my mail server... however there are many config options. Please see nodemailer documentation @ https://nodemailer.com/usage/

## How to use
1. Clone repo
2. npm i 
3. Now in the root folder, you should create a file called links.txt and on everyline enter the link of the bestbuy item you want to watch.
4. npm run dev (run the dev script that's setup)

## Configure email service
    - Navigate to src/config/emailConfig.ts and focus on transporter auth method
    - To use your gmail set your credentials in your .env file.
    - You must then go to your gmail portal and manage account area and then allow less secure applications. 
    - Then focus your attention on the mailOptions and set the "FROM" field to the email you want to send from, the "TO" field is the email you want to send to...
        - please see nodemailer documentation for the full list of options @ https://nodemailer.com/usage/

## Customize your email template
    - Navigate to src/config/emailTemplate.ts
    - edit the return string of the getTemplate method to your liking
    - Thats it!

##

