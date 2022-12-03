import { deletePost, didUserDonation, donationPost, getPostById, getTotalDonationCount } from "../api/posts.js";
import { html, render } from "../lib.js";
import { getUserData } from "../util.js";


const detailsTemplate = (post, isOwner, onDelete, isLoggedIn, totalDonationCount, onClickDonation, didUserDonate) => html`  <section id="details">
<div id="details-wrapper">
  <p id="details-title">${post.title}</p>
  <div id="img-wrapper">
    <img src="${post.imageUrl}" alt="example1" />
  </div>
  <div id="info-wrapper">
    <p><strong>Band:</strong><span id="details-singer">${post.singer}</span></p>
    <p>
      <strong>Album name:</strong><span id="details-album">${post.album}</span>
    </p>
    <p><strong>Release date:</strong><span id="details-release">${post.release}</span></p>
    <p><strong>Label:</strong><span id="details-label">${post.label}</span></p>
    <p><strong>Sales:</strong><span id="details-sales">${post.sales}</span></p>
  </div>
  <div id="likes">Likes: <span id="likes-count">${totalDonationCount}</span></div>
${isOwner? html` <div id="action-buttons">

<a href="/edit/${post._id}" id="edit-btn">Edit</a>
<a href="javascript:void(0)" @click = ${onDelete}id="delete-btn">Delete</a>
</div>` : ''} 

  <!--Edit and Delete are only for creator-->
  ${(() => {
    if (didUserDonate == 0) {
        if (isLoggedIn && !isOwner) {        
            return html`<div id="action-buttons"><a @click = ${onClickDonation}href="javascript:void(0)" id="like-btn">Like</a></div>`
        }
    }
})()}
</div>
</section>`

export async function detailsView(ctx){
    const post = await getPostById(ctx.params.id)
    const userData = getUserData()
    const isOwner = userData?.id == post._ownerId
    

    let userId;
let totalDonationCount;
let didUserDonate;
let albumId = post._id
if (userData != null) {
    userId = userData.id
    didUserDonate = await didUserDonation(albumId, userId);
    
}


const isLoggedIn = userData !== undefined;

totalDonationCount =  await getTotalDonationCount(albumId);
    ctx.render(detailsTemplate(post, isOwner, onDelete, isLoggedIn, totalDonationCount, onClickDonation, didUserDonate));

    async function onClickDonation() {
    
        const donation = {
            
            albumId
        }
         donationPost(donation);
    
        totalDonationCount =  await getTotalDonationCount(albumId);
        didUserDonate = await didUserDonation(albumId, userId);
        ctx.render(detailsTemplate(post, isOwner, onDelete, isLoggedIn, totalDonationCount, onClickDonation, didUserDonate));
    }
    async function onDelete(){
    const choice = confirm('Are you sure, you want to delete this meme?')
    
    if(choice){
        await deletePost(ctx.params.id)
        ctx.page.redirect('/')
    }
    
    }
    


}