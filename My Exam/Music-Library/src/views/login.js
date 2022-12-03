
import { login } from "../api/users.js"
import { html,render } from "../lib.js"


const loginTemplate = (onSubmit) => html `  <section id="login">
<div class="form">
  <h2>Login</h2>
  <form @submit = ${onSubmit}class="login-form">
    <input type="text" name="email" id="email" placeholder="email" />
    <input type="password" name="password" id="password" placeholder="password" />
    <button type="submit">login</button>
    <p class="message">
      Not registered? <a href="#">Create an account</a>
    </p>
  </form>
</div>
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
ctx.page.redirect('/')
}
}