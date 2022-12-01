import { getAllPosts } from "../api/posts.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";



const catalogTemplate = (post) => html`<section id="catalog-page">
<h1>All Games</h1>
<!-- Display div: with information about every game (if any) -->
${post.length == 0? html`<h3 class="no-articles">No articles yet</h3>` : post.map(catalogCard)}



<!-- Display paragraph: If there is no games  -->

</section>`




const catalogCard = (posts) => html`<div class="allGames">
<div class="allGames-info">
    <img src="${posts.imageUrl}">
    <h6>${posts.category}</h6>
    <h2>${posts.title}</h2>
    <a href="/dashboard/${posts._id}" class="details-button">Details</a>
</div>
</div>
`



export async function catalogView(ctx){
    const posts = await getAllPosts()
   
     ctx.render(catalogTemplate(posts))
     
    
}