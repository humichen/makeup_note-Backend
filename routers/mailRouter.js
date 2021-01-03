const express = require("express");
const nodemailer = require("nodemailer");
const expressAsyncHandler = require("express-async-handler");
const mailRouter = express.Router();
require('dotenv').config();

mailRouter.post('/mail', expressAsyncHandler(async (req, res) => {
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        secureConnection: false, // SSL方式,防止竊取訊息
        auth: {
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.EMAIL_PASS
        }, tls: {
            //不檢查伺服器
            rejectUnauthorized: false
        }
    }))

}));

