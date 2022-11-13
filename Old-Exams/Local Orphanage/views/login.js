
import { login } from "../api/users.js"
import { html,render } from "../lib.js"


const loginTemplate = (onSubmit) => html `<section id="login-page" class="auth">
<form @submit =${onSubmit} id="login">
    <h1 class="title">Login</h1>

    <article class="input-group">
        <label for="login-email">Email: </label>
        <input type="email" id="login-email" name="email">
    </article>

    <article class="input-group">
        <label for="password">Password: </label>
        <input type="password" id="password" name="password">
    </article>

    <input type="submit" class="btn submit-btn" value="Log In">
</form>
</section>`

export function loginView(ctx){
ctx.render(loginTemplate(onSubmit))

async function onSubmit(event){

event.preventDefault()
const formData = new FormData(event.target)

const email = formData.get('email')
const password = formData.get('password')
if(email == '' || password == ''){
    return
}
await login(email, password)
ctx.updateNav()
ctx.page.redirect('/dashboard')
}
}