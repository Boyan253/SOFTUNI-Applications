
import { getAllPosts } from "../api/posts.js";
import { html, render } from "../lib.js";

const dashboardTemplate = (posts) => html`
<section id="dashboard">
    <h2>Job Offers</h2>

    <!-- Display a div with information about every post (if any)-->
   ${posts.length == 0 ? html `<h2>No offers yet.</h2>`:
  posts.map(postCard)}
    

    <!-- Display an h2 if there are no posts -->
   
  </section>
`

const postCard = (post) =>html
`<div class="offer">
<img src="${post.imageUrl}" alt="example1">
<p>
  <strong>Title: </strong><span class="title">${post.title}</span>
</p>
<p><strong>Salary:</strong><span class="salary">${post.salary}</span></p>
<a class="details-btn" href="/dashboard/${post._id}">Details</a>
</div>`



export async function dashboardView(ctx){
const posts = await getAllPosts()
ctx.render(dashboardTemplate(posts))

}

