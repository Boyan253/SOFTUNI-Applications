function attachEvents() {
    
let phonebook = document.getElementById('phonebook')
let load = document.getElementById('btnLoad')


let create = document.getElementById('btnCreate')

let url = `http://localhost:3030/jsonstore/phonebook`

load.addEventListener('click', OnReload)
create.addEventListener('click', OnCreate)
document.querySelector('#phonebook').addEventListener('click', remove)

function OnCreate(){
    let name = document.querySelector('#person')
    let content = document.querySelector('#phone')
    if(!name.value  || !content.value){
        return
    }
fetch(url, { method: 'POST',
headers: {
    'Content-type':'application/json'
},
body: JSON.stringify({
    person: name.value.trim(),
    phone: content.value.trim(),
})

})
.then(res => res.json())
.catch(err => alert(err.message))
person.value = ''
phone.value = ''

}


function OnReload(){

fetch(url)

.then(resp => resp.json())
.then(data =>  {phonebook.replaceChildren()
    Object.values(data).forEach(element => {
    let li = document.createElement('li')
    li.innerHTML = `${element.person}: ${element.phone}`
    let buttondelete = document.createElement('button')
    buttondelete.textContent = 'Delete'
    buttondelete.setAttribute('id',element._id)
    li.appendChild(buttondelete)
    phonebook.appendChild(li)
    })}).catch(err => alert(err.message))






}

function remove(e){
let currid = e.target.id
let curel = e.target.key
if(e.target.textContent == 'Delete'){
   fetch(`${url}/${currid}`,{
   method: 'DELETE'
   }
   ).then(res => {
    OnReload()
    
    return res.json()})
   .catch(err => alert(err))
}
}
}

attachEvents();