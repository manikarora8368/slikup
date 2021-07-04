{
  // method to submit the new post data through ajax
  let createPost = function () {
    let newPostForm = $("#new-post-form");
    newPostForm.submit(function (e) {
      e.preventDefault();
      console.log("inside ajaaaaxxxx");
      $.ajax({
        type: "post",
        url: "/posts/create_post",
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post);
          console.log(data.data.post);
          $("#post-list-container>ul").prepend(newPost);
          deletePost($(" .delete-post-button", newPost));
          new PostComments(data.data.post._id);
          new ToggleLike($(" .toggle-like-button", newPost));
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };
  // method to create a post in DOM
  let newPostDom = function (post) {
    console.log(post._id);
    console.log(post.user);
    return $(`<li id="post-${post._id}">
                <small><a class="delete-post-button" href="/posts/destroy/${post._id}">Delete Post</a></small>
                ${post.content}
                ${post.user.name}
                <br>
                <small>
                            
                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                        0 Likes
                    </a>
                            
                </small>
                <div class="post-comments">
                        
                            <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                <input type="hidden" name="post" value="${ post._id }" >
                                <input type="submit" value="Add Comment">
                            </form>
               
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                                
                            </ul>
                        </div>
                    </div>
                </li>`);
  };

  // method to delete a post from dom
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();
      console.log('delete button clicked');
      console.log('holaaa',$(deleteLink).prop("href"));
      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          console.log('heyyyyyy', data)
          $(`#post-${data.data.post_id}`).remove();
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };
  let convertPostsToAjax = function(){
        $('#post-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            console.log('delete button is', deleteButton);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1];
            console.log('postid is',postId)
            new PostComments(postId);
        });
    }

  createPost();
  convertPostsToAjax();
}
