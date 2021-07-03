const posts = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
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
  // normal way of writing the create function

  /*posts.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate:{
            path: 'user'
        }
    })
    .exec(function(err , post){
        if(err){console.log('error in finding the posts');return;}

        User.find({},function(err , users){
            if(err){console.log('error in getting users');return;}
        return res.render('home' , {
            title : "Slikup",
            Posts: post,
            all_users: users
    })
        })

    });
*/
  //async way of writing the function

  try {
    let post = await posts
      .find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
        populate: {
          path: "likes",
        },
      })
      .populate("likes");
    let users = await User.find({});
      
    return res.render("home", {
      title: "Slikup",
      Posts: post,
      all_users: users,
    });
  } catch (err) {
    console.log("error is", err);
    return;
  }
};
