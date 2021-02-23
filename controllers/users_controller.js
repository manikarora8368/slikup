module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: 'slikup'
    });
}
const user = require('../models/user');
module.exports.signup =function(req,res){
    return res.render('signup' , {
        title : "Slikup"
    })
}
module.exports.signin =function(req,res){
    return res.render('signin' , {
        title : "Slikup"
    })
}

module.exports.signupNew = function(req , res){
    user.findOne({username :req.body.username},function(err,User){
        if(err){console.log('error in finding the user in sign up') ; return;}

        if(!User){
            user.create(req.body , function(err , user){
                if(err){console.log('error in creating the user'); return;}
                console.log(user);
                return res.redirect('/signin');
            })
        }
    })
    
}

module.exports.signinLogin = function(req,res){
 return res.redirect('/users/profile');
}