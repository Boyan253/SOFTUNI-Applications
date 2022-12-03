import { getPostById, updateMeme } from '../api/posts.js';
import { html } from '../lib.js'



const EditTemplate = (onSubmit, post) => html`<section id="edit">
<div class="form">
  <h2>Edit Album</h2>
  <form @submit=${onSubmit} class="edit-form">
    <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value='${post.singer}' />
    <input type="text" name="album" id="album-album" placeholder="Album" .value=${post.album} />
    <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value=${post.imageUrl} />
    <input type="text" name="release" id="album-release" placeholder="Release date" .value=${post.release} />
    <input type="text" name="label" id="album-label" placeholder="Label" .value=${post.label} />
    <input type="text" name="sales" id="album-sales" placeholder="Sales" .value=${post.sales} />

    <button type="submit">post</button>
  </form>
</div>
</section>
`




export async function EditView(ctx) {
   
    const post = await getPostById(ctx.params.id)
    
    ctx.render(EditTemplate(onSubmit,post))


    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)

        const postInfo = {
            singer:formData.get('singer').trim(),
            album:formData.get('album').trim(),
            imageUrl:formData.get('imageUrl').trim(),
            release:formData.get('release').trim(),
            label:formData.get('label').trim(),
            sales:formData.get('sales').trim()

        }
        if (postInfo.singer == '' || postInfo.album == '' || postInfo.imageUrl == '' || postInfo.release == '' || postInfo.label == '' || postInfo.sales == '') {
            return
        }

        await updateMeme(ctx.params.id, postInfo)
        event.target.reset()
        ctx.page.redirect('/dashboard/' + ctx.params.id)
    }
}
