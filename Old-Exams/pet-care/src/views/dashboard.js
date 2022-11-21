
import { getAllPosts } from "../api/posts.js";
import { html,page,render} from "../lib.js";

const dashboardTemplate = (posts) => html`<section id="dashboard">
<h2 class="dashboard-title">Services for every animal</h2>
<div class="animals-dashboard">
    
${posts.length == 0 ? `<p class="no-pets">No pets in dashboard</p>`: posts.map(postCard)}
   
    <!--If there is no pets in dashboard-->
    <div>
       
    </div>
</div>
</section>`



const postCard = (post) => html`<div class="animals-board">
<article class="service-img">
    <img class="animal-image-cover" src="${post.image}">
</article>
<h2 class="name">${post.name}</h2>
<h3 class="breed">${post.breed}</h3>
<div class="action">
    <a class="btn" href="/dashboard/${post._id}">Details</a>
</div>
</div>`




export async function dashboardView(ctx){

const post = await getAllPosts()
ctx.render(dashboardTemplate(post))

}