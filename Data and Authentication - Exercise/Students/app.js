let url = 'http://localhost:3030/jsonstore/collections/students'
async function reload(){



fetch(url, {
    method: 'GET'
})
.then(res => res.json())
.then(data => Object.values(data).forEach(element => {
    let toappend = document.querySelector('tbody')
    let thead = document.createElement('tr')
    thead.innerHTML =`
                      <td>${element.firstName}</td>
                      <td>${element.lastName}</td>
                      <td>${element.facultyNumber}</td>
                      <td>${element.grade}</td>
                      
                      `
                      toappend.appendChild(thead)
}))
}reload()
let form = document.querySelectorAll('input')
let submit = document.getElementById('submit')
submit.addEventListener('click', OnClick)
function OnClick(e){
e.preventDefault()

let firstname = form[0].value
let secondname = form[1].value
let facultynumber = form[2].value
let grade = form[3].value

fetch(url, {
method: 'POST',
body: JSON.stringify({
    firstName: firstname.trim(),
    lastName: secondname,
    facultyNumber: facultynumber,
    grade: grade
})
}).then(resp => {
    if (resp.ok == false) {
        throw new Error('Error')
    }
    document.querySelectorAll('input')[0].value = ''
    document.querySelectorAll('input')[1].value = ''
    document.querySelectorAll('input')[2].value = ''
    document.querySelectorAll('input')[3].value = ''
   
    return resp.json()
})

.catch(err => alert(err))


}

