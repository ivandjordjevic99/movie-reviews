function init() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
        fetch('https://movie-reviews-auth-service.herokuapp.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    console.log(el.token)
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    window.location.assign("https://movie-reviews-app-service.herokuapp.com/admin")
                }
            });
    });
}
