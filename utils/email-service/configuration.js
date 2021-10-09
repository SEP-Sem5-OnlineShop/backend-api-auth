require('dotenv').config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis")
const OAuth2 = google.auth.OAuth2

const EMAIL_SERVICE_ADDRESS = process.env.EMAIL_SERVICE_ADDRESS || ""
const EMAIL_SERVICE_REFRESH_TOKEN = process.env.EMAIL_SERVICE_REFRESH_TOKEN || ""
const EMAIL_SERVICE_CLIENT_SECRET = process.env.EMAIL_SERVICE_CLIENT_SECRET || ""
const EMAIL_SERVICE_CLIENT_ID = process.env.EMAIL_SERVICE_CLIENT_ID || ""
const EMAIL_SERVICE_REDIRECT_URL = process.env.EMAIL_SERVICE_REDIRECT_URL || ""

const createTransporter = async () => {
    try {
        /**
         * configure email client
         */
        const oauth2Client = new OAuth2(
            EMAIL_SERVICE_CLIENT_ID,
            EMAIL_SERVICE_CLIENT_SECRET,
            EMAIL_SERVICE_REDIRECT_URL
        )

        oauth2Client.setCredentials({
            refresh_token: EMAIL_SERVICE_REFRESH_TOKEN
        })

        /**
         * create new access token using the refresh token given
         * 
         */
        const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
                if (err) reject()
                resolve(token)
            })
        })

        console.log(accessToken)

        /**
         * create email transporter using nodemailer
         * according to 3-legged OAuth2 authentication
         */
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: EMAIL_SERVICE_ADDRESS,
                accessToken,
                clientId: EMAIL_SERVICE_CLIENT_ID,
                clientSecret: EMAIL_SERVICE_CLIENT_SECRET,
                refreshToken: EMAIL_SERVICE_REFRESH_TOKEN
            }
        })
        return transporter
    }
    catch (e) {
        // console.log(e)
    }
}

/**
 * 
 * @param {*
 * subject : email_subject_here
 * text: email_text_here
 * to: email_to_address_here
 * from: email_from_address_here
 * } emailOptions 
 */
module.exports.sendEmail = async (emailOptions) => {
    try {
        const emailTransporter = await createTransporter()
        return await emailTransporter.sendMail(emailOptions)
    }
    catch (e) {
        throw e
    }
}