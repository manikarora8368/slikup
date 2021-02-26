const user = require('../models/user');

module.exports.profile = function(req,res){
    user.findById(req.params.id , function(err , user){
    return res.render('user_profile',{
        title: 'slikup',
        profile_user:user
    });
    })

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
 return res.redirect('/');
}

module.exports.signout = function(req, res){
    req.logout();
    return  res.redirect('/');
}

module.exports.update = function(req ,res){
    if(req.user.id == req.params.id){
        user.findByIdAndUpdate(req.params.id,req.body , function(err ,user){
            return res.redirect('back');
        })
    }else{
        return res.status(401).send('unauthorized');
    }
}