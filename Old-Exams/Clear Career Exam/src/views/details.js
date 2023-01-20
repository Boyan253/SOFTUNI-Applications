
import { deletePost, didUserDonation, donationPost, getPostById, getTotalDonationCount } from "../api/posts.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (post, isOwner, onDelete, isLoggedIn, totalDonationCount, onClickDonation, didUserDonate) => html`<section id="details">
<div id="details-wrapper">
  <img id="details-img" src="${post.imageUrl}" alt="example1" />
  <p id="details-title">${post.title}</p>
  <p id="details-category">
    Category: <span id="categories">${post.category}</span>
  </p>
  <p id="details-salary">
    Salary: <span id="salary-number">${post.salary}</span>
  </p>
  <div id="info-wrapper">
    <div id="details-description">
      <h4>Description</h4>
      <span
        >${post.description}</span
      >
    </div>
    <div id="details-requirements">
      <h4>Requirements</h4>
      <span
        >${post.requirements}</span
      >
    </div>
  </div>
  <p>Applications: <strong id="applications">${totalDonationCount}</strong></p>

  ${isOwner ? html `<div id="action-buttons">
  <a href="/edit/${post._id}" id="edit-btn">Edit</a>
  <a href="" @click = ${onDelete}id="delete-btn">Delete</a>
  </div>` : ''}
${(() => {
    if (didUserDonate == 0) {
        if (isLoggedIn && !isOwner) {        
            return html`<div id="action-buttons"><a @click = ${onClickDonation} href="" id="apply-btn">Apply</a></div>`
        }
    }
})()}
    <!--Bonus - Only for logged-in users ( not authors )-->
    
  
</div>
</section>`










export async function detailsView(ctx){
  const post = await getPostById(ctx.params.id)
  const userData = getUserData()
  const isOwner = userData?.id == post._ownerId
     
  
  
  let userId;
  let totalDonationCount;
  let didUserDonate;
  let offerId = post._id
  if (userData != null) {
      userId = userData.id
      didUserDonate = await didUserDonation(offerId, userId);
      
  }
  
  
  const isLoggedIn = userData !== undefined;
  
  totalDonationCount = await getTotalDonationCount(offerId);
  ctx.render(detailsTemplate(post, isOwner, onDelete, isLoggedIn, totalDonationCount, onClickDonation, didUserDonate));
  
  async function onClickDonation() {
  
      const donation = {
          
           offerId
      }
      await donationPost(donation);
  
      totalDonationCount = await getTotalDonationCount(offerId);
      didUserDonate = await didUserDonation(offerId, userId);
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