const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const {envsConfig} = require("../configs");
const emailTemplates = require('../emailTemplates/index')
const {apiError} = require("../errors");

const sendEmail = async (receiver, emailAction, context = {}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: envsConfig.EMAIL,
            pass: envsConfig.PASSWORD
        }
    })

    const templateInfo = emailTemplates[emailAction]

    if (!templateInfo.subject || !templateInfo.templateName) {
        throw new apiError('Wrong template', 500)
    }

    const options = {
        viewEngine:{
            defaultLayout: path.join(process.cwd(),'src', 'emailTemplates', 'layouts', 'maine'),
            layoutDir: path.join(process.cwd(),'src', 'emailTemplates', 'layouts'),
            partialsDir: path.join(process.cwd(),'src', 'emailTemplates', 'partials'),
            extname: '.hbs'
        },
        extName: '.hbs',
        viewPath: path.join(process.cwd(),'src', 'emailTemplates', 'views')
    }

    transporter.use('compile', hbs(options))

    return transporter.sendMail({
        from: 'Me',
        to: receiver,
        subject: templateInfo.subject,
        template: templateInfo.templateName,
        context
    })
}

module.exports = {
    sendEmail
}
