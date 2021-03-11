const user = require('../models/user');
const fs =require('fs');
const path =require('path');
const ResetPass = require('../models/resetPass');
const crypto = require('crypto');
const ResetPassMailer = require('../mailers/reset_pass_mailer');

module.exports.profile = function(req,res){
    
    user.findById(req.params.id , function(err , user){

    return res.render('user_profile',{
        title: 'slikup',
        profile_user:user
    });
    })
}

module.exports.update =async function(req ,res){
    /*if(req.user.id == req.params.id){
        user.findByIdAndUpdate(req.params.id,req.body , function(err ,user){
            return res.redirect('back');
        })
    }else{
        return res.status(401).send('unauthorized');
    }*/
    if(req.user.id == req.params.id){
        try{
            let User =await user.findById(req.params.id);
            user.uploadedAvatar(req , res, function(err){
                if(err){ console.log('multer error')};
                User.name = req.body.name;
                User.username = req.body.username;
                if(req.file){
                    if(User.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',User.avatar));
                    }
                    // this is saving the path of the uploaded file into the avatar field in the user
                    //User.avatar = 'users/avatars' + '/' + req.file.filename
                    User.avatar=user.avatarPath+'/'+req.file.filename;
                }
                User.save();
                return res.redirect('back');
            }) ;

        }catch(err){
            console.log(err);
            return res.redirect('back');
        }
    }else{
        return res.status(401).send('unauthorized');
    }
}

module.exports.signup =function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    else{
    return res.render('signup' , {
        title : "Slikup"
    })
    }
    
}
module.exports.signin =function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }   
    return res.render('signin' , {
        title : "Slikup"
    })
}

module.exports.signupNew = function(req , res){
    user.findOne({username :req.body.username},function(err,User){
        if(err){console.log('error in finding the user in sign up') ; return;}

        if(!User){
            user.create(req.body , function(err , User){
                if(err){console.log('error in creating the user'); return;}
                console.log(User);
                return res.redirect('/users/signin');
            })
        }
    })
    
}

module.exports.signinLogin = function(req,res){
    req.flash('success' , 'Logged in successfuly ');
    return res.redirect('/');
}

module.exports.signout = function(req, res){
    req.logout();
    req.flash('success' , 'Logged out successfuly ');
    return  res.redirect('/');
}


module.exports.forgetPass = function(req , res){
    return res.render('forget-pass',{
        title: 'slikup',
    });
}
module.exports.updatePassScreen = function(req,res){
    return res.render('reset_pass',{
        title: 'slikup',
    });
}

module.exports.ResetPass =async function(req ,res){
     let User= await user.findOne({username: req.body.email});
     console.log(req.body.email);
     console.log(User);
     if(!User){
        return res.redirect('back');
     }else{
         let accessToken = crypto.randomBytes(20).toString('hex');
        //  console.log(User.id);
        //  console.log(accessToken);
         ResetPass.create({
             user: User.id,
             accessToken: accessToken
         },function(err,ResetPass){
             if(err){console.log('error in making reset pass user'); return;}
            ResetPassMailer.resetpass(ResetPass.populate('User'));
            return res.redirect('/users/signin');
         });

     }
}

module.exports.UpdatePassword = function(req,res){
    console.log('inside update pass');
    console.log(req.body.password);
    console.log(req.body.accessToken);
    return;
    // ResetPass.findOneAndUpdate({accessToken: req.body.})

}