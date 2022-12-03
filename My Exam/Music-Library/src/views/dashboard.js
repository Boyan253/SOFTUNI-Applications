import { html } from "../lib.js";
import { getAllPosts } from "../api/posts.js";



const homeTemplate = (posts) =>html`<section id="dashboard">
<h2>Albums</h2>
<ul class="card-wrapper">
  <!-- Display a li with information about every post (if any)-->
  ${posts == 0? html`<h2>There are no albums added yet.</h2>` : posts.map(postCard)}
  
</ul>

<!-- Display an h2 if there are no posts -->

</section>`

const postCard = (post) => html `<li class="card">
<img src="${post.imageUrl}" alt="travis" />
<p>
  <strong>Singer/Band: </strong><span class="singer">${post.singer}</span>
</p>
<p>
  <strong>Album name: </strong><span class="album">${post.album}</span>
</p>
<p><strong>Sales:</strong><span class="sales">${post.sales}</span></p>
<a class="details-btn" href="/dashboard/${post._id}">Details</a>
</li>`
export async function dashboardView(ctx){

    const posts = await getAllPosts()
ctx.render(homeTemplate(posts))

}