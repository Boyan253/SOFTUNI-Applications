import { getPostById, getPostByUser } from "../api/posts.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const myPageTemplate = (posts) =>html`<section id="my-books-page" class="my-books">
<h1>My Books</h1>
<!-- Display ul: with list-items for every user's books (if any) -->
<ul class="my-books-list">
    
   ${posts.length == 0? html`<p class="no-books">No books in database!</p>`:posts.map(postCard)}
</ul>

<!-- Display paragraph: If the user doesn't have his own books  -->

</section>`;

const postCard = (post) =>html`
<li class="otherBooks">
        <h3>${post.title}</h3>
        <p>Type: ${post.type}</p>
        <p class="img"><img src="${post.imageUrl}"></p>
        <a class="button" href="/dashboard/${post._id}">Details</a>
    </li>
`


export async function myPageView(ctx){
const userData = getUserData()
const post = await getPostByUser(userData.id)
    
ctx.render(myPageTemplate(post))
}