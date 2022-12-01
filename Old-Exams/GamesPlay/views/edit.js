import { getPostById, updateMeme } from "../api/posts.js";
import { html } from "../lib.js";



const editTemplate = (post, onSubmit) => html`<section id="edit-page" class="auth">
<form @submit = ${onSubmit}id="edit">
    <div class="container">

        <h1>Edit Game</h1>
        <label for="leg-title">Legendary title:</label>
        <input type="text" id="title" name="title" value="${post.title}">

        <label for="category">Category:</label>
        <input type="text" id="category" name="category" value="${post.category}">

        <label for="levels">MaxLevel:</label>
        <input type="number" id="maxLevel" name="maxLevel" min="1" value="${post.maxLevel}">

        <label for="game-img">Image:</label>
        <input type="text" id="imageUrl" name="imageUrl" value="${post.imageUrl}">

        <label for="summary">Summary:</label>
        <textarea name="summary" id="summary" .value = ${post.summary}></textarea>
        <input class="btn submit" type="submit" value="Edit Game">

    </div>
</form>
</section>`





export async function editView(ctx){

    const post = await getPostById(ctx.params.id)

ctx.render(editTemplate(post, onSubmit))


async function onSubmit(event){
    event.preventDefault()
    const formData = new FormData(event.target)

const postInfo = {
    title : formData.get('title'),
    category: formData.get('category'),
    maxLevel: formData.get('maxLevel'),
    imageUrl: formData.get('imageUrl'),
    summary: formData.get('summary')
    
}
if(postInfo.title == ''|| postInfo.category == ''|| postInfo.imageUrl == ''|| postInfo.maxLevel == ''|| postInfo.summary == ''){
    return alert('all fields are required!')
}

await updateMeme(ctx.params.id, postInfo)
event.target.reset()
ctx.page.redirect('/dashboard/' + ctx.params.id)
}

}