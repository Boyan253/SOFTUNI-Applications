import { register } from "../api/user.js";
import { html } from "../lib.js";




const registerTemplate = (onSubmit) => html`<section id="register-page" class="register">
<form @submit = ${onSubmit}id="register-form" action="" method="">
    <fieldset>
        <legend>Register Form</legend>
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
        <p class="field">
            <label for="repeat-pass">Repeat Password</label>
            <span class="input">
                <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
            </span>
        </p>
        <input class="button submit" type="submit" value="Register">
    </fieldset>
</form>
</section>`





export async function registerView(ctx){
    ctx.render(registerTemplate(onSubmit))
    async function onSubmit(event){

       
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPass = formData.get('confirm-pass');

        if (!password || !email ) {
            return alert('All fields are required!');
        } else if (password != repeatPass) {
            return alert('Password dont match')
        }

        await register(email, password);
        event.target.reset();
        ctx.updateNav()
        ctx.page.redirect('/dashboard');
        }
    
}