

import { dashboardView } from "./views/dashboard.js";
import { page, render } from './lib.js'
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { homeView } from "./views/home.js";
import {getUserData} from "./util.js"
import { logout } from "./api/users.js";
import { detailsView } from "./views/details.js";
import { createView } from "./views/create.js";
import { editView } from "./views/edit.js";

const main = document.querySelector('main')

document.querySelector('.logout').addEventListener('click', onLogout)
page(decorateContext)

page('/dashboard', dashboardView)
page('/edit/:id', editView)
page('/create', createView)
page('/dashboard/:id', detailsView)
page('/login', loginView)
page('/register', registerView)
page('/', homeView)
updateNav()
page.start()

function decorateContext(ctx,next){
    ctx.updateNav = updateNav
    ctx.render = renderMain
    next()
}


function renderMain(templateResult){
render(templateResult,main)

}


 function updateNav(){

    const userData = getUserData()
    if(userData){
       [...document.querySelectorAll('.guest')].forEach(s => s.style.display = 'none');
       [...document.querySelectorAll('.user')].forEach(s => s.style.display = 'inline');
       }
       else{
           [...document.querySelectorAll('.guest')].forEach(s => s.style.display = 'inline');
           [...document.querySelectorAll('.user')].forEach(s => s.style.display = 'none');
       
       }
       
   
   }
   
async function onLogout(){
 logout()
updateNav()
page.redirect('/')

}