function init() {

    const token = localStorage.getItem('token');
    fetch('http://127.0.0.1:8080/api/movies', {
        credentials: 'include',
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
}