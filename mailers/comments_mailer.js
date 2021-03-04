const nodeMailer = require('../config/nodemailer');


// this is the another way of exporting a method
exports.newComment = (comment)=>{
    console.log('inside newComment mailer');
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comments.ejs');
    nodeMailer.transporter.sendMail({
        from: 'manikarora8368@gmail.com',
        to: comment.user.username,
        subject: "new comment published!!",
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