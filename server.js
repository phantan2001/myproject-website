
const express = require("express");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require('google-auth-library');

// Khởi tạo NodeJS App bằng Express
const app = express();
// Cho phép nhận data thông qua req.body của API gửi lên.
app.use(express.json());
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

// add route
const routes = require('./src/routes');
app.use('/', routes);
const bodyParser = require('body-parser');

require('dotenv').config();

const APP_PORT = 3000;
const APP_HOST = 'localhost';
const GOOGLE_MAILER_CLIENT_ID = process.env.GOOGLE_MAILER_CLIENT_ID
const GOOGLE_MAILER_CLIENT_SECRET = process.env.GOOGLE_MAILER_CLIENT_SECRET
const GOOGLE_MAILER_REFRESH_TOKEN = process.env.GOOGLE_MAILER_REFRESH_TOKEN
const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS


app.use(bodyParser.urlencoded({ extended: false }));

// Khởi tạo OAuth2Client với Client ID và Client Secret 
const myOAuth2Client = new OAuth2Client(
    GOOGLE_MAILER_CLIENT_ID,
    GOOGLE_MAILER_CLIENT_SECRET
)
myOAuth2Client.setCredentials({
    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
})


app.post('/send-email', async (req, res) => {
    try {
        //Lấy dữ liệu từ form gửi mail
        const { name, email, subject, message } = req.body;
        if(!name || !email || !subject || !message) throw new Error ('Please provide name, email, subject and message content!');

        const myAccessTokenObject = await myOAuth2Client.getAccessToken();
        const myAccessToken = myAccessTokenObject?.token
        // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail

        const transport = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                type: 'OAuth2',
                user: ADMIN_EMAIL_ADDRESS,
                clientId: GOOGLE_MAILER_CLIENT_ID,
                clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
                refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
                accessToken: myAccessToken
            }
        })
        // mailOption là những thông tin gửi từ phía client lên thông qua API
        const mailOptions = {
            to: ADMIN_EMAIL_ADDRESS,
            subject: "["+email+"]" + subject,
            html: `<h3>${name}</h3> <p>${message}</p>`
        }
        //gửi email
        await transport.sendMail(mailOptions);
        res.status(200).send({ status: 'success', message: 'Gửi tin nhắn thành công!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({errors: error.message});
    }
    
})



// Run application
app.listen(APP_PORT, APP_HOST, () => {
    console.log(`Server running at ${APP_HOST}:${APP_PORT}/`)
})


