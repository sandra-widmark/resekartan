var socket = io.connect('http://localhost:8080');

$(document).ready(function(){
    $('.modal-trigger').leanModal();
    $(".button-collapse").sideNav();
});

socket.on('connect', function(){
       // socket.emit('show users');
    });

$('#register-button').click(function(){
    console.log('button clicked');
    var username = $('#username-register');
    var password = $('#password-register');
    var data = {
        username: username.val(),
        password: password.val()
    }
    socket.emit('user register', data);
});

$('#login-button').click(function(){
    console.log('button clicked');
    var username = $('#username-login');
    var password = $('#password-login');
    var data = {
        username: username.val(),
        password: password.val()
    }
    socket.emit('user login', data);

});

socket.on('send user error message',function(){
    console.log('Inloggning misslyckades, kunde inte hitta en användare med det namnet');
});

socket.on('send password error message',function(){
   console.log('Inloggning misslyckades, fel lösenord');
});

socket.on('user authenticated',function(data){
   var redirect = '/main';
   window.location.href = redirect;
   console.log('inloggad som ' + data.username);
});

