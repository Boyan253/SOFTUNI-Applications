

import { deletePost, getComments, getPostById, postComments } from "../api/posts.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";


const detailsTemplate = (post,isOwner,isLoggedIn,userData,onDelete, onClickCommenting,getComment, commenting) => html`<section id="game-details">
<h1>Game Details</h1>
<div class="info-section">

    <div class="game-header">
        <img class="game-img" src="${post.imageUrl}" />
        <h1>${post.title}</h1>
        <span class="levels">MaxLevel: ${post.maxLevel}</span>
        <p class="type">${post.category}</p>
    </div>

    <p class="text">
        ${post.summary}
    </p>

    <!-- Bonus ( for Guests and Users ) -->
   

    <!-- Edit/Delete buttons ( Only for creator of this game )  -->
    
    ${isOwner ? html`<div class="buttons">
        <a href="/edit/${post._id}" class="button">Edit</a>
        <a href="javascript:void(0)" @click=${onDelete}class="button">Delete</a></div>`: ''}
        
        ${getComment.length == 0? html`<p class="no-comment">No comments.</p>` :getComment.map(commentCard)}
    
</div>
${isOwner == false && userData != undefined ? html`<article class="create-comment">
<label>Add new comment:</label>
<form @submit = ${onClickCommenting} class="form">
    <textarea name="comment" placeholder="Comment......"></textarea>
    <input class="btn submit" type="submit" value="Add Comment">
</form>
</article>` : ''}



</section>`


const commentCard = (etComment) => html`<div class="details-comments"><h2>Comments:</h2>
<ul>
    <!-- list all comments for current game (If any) -->
    <li class="comment">
        <p>Content: ${etComment.comment}</p>
    </li>
</ul>
<!-- Display paragraph: If there are no games in the database -->

</div>` 
/*
*/


/**/




export async function detailsView(ctx){
    const post = await getPostById(ctx.params.id)
    const userData = getUserData()
    const gameId = ctx.params.id
    const isOwner = userData?.id == post._ownerId
    const isLoggedIn = userData !== undefined;
    let getComment = await getComments(gameId)
    
    ctx.render(detailsTemplate(post,isOwner,isLoggedIn,userData,onDelete, onClickCommenting, getComment))

async function onClickCommenting(e){
 e.preventDefault()
    const formData = new FormData(e.target)

const comment = formData.get('comment')



    const comments = {
        gameId,
        comment

    }
   
    if(comment == ''){
        return
    }
    await postComments(comments)
   
     getComment = await getComments(gameId)
    ctx.render(detailsTemplate(post,isOwner,isLoggedIn,userData,onDelete, onClickCommenting, getComment))
    
}
   
async function onDelete(){
    const choice = confirm('Are you sure, you want to delete this meme?')
    
    if(choice){
        await deletePost(ctx.params.id)
        ctx.page.redirect('/')
    }
    
    }
    
    
    
    
    
    
}
