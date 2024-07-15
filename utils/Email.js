const nodemailer=require('nodemailer');
const sendEmail=async options=>{
    const transporter=nodemailer.createTransport({
        host:"smtp-relay.brevo.com",
        port:"587",
        auth:{
            user:'781800001@smtp-brevo.com',
            pass:'rExaRU8fqOJCBDv4'
        }
    })
    //specify email options
    const mailOptions={
        from:'Abu Bakkar <abu.bsse4114@iiu.edu.pk>',
        to:options.email,
        subject:options.subject,
        html :options.message,
    }
    const result = await transporter.sendMail(mailOptions)
    console.log(result)
}
module.exports=sendEmail