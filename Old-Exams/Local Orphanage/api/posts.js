import { del, get, post, put } from './api.js'



export async function getAllPosts() {

    return get('/data/posts?sortBy=_createdOn%20desc')


}
export async function getPostById(id) {

    return get('/data/posts/' + id)

}
export async function getPostsByUser(userId){

return get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)



}


export async function updateMeme(id, post){
    return put('/data/posts/' + id,post)
}

export async function createPost(myPosts) {
    return post('/data/posts', myPosts)
}

export async function deletePost(id) {
    return del('/data/posts/' + id)
}
export async function didUserDonation(postId, userId){
    return await get(`/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    
}
export async function getTotalDonationCount(postId) {
    return await get(`/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`);
}
export async function donationPost(listingId) {
    return await post(`/data/donations`, listingId);
}
