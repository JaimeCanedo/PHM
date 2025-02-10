$(document).on('pagecreate', '#login', function() {
    $('#login-form').on('submit', function(e) {
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();

        // Aquí puedes agregar la lógica de autenticación
        if (username === 'admin' && password === 'password') {
            localStorage.setItem('authenticated', true);
            window.location.href = 'home.html';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });
});