{let e=function(){let e=$("#new-post-form");e.submit((function(n){n.preventDefault(),consol.log("inside ajaaaaxxxx"),$.ajax({type:"post",url:"/posts/create_post",data:e.serialize(),success:function(e){let n=t(e.data.post);console.log(e.data.post),$("#post-list-container>ul").prepend(n);let s=$(" .delete-post-button",n);console.log(s.prop("href")),console.log(s),o($(" .delete-post-button",n)),new ToggleLike($(" .toggle-like-button",n))},error:function(e){console.log(e.responseText)}})}))},t=function(e){return console.log(e._id),console.log(e.user),$(`<li id="post-${e._id}">\n      <%if(locals.user){%>\n                <small><a class="delete-post-button" href="/posts/destroy/${e._id}>">Delete Post</a></small>\n                ${e.content}\n                ${e.user.name}\n                <br>\n                <small>\n      <%}%>\n                            \n                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${e._id}&type=Post">\n                        0 Likes\n                    </a>\n                            \n                </small>\n                <div class="post-comment">\n                <form action="/comments/add_comment" method="POST">\n                    <input type="text" name="content" placeholder="Add comment here.." required>\n                    <input type="hidden" name="post" value="${e._id}">\n                    <button type="submit">Add comment</button>\n                </form>\n                <div id="post-comments-list">\n                    <ul id="post-comments-${e._id}">\n                    </ul>\n                    </div>\n                </div>\n                </li>`)},o=function(e){$(e).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){$("#post-"+e.data.post_id).remove()},error:function(e){console.log(e.responseText)}})}))};e()}