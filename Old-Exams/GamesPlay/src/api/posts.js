import { del, get, post, put } from "./api.js";

export async function getAllPosts() {

    return get('/data/games?sortBy=_createdOn%20desc&distinct=category')


}export async function createPost(myPosts) {
    return post('/data/games', myPosts)
}export async function getPostById(id) {

    return get('/data/games/' + id)

}export async function updateMeme(id, post){
    return put('/data/games/' + id,post)
}
export async function deletePost(id) {
    return del('/data/games/' + id)
}