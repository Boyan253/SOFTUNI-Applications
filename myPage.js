import { html } from "../lib.js";
import { getAllPosts, getPostsByUser } from "../api/posts.js";
import { getUserData } from "../util.js";


const myPageTemplate = (posts) =>html`<section id="my-posts-page">
<h1 class="title">My Posts</h1>
<div class="my-posts">
${posts.length == 0 ? html`<h1 class="title no-posts-title">You have no posts yet!</h1>`:
posts.map(postCard)}
<!-- Display a div with information about every post (if any)-->


<!-- Display an h1 if there are no posts -->
</div>
</section>`;

const postCard = (post) =>html`
<div class="post">
    <h2 class="post-title">${post.title}</h2>
    <img class="post-image" src="${post.imageUrl}" alt="Material Image">
    <div class="btn-wrapper">
        <a href="posts/${post._id}" class="details-btn btn">Details</a>
    
</div>
`


export async function myPageView(ctx){
const userData = getUserData()
const post = await getPostsByUser(userData.id)
    
ctx.render(myPageTemplate(post))
}
