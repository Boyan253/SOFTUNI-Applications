

let submitbtn = document.getElementById('submit')
submitbtn.addEventListener('click', OnClick)
function OnClick(e){
    e.preventDefault()

    let firstinput = document.querySelectorAll('input')[0].value
    
    let secondinput = document.querySelectorAll('input')[1].value
    document.querySelectorAll('input')[0].value = ''
    document.querySelectorAll('input')[1].value = ''
    if(firstinput != '' && secondinput!= '') {
    
    fetch(url,{
      method: 'POST',
      body: JSON.stringify({
        title: secondinput,
        author: firstinput
        
        
    })
    
    
    }).then(OnLoad())
    

    
    
        
      }else{
        return
      }
      }
    









let loadBtn = document.getElementById('loadBooks')

let url = 'http://localhost:3030/jsonstore/collections/books'
loadBtn.addEventListener('click', OnLoad)

 async function OnLoad() {

try{
  let response = await fetch(url)
  
  let data = await response.json()
  
    let toappend = document.querySelector('tbody')
    let items = Object.entries(data)
toappend.innerHTML = ''
    for (let [key, { author, title }] of items) {

      let tr = document.createElement('tr')
      tr.innerHTML = `<td>${title}</td>
<td>${author}</td>`
let td = document.createElement('td')
let deletebtn = document.createElement('button')
let editbtn = document.createElement('button')
deletebtn.textContent = 'Delete'
editbtn.textContent = 'Edit'
td.appendChild(deletebtn)
td.appendChild(editbtn)
tr.appendChild(td)

      toappend.appendChild(tr)
      editbtn.addEventListener('click', edit)
      deletebtn.addEventListener('click', remove)
function edit (e){
  if(document.querySelectorAll('input')[0].value !== '' || document.querySelectorAll('input')[1].value!==''){
    return
  }
  document.querySelectorAll('input')[0].value = author
  document.querySelectorAll('input')[1].value = title
fetch(`${url}/${key}`, {
  method:'PUT',
  body:{
    title: title,
    author: author
  }
}).then(OnLoad)


}
      function remove() {
    fetch(`${url}/${key}`, {
      method: 'DELETE'
    }).then(OnLoad)
    

      }


    }

  }
  catch(err){

  }




 }OnLoad()
