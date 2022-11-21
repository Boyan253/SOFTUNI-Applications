import { donationPost, getPostById, getTotalDonationCount,didUserDonation, deletePetById } from "../api/posts.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";




const detailsTemplate = (post, isOwner, onDelete, isLoggedIn, totalDonationCount, onClickDonation, didUserDonate) => html`<section id="detailsPage">
<div class="details">
    <div class="animalPic">
        <img src="${post.image}">
    </div>
    <div>
        <div class="animalInfo">
            <h1>Name: ${post.name}</h1>
            <h3>Breed: ${post.breed}</h3>
            <h4>Age: ${post.age}</h4>
            <h4>Weight: ${post.weight}</h4>
            <h4 class="donation">Donation: ${totalDonationCount*100}$</h4>
        </div>
        <!-- if there is no registered user, do not display div-->
        ${isOwner ? html ` <div class="actionBtn">
            <!-- Only for registered user and creator of the pets-->
            <a href="/edit/${post._id}" class="edit">Edit</a>
            <a href="#" @click = ${onDelete}class="remove">Delete</a>
            </div>` : ''}
        ${(() => {
            if (didUserDonate == 0) {
                if (isLoggedIn && !isOwner) {        
                    return html`<div class="actionBtn">
           
                    <a @click = ${onClickDonation}href="#" class="donate">Donate</a>
                </div>`
                }
            }
        })()}
    </div>
</div>
</section>`









export async function detailsView(ctx){
const post = await getPostById(ctx.params.id)



const userData = getUserData()
const isOwner = userData?.id == post._ownerId


let userId;
let totalDonationCount;
let didUserDonate;
let petId = post._id
if (userData != null) {
    userId = userData.id
    didUserDonate = await didUserDonation(petId, userId);
    
}


const isLoggedIn = userData !== undefined;

totalDonationCount = await getTotalDonationCount(petId);
ctx.render(detailsTemplate(post, isOwner, onDelete, isLoggedIn, totalDonationCount, onClickDonation, didUserDonate));

async function onClickDonation() {

    const donation = {
        petId
    }
    await donationPost(donation);

    totalDonationCount = await getTotalDonationCount(petId);
    didUserDonate = await didUserDonation(petId, userId);
    ctx.render(detailsTemplate(post, isOwner, onDelete, isLoggedIn, totalDonationCount, onClickDonation, didUserDonate));
}







async function onDelete(){
const choice = confirm('Are you sure, you want to delete this meme?')

if(choice){
    await deletePetById(ctx.params.id)
    ctx.page.redirect('/')
}

}

}