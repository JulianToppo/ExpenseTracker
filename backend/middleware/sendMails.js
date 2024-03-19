const Sib = require('sib-api-v3-sdk')
require('dotenv').config()


exports.sendMails = async(mail,message) => {
   // add the api key to the Sendinblue client.
    const client = Sib.ApiClient.instance
    const apiKey = client.authentications['api-key']
    apiKey.apiKey = process.env.API_KEY

    //Sending email service - sender needs to have an account on sendinblue
    const tranEmailApi = new Sib.TransactionalEmailsApi()
    const sender = {
        email: 'juliankingston07@gmail.com',
        name: 'Julian Toppo',
    }
    const receivers = [
        {
            email:mail,
        },
    ]
    await tranEmailApi
        .sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Reset your password',
            textContent: `
        Reset your password Mail.
        `,
            htmlContent: `
        <h1>Reset Link :</h1>
        <a href=" {{params.resetLink}}">Click on this link to reset password </a>
                `,
            params: {
                resetLink: message,
            },
        })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
}
