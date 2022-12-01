import { getAllPosts, getRecentPosts } from "../api/posts.js";
import { html } from "../lib.js";

const homeTemplate = (posts) => html`<section id="welcome-world">

<div class="welcome-message">
    <h2>ALL new games are</h2>
    <h3>Only in GamesPlay</h3>
</div>
<img src="./images/four_slider_img01.png" alt="hero">

<div id="home-page">
    <h1>Latest Games</h1>

    <!-- Display div: with information about every game (if any) -->
   ${posts.length == 0 ? html`<p class="no-articles">No games yet</p>`: posts.map(catalogCard)}
    
    <!-- Display paragraph: If there is no games  -->
    
</div>
</section>`


const catalogCard = (post) => html`<div class="game">
<div class="image-wrap">
    <img src="${post.imageUrl}">
</div>
<h3>${post.title}</h3>
<div class="rating">
    <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
</div>
<div class="data-buttons">
    <a href="/dashboard/${post._id}" class="btn details-btn">Details</a>
</div>
</div>
`




export async function homeView(ctx){
    const post = await getRecentPosts()
    ctx.render(homeTemplate(post))
}