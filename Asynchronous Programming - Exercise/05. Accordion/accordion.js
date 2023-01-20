function solution() {
   
let divmain = document.getElementById('main')
let url = 'http://localhost:3030/jsonstore/advanced/articles/list'
let urldetails = 'http://localhost:3030/jsonstore/advanced/articles/details'
fetch(urldetails,{
    method: 'GET'
})
.then(res => res.json())
.then(data => Object.values(data).forEach(e => {
    let div = document.createElement('div')
    div.innerHTML = `
    <div class="head">
        <span>${e.title}</span>
        <button class="button" id="${e._id}">More</button>
        </div>
        <div class="extra">
                <p>${e.content}</p>
            </div>
       `
    div.className = 'accordion'
    divmain.appendChild(div)

    let btnmore = div.querySelector('button')
    btnmore.addEventListener('click', OnMore)
    
  
    function OnMore(e){
        let id = e.target.id
        
        
if(btnmore.textContent == 'More'){
    const text = e.target.parentElement.parentElement.lastElementChild;
    text.style.display = text.style.display == 'block' ? 'none' : 'block';
btnmore.textContent = 'Less'
}else if (btnmore.textContent == 'Less'){
    const text = e.target.parentElement.parentElement.lastElementChild;
    text.style.display = text.style.display == 'block' ? 'none' : 'block';
    btnmore.textContent = 'More'
}




    }
}))
}
solution()