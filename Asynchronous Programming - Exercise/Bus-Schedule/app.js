function solve() {

let element = document.querySelector('.info')
let departbtn = document.getElementById('depart')
let arrivebtn = document.getElementById('arrive')

let busStop = {

    next: 'depot'
}

    function depart() {
        departbtn.disabled = true
        let url = `http://localhost:3030/jsonstore/bus/schedule/${busStop.next}`

        fetch(url)
        .then(response => response.json())
        .then(data => {busStop = JSON.parse(JSON.stringify(data))
            element.textContent = `Next stop ${busStop.name}`})
        .catch(error => console.log(error))
        arrivebtn.disabled = false
    }

    function arrive() {
        element.textContent = `Arriving at ${busStop.name}`
        arrivebtn.disabled = true
        departbtn.disabled =false
    }

    return {
        depart,
        arrive
    };
}

let result = solve();