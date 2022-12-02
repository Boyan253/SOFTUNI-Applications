import { getPostById, updateMeme } from "../api/posts.js";
import { html } from "../lib.js";




const editTemplate = (pet, onSubmit) => html`<section id="edit-page" class="edit">
<form @submit = ${onSubmit}id="edit-form" action="#" method="">
    <fieldset>
        <legend>Edit my Book</legend>
        <p class="field">
            <label for="title">Title</label>
            <span class="input">
                <input type="text" name="title" id="title" value="${pet.title}">
            </span>
        </p>
        <p class="field">
            <label for="description">Description</label>
            <span class="input">
                <textarea name="description"
                .value =${pet.description}
                    id="description"></textarea>
            </span>
        </p>
        <p class="field">
            <label for="image">Image</label>
            <span class="input">
                <input type="text" name="imageUrl" id="image" value="${pet.imageUrl}">
            </span>
        </p>
        <p class="field">
            <label for="type">Type</label>
            <span class="input">
                <select id="type" name="type" value="Fiction">
                    <option value="Fiction" selected>Fiction</option>
                    <option value="Romance">Romance</option>
                    <option value="Mistery">Mistery</option>
                    <option value="Classic">Clasic</option>
                    <option value="Other">Other</option>
                </select>
            </span>
        </p>
        <input class="button submit" type="submit" value="Save">
    </fieldset>
</form>
</section>`









export async function editView(ctx){
    const petId = ctx.params.id;

    const pet = await getPostById(petId);
    ctx.render(editTemplate(pet, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const editPet = {
            title: formData.get('title').trim(),
            description: formData.get('description').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            type: formData.get('type').trim()
            
        }

        if (Object.values(editPet).some(x => !x)) {
            return alert('All fields are required!');
        }

        await updateMeme(petId, editPet);
        event.target.reset();
        ctx.page.redirect(`/dashboard/${petId}`);
    }


}