import { deletePetById, didUserDonation, donationPost, getPostById, getTotalDonationCount } from "../api/posts.js";
import { html,page } from "../lib.js";
import { getUserData } from "../util.js";



const detailsTemplate = (post, isOwner, onDelete, isLoggedIn, totalDonationCount, onClickDonation, didUserDonate) => html`<section id="details-page" class="details">
<div class="book-information">
    <h3>${post.title}</h3>
    <p class="type">Type: ${post.type}</p>
    <p class="img"><img src="${post.imageUrl}"></p>
    <div class="actions">
        <!-- Edit/Delete buttons ( Only for creator of this book )  -->
        
       

        <!-- ( for Guests and Users )  -->
        
            ${isOwner ? html ` <div class="actions">
            <!-- Only for registered user and creator of the pets-->
            <a class="button" href="/edit/${post._id}">Edit</a>
        <a class="button" @click = ${onDelete}href="#">Delete</a>

            </div>` : ''}
        ${(() => {
            if (didUserDonate == 0) {
                if (isLoggedIn && !isOwner) {        
                    return html`
                    <a @click = ${onClickDonation} class="button" href="javascript:void(0)">Like</a>
                    `
                    
                }
            }
        })()}
        <div class="likes">
        <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${totalDonationCount}</span></div>
        <!-- Bonus -->
    </div>
</div>
<div class="book-description">
    <h3>Description:</h3>
    <p>${post.description}</p>
</div>
</section>`










export async function detailsView(ctx){
    const post = await getPostById(ctx.params.id)
    let bookId = ctx.params.id;
    const pet = await getPostById(bookId);
    const user = ctx.user;

    const userData = getUserData()
const isOwner = userData?.id == post._ownerId




let userId;
let totalDonationCount;
let didUserDonate;

if (userData != null) {
    userId = userData.id
    didUserDonate = await didUserDonation(bookId, userId);
    
}


const isLoggedIn = userData !== undefined;

totalDonationCount = await getTotalDonationCount(bookId);
ctx.render(detailsTemplate(post, isOwner, onDelete, isLoggedIn, totalDonationCount, onClickDonation, didUserDonate));

async function onClickDonation() {

    const donation = {
        bookId
    }
    await donationPost(donation);

     totalDonationCount =  await getTotalDonationCount(bookId)
     didUserDonate = await didUserDonation(bookId, userId)
     didUserDonate++
     
    ctx.render(detailsTemplate(post, isOwner, onDelete, isLoggedIn, totalDonationCount, onClickDonation, didUserDonate));
}
async function onDelete(){
    const choice = confirm('Are you sure, you want to delete this meme?')
    
    if(choice){
        await deletePetById(ctx.params.id)
        ctx.page.redirect('/dashboard')
    }
    
    }
}
