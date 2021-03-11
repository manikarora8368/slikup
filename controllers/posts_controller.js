const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
module.exports.createPost =async function(req , res){
    /*Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err , post){
        if(err){console.log('error in creating the post'); return;}
        return res.redirect('back');
    })*/
    /*try{
    let create = await Post.create({
        content: req.body.content,
        user: req.user._id
    });
    return res.redirect('back');
    }catch(err){
        console.log('error' , err);
        return;
    }*/

    // through ajax method..............
    try{
    let create = await Post.create({
        content: req.body.content,
        user: req.user._id
    });

    if(req.xhr){
        return res.status(200).json({
            data: {
                post: create
            },
            message: "post created successfuly"
        })
    }
    return res.redirect('back');
    }catch(err){
        console.log('error' , err);
        return;
    }

}

// module.exports.destroy= async function(req ,res){
    /*Post.findById(req.params.id , function(err , post){
        if(post){
            if(post.user == req.user.id){
                post.remove();

                Comment.deleteMany({post: req.params.id},function(err){
                    return res.redirect('back');
                })
            }else{
                return res.redirect('back');
            }
        }
    })*/
//     try{
//         let post =await Post.findById(req.params.id);
//             if(post.user == req.user.id){
//                 post.remove();
//                 await Comment.deleteMany({post: req.params.id});

//                 if(req.xhr){
//                     return res.status(200).json({
//                         data: {
//                             post_id: req.params.id
//                         },
//                         message: 'post deleted successfuly'
//                     })
//                 }
//                 return res.redirect('back');
//             }else{
//                 return res.redirect('back');
//             }
//     }catch(err){
//         console.log('error' , err);
//         return;
//     }

// }
module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            
            await Like.deleteMany({likeable: post , onModel: 'Post'});
            await Like.deleteMany({_id:{$in: post.comments}});
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}