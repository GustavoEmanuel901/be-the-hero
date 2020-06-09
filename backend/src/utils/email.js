const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'gustavoemanuel901@gmail.com',
        pass: 'xxxxxxxxxxxxxxxxx'
    }
})

module.exports = transporter;