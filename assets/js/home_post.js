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
                <small><a class="delete-post-button" href="/posts/destroy/${post._id}>">Delete Post</a></small>
                ${post.content}
                ${post.user.name}
                <br>
                <small>
                            
                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                        0 Likes
                    </a>
                            
                </small>
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
                </li>`);
  };

  // method to delete a post from dom
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();
      console.log('delete button clicked');
      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          console.log('heyyyyyy', data)
          $(`#post-${data.post_id}`).remove();
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };

  createPost();
}
