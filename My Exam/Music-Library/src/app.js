
import {page,render} from './lib.js'

import { getUserData } from './util.js'

import { logout } from './api/users.js'
import { dashboardView } from './views/dashboard.js'
import { loginView } from './views/login.js'
import { detailsView } from './views/details.js'
import { homeView } from './views/home.js'
import { createView } from './views/create.js'
import { registerView } from './views/register.js'
import { EditView } from './views/edit.js'


const main = document.querySelector('main')
page(decorateContext)
page('/',   homeView)
page('/dashboard', dashboardView)
page('/dashboard/:id', detailsView)
page('/edit/:id', EditView)
page('/myPosts', () => console.log('mypost'))
page('/createPost', createView)
page('/login', loginView)
page('/register', registerView)
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
    [...document.querySelectorAll('.guest')].forEach(s => s.style.display = 'none');
    [...document.querySelectorAll('.user')].forEach(s => s.style.display = 'inline');
    }
    else{
        [...document.querySelectorAll('.guest')].forEach(s => s.style.display = 'inline');
        [...document.querySelectorAll('.user')].forEach(s => s.style.display = 'none');
    
    }
    

}

function onLogout(){
    logout()
    updateNav()
    page.redirect('/')
}