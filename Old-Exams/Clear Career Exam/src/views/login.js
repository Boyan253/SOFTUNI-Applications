import { html, render, page } from "../lib.js"
import { login } from "../api/users.js"


const loginTemplate = (onSubmit) => html`
<section id="login">
<div class="form">
  <h2>Login</h2>
  <form @submit = ${onSubmit}class="login-form">
    <input type="text" name="email" id="email" placeholder="email" />
    <input
      type="password"
      name="password"
      id="password"
      placeholder="password"
    />
    <button type="submit">login</button>
    <p class="message">
      Not registered? <a href="#">Create an account</a>
    </p>
  </form>
</div>
</section>

`

export async function loginView(ctx) {

    ctx.render(loginTemplate(onSubmit))


    async function  onSubmit(e) {
e.preventDefault()
const userData = new FormData(e.target)

const email = userData.get('email')
const password = userData.get('password')

if (!email || !password) {
   return alert('No empty fields allowed') 
}

await login(email, password)
ctx.updateNav()
ctx.page.redirect('/dashboard')
    }
}