module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: 'slikup'
    });
}
const user = require('../models/user');
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
 return res.redirect('/');
}

module.exports.signout = function(req, res){
    req.logout();
    return  res.redirect('/');
}