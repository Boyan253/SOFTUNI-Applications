import { getPostById, updatePost } from "../api/posts.js";
import { html,render } from "../lib.js";

const editTemplate = (onClick,post) => html`<section id="edit">
<div class="form">
  <h2>Edit Offer</h2>
  <form @submit=${onClick} class="edit-form">
    <input
      type="text"
      name="title"
      id="job-title"
      placeholder="Title"
      .value=${post.title}
    />
    <input
      type="text"
      name="imageUrl"
      id="job-logo"
      placeholder="Company logo url"
      .value=${post.imageUrl}
    />
    <input
      type="text"
      name="category"
      id="job-category"
      placeholder="Category"
      .value=${post.category}
    />
    <textarea
      id="job-description"
      name="description"
      placeholder="Description"
      .value=${post.description}
      rows="4"
      cols="50"
    ></textarea>
    <textarea
      id="job-requirements"
      name="requirements"
      placeholder="Requirements"
      .value=${post.requirements}
      rows="4"
      cols="50"
    ></textarea>
    <input
      type="text"
      name="salary"
      id="job-salary"
      placeholder="Salary"
      .value=${post.salary}
    />
    <button type="submit">post</button>
  </form>
</div>
</section>`








export async function editView(ctx){

  const post = await getPostById(ctx.params.id)
ctx.render(editTemplate(onClick,post))

async function onClick(e){
  e.preventDefault()

const formData = new FormData(e.target)
const postInfo = {
title: formData.get('title'),
imageUrl: formData.get('imageUrl'),
category: formData.get('category'),
description: formData.get('description'),
requirements: formData.get('requirements'),
salary: formData.get('salary')




}
if(postInfo.title == ''|| postInfo.description == ''|| postInfo.imageUrl == ''|| postInfo.requirements == ''|| postInfo.salary == ''|| postInfo.category == ''){
  return alert('all fields are required!')
}

await updatePost(ctx.params.id, postInfo)
e.target.reset()
ctx.page.redirect(`/dashboard/${ctx.params.id}`)
}

}