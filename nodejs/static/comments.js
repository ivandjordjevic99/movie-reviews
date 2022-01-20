function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    fetch('http://127.0.0.1:8080/api/comments', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const list = document.getElementById('commentList');

            data.forEach( element => {
                list.innerHTML += `<li>ID: ${element.id}, User id: ${element.user_id}, Movie id: ${element.movie_id}, Stars: ${element.stars}, content: ${element.content}</li>`;
            });
        });

    document.getElementById('deleteBtn').addEventListener('click', e => {
        e.preventDefault();

        const id = document.getElementById('deleteId').value
        const url = 'http://127.0.0.1:8080/api/comments/' + id

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
            content: document.getElementById('content').value,
            stars: document.getElementById('stars').value,
            user_id: document.getElementById('user_id').value,
            movie_id: document.getElementById('movie_id').value
        }
        fetch('http://127.0.0.1:8080/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        }).then( res => res.json() )
            .then(element => {
                document.location.reload();
            });
    });

    document.getElementById('loadBtn').addEventListener('click', e => {
        e.preventDefault();

        const id = document.getElementById('loadId').value

        const url = 'http://127.0.0.1:8080/api/comments/' + id
        console.log(url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then( res => res.json() )
            .then(element => {
                document.getElementById('update_content').value = element.content
                document.getElementById('update_stars').value = element.stars
                document.getElementById('update_user_id').value = element.user_id
                document.getElementById('update_movie_id').value = element.movie_id
            });
    });

    document.getElementById('updateBtn').addEventListener('click', e => {
        e.preventDefault();

        const body = {
            content: document.getElementById('update_content').value,
            stars: document.getElementById('update_stars').value,
            user_id: document.getElementById('update_user_id').value,
            movie_id: document.getElementById('update_movie_id').value
        }

        const id = document.getElementById('loadId').value
        const url = 'http://127.0.0.1:8080/api/comments/' + id
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
                    alert("Updated")
                    document.location.reload();
                }

            });
    });
}