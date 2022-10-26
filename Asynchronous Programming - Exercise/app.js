function getInfo() {
let btn = document.getElementById('submit')
let inpel = document.getElementById('stopId')
let url = `http://localhost:3030/jsonstore/bus/businfo`
let ul = document.getElementById('buses')
let div = document.getElementById('stopName')

fetch(`${url}/${inpel.value}`)
.then(res => res.json())
.then(data => { 
    let bus = data.buses
    let name = data.name
    div.textContent = name
    Object.keys(bus).forEach(e => {
        let li = document.createElement('li')
    li.textContent = `Bus ${e} arrives in ${bus[e]} minutes`
        ul.appendChild(li)
        
    });
    


})
.catch(error => {
    div.textContent = 'Error'
})
}