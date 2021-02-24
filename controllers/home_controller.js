const posts = require('../models/post');
module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id' , 25);
    // posts.find({},function(err , post){
    //     if(err){console.log('error in finding the posts');return;}
    //     return res.render('home' , {
    //     title : "Slikup",
    //     Posts: post
    // })
    // });
// populate the user for each post
    posts.find({}).populate('user').exec(function(err , post){
        if(err){console.log('error in finding the posts');return;}
        return res.render('home' , {
        title : "Slikup",
        Posts: post
    })
    });

}