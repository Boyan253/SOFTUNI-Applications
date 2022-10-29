function attachEvents() {

    document.querySelector('#refresh').addEventListener('click', OnClick)
    document.querySelector('#submit').addEventListener('click', Addcomment)
    let url = `http://localhost:3030/jsonstore/messenger`
    function Addcomment() {
        let authorname = document.querySelector('[name="author"]')
        let content = document.querySelector('[name="content"]')

        if (!authorname.value || !content.value) {
            return
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                author: authorname.value.trim(),
                content: content.value,
            })
        })
            .then(res => {
                if (res.ok == false) {
                    throw new Error('Error')
                }
                return res.json()
            })
            .catch(err => alert(err))
        authorname.value = ''
        content.value = ''

    }
    function OnClick() {
        fetch(url)
            .then(resp => {
                if (resp.ok == false) {
                    throw new Error('Error')
                }
                return resp.json()
            })
            .then(data => {
                let textarea = document.querySelector('#messages')
                let comments = []
                Object.values(data).forEach(e => comments.push(`${e.author}: ${e.content}`))
                textarea.value = comments.join('\n')


            })
            .catch(err => alert(err.message))

    }




}

attachEvents();