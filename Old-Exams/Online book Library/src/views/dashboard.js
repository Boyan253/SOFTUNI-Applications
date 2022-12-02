import { getAllPosts } from "../api/posts.js";
import { html } from "../lib.js";

const dashboardTemplate = (posts) => html` <section id="dashboard-page" class="dashboard">
<h1>Dashboard</h1>
<!-- Display ul: with list-items for All books (If any) -->
<ul class="other-books-list">
    
${posts.length == 0? html`<p class="no-books">No books in database!</p>` : posts.map(postCard)}


</ul>
<!-- Display paragraph: If there are no books in the database -->

</section>
`
const postCard = (post) => html`<li class="otherBooks">
<h3>${post.title}</h3>
<p>Type: ${post.type}</p>
<p class="img"><img src="${post.imageUrl}"></p>
<a class="button" href="/dashboard/${post._id}">Details</a>
</li>`







export async function dashboardView(ctx){
    const post = await getAllPosts()
    ctx.render(dashboardTemplate(post))
}
