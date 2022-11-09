import { deletePost, getPostById } from "../api/posts.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";
const finder = false
let count = 0
function isit(finder){
    
if(sessionStorage.length == 0 ){
   finder = true   
 
}
return finder  
}
const detailsTemplate = (post, isOwner, onDelete, onDonate) =>

html`<section id="details-page">
<h1 class="title">Post Details</h1>

<div id="container">
    <div id="details">
        <div class="image-wrapper">
            <img src="${post.imageUrl}" alt="Material Image" class="post-image">
        </div>
        <div class="info">
            <h2 class="title post-title">${post.title}</h2>
            <p class="post-description">Description: ${post.description}</p>
            <p class="post-address">Address: ${post.address}</p>
            <p class="post-number">Phone number: ${post.phone}</p>
            <p class="donate-Item">Donate Materials: 0</p>
${isit(finder) == true ? '' :  isOwner ? html`
<div class="btns">
<a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
<a @click = ${onDelete}href="#" class="delete-btn btn">Delete</a>
</div>`: 
html`<div class="btns">
<a @click = ${onDonate}href="#" class="donate-btn btn">Donate</a>
</div>`}
          
           

        </div>
    </div>
</div>
</section>`


export async function detailsView(ctx){
const post = await getPostById(ctx.params.id)
const userData = getUserData()
const isOwner = userData?.id == post._ownerId
   console.log(ctx.params);
ctx.render(detailsTemplate(post, isOwner, onDelete, onDonate))

async function onDelete(){
const choice = confirm('Are you sure, you want to delete this meme?')

if(choice){
    await deletePost(ctx.params.id)
    ctx.page.redirect('/')
}

}
function onDonate(){
count++
document.querySelector('#details-page .donate-btn.btn').remove()
document.querySelector('#details-page .donate-Item').textContent = `Donate Materials: ${count}`
return count
}
}

