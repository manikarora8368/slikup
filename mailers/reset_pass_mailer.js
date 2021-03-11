const nodeMailer = require('../config/nodemailer');
const User =require('../models/user');

// this is the another way of exporting a method
exports.resetpass =async (ResetPass)=>{
    console.log('inside reset password mailer');
    console.log(ResetPass);
    let user =await User.findById(ResetPass.user);
    console.log(user);
    let htmlString = nodeMailer.renderTemplate({ResetPass: ResetPass}, '/comments/reset_pass_mailer.ejs');
    nodeMailer.transporter.sendMail({
        from: 'manikarora8368@gmail.com',
        to: user.username,
        subject: "link to reset the password",
        html: htmlString
    },(err , info)=>{
        if(err){
            console.log('error in sending the mail', err);
            return;
        }
        console.log(info);
        return;
    })
}