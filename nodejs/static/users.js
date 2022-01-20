function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    fetch('http://127.0.0.1:8080/api/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const list = document.getElementById('userList');

            data.forEach( element => {
                list.innerHTML += `<li>ID: ${element.id}, Username: ${element.username}</li>`;
            });
        });

    document.getElementById('deleteBtn').addEventListener('click', e => {
        e.preventDefault();

        const id = document.getElementById('deleteId').value
        const url = 'http://127.0.0.1:8080/api/users/' + id

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
            surname: document.getElementById('surname').value,
            email: document.getElementById('email').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            role: document.getElementById('role').value
        }
        fetch('http://127.0.0.1:8080/api/users', {
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
        const url = 'http://127.0.0.1:8080/api/users/' + id
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
                document.getElementById('update_surname').value = element.surname
                document.getElementById('update_email').value = element.email
                document.getElementById('update_username').value = element.username
                document.getElementById('update_password').value = element.password
                document.getElementById('update_role').value = element.role
            });
    });

    document.getElementById('updateBtn').addEventListener('click', e => {
        e.preventDefault();

        const body = {
            name: document.getElementById('update_name').value,
            surname: document.getElementById('update_surname').value,
            email: document.getElementById('update_email').value,
            username: document.getElementById('update_username').value,
            password: document.getElementById('update_password').value,
            role: document.getElementById('update_role').value
        }

        const id = document.getElementById('loadId').value
        const url = 'http://127.0.0.1:8080/api/users/' + id
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