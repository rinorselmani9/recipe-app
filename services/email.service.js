const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASS
    },

})

const verifyAccountTemplate = (token) => {
    const url = `http://mylink/verify?token=${token}`
    return {
        subject: 'Recipe App',
        text: 'Please verify your account by clicking on the link below \n',
        html:`
            <h1>Recipe-App Verify Account</h1>
            <p>Please verify your account by clicking on the link below</p>
            <a href="${url}">Verify Account</a>
        `
    }
}

const forgotPasswordTemplate = (token) => {
    const url =`http://mylink/forgot-password?token=${token}`

    return{
        subject:'Recipe App',
        text:'To change your password click on the link below. If you didn\'t do this request please ignore this email!',
        html:`
            <h1>Recipe-App Change Password Request</h1>
            <p>To change your password click on the link below. If you didn\'t do this request please ignore this email!</p>
            <a href="${url}">Change Password</a>
        ` 
    }
}

module.exports = {
    sendVerificationEmail : (email,token) => {
        const body = verifyAccountTemplate(token)

        transporter.sendMail({
            from:'Recipe App <support@recipe-app.com',
            to:email,
            subject:body.subject,
            text:body.text,
            html:body.html
        })
    },
    sendForgotPasswordEmail : async(email,token) => {
        const body = forgotPasswordTemplate(token)

        transporter.sendMail({
            from:'Recipe App <support@recipe-app.com',
            to:email,
            subject:body.subject,
            text:body.text,
            html:body.html
        })
    }
}