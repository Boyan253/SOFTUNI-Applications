import { html } from "../lib.js";
import { getAllPosts } from "../api/posts.js";



const homeTemplate = (posts) =>html`<section id="home">
<img src="./images/landing.png" alt="home" />

<h2 id="landing-text"><span>Add your favourite albums</span> <strong>||</strong> <span>Discover new ones right
    here!</span></h2>
</section>`


export async function homeView(ctx){

    
ctx.render(homeTemplate())

}