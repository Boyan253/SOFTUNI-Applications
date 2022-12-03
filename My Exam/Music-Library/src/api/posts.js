import { del, get, post, put } from "./api.js";

export async function getAllPosts() {

    return get('/data/albums?sortBy=_createdOn%20desc')


}export async function getPostById(id) {

    return get('/data/albums/' + id)

}
export async function deletePost(id) {
    return del('/data/albums/' + id)
}export async function createPost(myPosts) {
    return post('/data/albums', myPosts)
}export async function didUserDonation(albumId, userId){
    return await get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    
}
export async function getTotalDonationCount(albumId) {
    return await get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`);
}
export async function donationPost(listingId) {
    return await post(`/data/likes`, listingId);
}export async function updateMeme(id, post){
    return put('/data/albums/' + id,post)
}
