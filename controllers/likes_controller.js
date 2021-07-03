const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike =async function(req,res){
    try{
        let likeable;
        let deleted =false;
        // console.log(req.query.type);
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }
        // console.log(likeable);
        // check if a like already exists
        let existingLike =await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });
        // console.log(existingLike);
        // if a like already exists then delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;
        }
        else{
            // make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable : req.query.id,
                onModel: req.query.type
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return res.redirect('back');
        //  res.json(200 ,{
        //     message: "request successful",
        //     data:{
        //         deleted: deleted
        //     }
        // })

    }catch(err){
        console.log(err);
        return res.json(500,{
            message: "internal server error"
        })
    }
}