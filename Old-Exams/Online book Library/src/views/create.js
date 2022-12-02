import { createPost } from "../api/posts.js";
import { html } from "../lib.js";



const createTemplate = (onSubmit) => html`<section id="create-page" class="create">
<form @submit = ${onSubmit} id="create-form" action="" method="">
    <fieldset>
        <legend>Add new Book</legend>
        <p class="field">
            <label for="title">Title</label>
            <span class="input">
                <input type="text" name="title" id="title" placeholder="Title">
            </span>
        </p>
        <p class="field">
            <label for="description">Description</label>
            <span class="input">
                <textarea name="description" id="description" placeholder="Description"></textarea>
            </span>
        </p>
        <p class="field">
            <label for="image">Image</label>
            <span class="input">
                <input type="text" name="imageUrl" id="image" placeholder="Image">
            </span>
        </p>
        <p class="field">
            <label for="type">Type</label>
            <span class="input">
                <select id="type" name="type">
                    <option value="Fiction">Fiction</option>
                    <option value="Romance">Romance</option>
                    <option value="Mistery">Mistery</option>
                    <option value="Classic">Clasic</option>
                    <option value="Other">Other</option>
                </select>
            </span>
        </p>
        <input class="button submit" type="submit" value="Add Book">
    </fieldset>
</form>
</section>`







export async function createView(ctx){
    ctx.render(createTemplate(onSubmit))

    
async function onSubmit(event){
    event.preventDefault()
    const formData = new FormData(event.target)

const postInfo = {
    title : formData.get('title'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
    type: formData.get('type')
  
}
if(postInfo.title == ''|| postInfo.description == ''|| postInfo.imageUrl == ''|| postInfo.address == ''|| postInfo.phone == ''){
    return
}

await createPost(postInfo)
event.target.reset()
ctx.page.redirect('/dashboard')
}
}



