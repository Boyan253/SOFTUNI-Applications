import { login, logout } from "./api/users.js";
import { getUserData } from "./util.js";
import { catalogView } from "./views/catalog.js";
import {page, render} from "./lib.js"
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { homeView } from "./views/home.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";

const main = document.querySelector('main')
page(decorateContext)
page('/create', createView)
page('/edit/:id', editView)
page('/', homeView)
page('/dashboard', catalogView)
page('/dashboard/:id', detailsView)
page('/register', registerView)
page('/login', loginView)
page('/logout', onLogout)
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
    [...document.querySelectorAll('#guest')].forEach(s => s.style.display = 'none');
    [...document.querySelectorAll('#user')].forEach(s => s.style.display = 'inline');
    }
    else{
        [...document.querySelectorAll('#guest')].forEach(s => s.style.display = 'inline');
        [...document.querySelectorAll('#user')].forEach(s => s.style.display = 'none');
    
    }
    

}

function onLogout(){
    logout()
    updateNav()
    page.redirect('/')
}