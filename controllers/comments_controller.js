const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.addComment =async function(req , res){
    /*Post.findById(req.body.post , function(err , post){
        if(post){
        Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
    },function(err , comment){
        if(err){console.log('error in creating the comment'); return;}
        console.log(comment);
        post.comments.push(comment);
        post.save();
        return res.redirect('back');
    })
    }
    })*/
    try{
        let post =await Post.findById(req.body.post );
        if(post){
        let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
        });
    post.comments.push(comment);
        post.save();
        return res.redirect('back');
    };
        
    }catch(err){
        console.log('error' ,err);
        return;
    }
}
module.exports.destroy = function(req ,res){
            Comment.findById(req.params.id , function(err ,comment){
                if(comment){
                    if(comment.user == req.user.id){
                        let postId = comment.post;
                        comment.remove();
                        Post.findByIdAndUpdate(postId ,{$pull: {comments: req.params.id}},function(err,post){
                            return res.redirect('back');
                        })
                    }
                }
            })
}

