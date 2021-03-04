//const { findById } = require('../models/user');
const user = require('../models/user');
const fs =require('fs');
const path =require('path');

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
