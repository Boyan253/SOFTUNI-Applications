import { createPost } from "../api/posts.js"
import { html } from "../lib.js"



const createTemplate = (onSubmit) => html`<section id="create-page" class="auth">
<form @submit = ${onSubmit}id="create">
    <div class="container">

        <h1>Create Game</h1>
        <label for="leg-title">Legendary title:</label>
        <input type="text" id="title" name="title" placeholder="Enter game title...">

        <label for="category">Category:</label>
        <input type="text" id="category" name="category" placeholder="Enter game category...">

        <label for="levels">MaxLevel:</label>
        <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

        <label for="game-img">Image:</label>
        <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

        <label for="summary">Summary:</label>
        <textarea name="summary" id="summary"></textarea>
        <input class="btn submit" type="submit" value="Create Game">
    </div>
</form>
</section>`





export function createView(ctx){
ctx.render(createTemplate(onSubmit))


async function onSubmit(event){
    event.preventDefault()
    const formData = new FormData(event.target)

const postInfo = {
    title : formData.get('title'),
    category: formData.get('category'),
    imageUrl: formData.get('imageUrl'),
    maxLevel: formData.get('maxLevel'),
    summary : formData.get('summary')
  
}
if(postInfo.title == ''|| postInfo.description == ''|| postInfo.imageUrl == ''|| postInfo.address == ''|| postInfo.phone == ''){
    return
}

await createPost(postInfo)
event.target.reset()
ctx.page.redirect('/')
}

}