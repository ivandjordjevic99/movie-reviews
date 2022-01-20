function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    fetch('http://127.0.0.1:8080/api/movies', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const list = document.getElementById('movieList');

            data.forEach( element => {
                list.innerHTML += `<li>ID: ${element.id}, Name: ${element.name}</li>`;
            });
        });

    document.getElementById('deleteBtn').addEventListener('click', e => {
        e.preventDefault();

        const id = document.getElementById('deleteId').value
        const url = 'http://127.0.0.1:8080/api/movies/' + id

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then( res => res.json() )
            .then(element => {
                document.location.reload();
            });
    });

    document.getElementById('addBtn').addEventListener('click', e => {
        e.preventDefault();

        const body = {
            name: document.getElementById('name').value,
            year: document.getElementById('year').value,
            director_id: document.getElementById('director_id').value,
            synopsis: document.getElementById('synopsis').value
        }
        fetch('http://127.0.0.1:8080/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        }).then( res => res.json() )
            .then(el => {
                alert(JSON.stringify(el[0]))
                document.location.reload();
            });
    });

    document.getElementById('loadBtn').addEventListener('click', e => {
        e.preventDefault();

        const id = document.getElementById('loadId').value
        const url = 'http://127.0.0.1:8080/api/movies/' + id
        console.log(url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then( res => res.json() )
            .then(element => {
                document.getElementById('update_name').value = element.name
                document.getElementById('update_year').value = element.year
                document.getElementById('update_director_id').value = element.director_id
                document.getElementById('update_synopsis').value = element.synopsis
            });
    });

    document.getElementById('updateBtn').addEventListener('click', e => {
        e.preventDefault();

        const body = {
            name: document.getElementById('update_name').value,
            year: document.getElementById('update_year').value,
            director_id: document.getElementById('update_director_id').value,
            synopsis: document.getElementById('update_synopsis').value
        }

        const id = document.getElementById('loadId').value
        const url = 'http://127.0.0.1:8080/api/movies/' + id
        console.log(url)
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        }).then( res => res.json() )
            .then(el => {
                if(Object.keys(el).length === 0 && el.constructor === Object)
                    alert("Error")
                else{
                    alert(JSON.stringify(el[0]))
                    document.location.reload();
                }
            });
    });
}