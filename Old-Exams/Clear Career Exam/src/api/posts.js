import {del, get, post, put} from './api.js'

export async function getAllPosts(){

return get('/data/offers?sortBy=_createdOn%20desc')


}


export async function createPost(myPosts) {
    return post('/data/offers', myPosts)
}

export async function getPostById(id) {

    return get('/data/offers/' + id)

}



export async function updatePost(id, post){
    return put('/data/offers/' + id,post)
}

export async function deletePost(id) {
    return del('/data/offers/' + id)
}export async function didUserDonation(offerId, userId){
    return await get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    
}
export async function getTotalDonationCount(offerId) {
    return await get(`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`);
}
export async function donationPost(listingId) {
    return await post(`/data/applications`, listingId);
}
