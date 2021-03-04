{
    // method to submit the new post data through ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url : '/posts/create_post',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    console.log(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    let a = $(' .delete-post-button', newPost);
                    console.log(a.prop('href'));
                    console.log(a);
                    deletePost($(' .delete-post-button', newPost));
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
    // method to create a post in DOM
    let newPostDom = function(post){
        console.log(post._id);
        console.log(post.user);
        return $(`<li id="post-${post._id}">
                <small><a class="delete-post-button" href="/posts/destroy/${post._id}>">Delete Post</a></small>
                ${post.content}
                ${post.user.name}
                <div class="post-comment">
                <form action="/comments/add_comment" method="POST">
                    <input type="text" name="content" placeholder="Add comment here.." required>
                    <input type="hidden" name="post" value="${post._id}">
                    <button type="submit">Add comment</button>
                </form>
                <div id="post-comments-list">
                    <ul id="post-comments-${post._id}">
                    </ul>
                    </div>
                </div>
                </li>`)
    }


    // method to delete a post from dom
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function(err){
                    console.log(err.responseText);
                }
            })
        })
    }

    createPost();
}