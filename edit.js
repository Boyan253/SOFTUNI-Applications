import { getPostById, updateMeme } from '../api/posts.js';
import {html} from '../lib.js'



const EditTemplate = (post, onSubmit) => html`<section id="edit-page" class="auth">
<form @submit = ${onSubmit} id="edit">
    <h1 class="title">Edit Post</h1>

    <article class="input-group">
        <label for="title">Post Title</label>
        <input type="title" name="title" id="title" value="${post.title}">
    </article>

    <article class="input-group">
        <label for="description">Description of the needs </label>
        <input type="text" name="description" id="description" value="${post.description}">
    </article>

    <article class="input-group">
        <label for="imageUrl"> Needed materials image </label>
        <input type="text" name="imageUrl" id="imageUrl" value="${post.imageUrl}">
    </article>

    <article class="input-group">
        <label for="address">Address of the orphanage</label>
        <input type="text" name="address" id="address" value="${post.address}">
    </article>

    <article class="input-group">
        <label for="phone">Phone number of orphanage employee</label>
        <input type="text" name="phone" id="phone" value="${post.phone}">
    </article>

    <input type="submit" class="btn submit" value="Edit Post">
</form>
</section>
`




export async function EditView(ctx){
    const post = await getPostById(ctx.params.id)
    console.log(ctx.params);
ctx.render(EditTemplate(post, onSubmit))


async function onSubmit(event){
    event.preventDefault()
    const formData = new FormData(event.target)

const postInfo = {
    title : formData.get('title'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
    address: formData.get('address'),
    phone : formData.get('phone')
  
}
if(postInfo.title == ''|| postInfo.description == ''|| postInfo.imageUrl == ''|| postInfo.address == ''|| postInfo.phone == ''){
    return alert('all fields are required!')
}

await updateMeme(ctx.params.id, postInfo)
event.target.reset()
ctx.page.redirect('/posts/' + ctx.params.id)
}
}
