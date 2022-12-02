import { login } from "../api/user.js";
import { html } from "../lib.js";



const loginTemplate = (onSubmit) => html`<section id="login-page" class="login">
<form @submit = ${onSubmit}id="login-form" action="" method="">
    <fieldset>
        <legend>Login Form</legend>
        <p class="field">
            <label for="email">Email</label>
            <span class="input">
                <input type="text" name="email" id="email" placeholder="Email">
            </span>
        </p>
        <p class="field">
            <label for="password">Password</label>
            <span class="input">
                <input type="password" name="password" id="password" placeholder="Password">
            </span>
        </p>
        <input class="button submit" type="submit" value="Login">
    </fieldset>
</form>
</section>
`








export async function loginView(ctx){
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