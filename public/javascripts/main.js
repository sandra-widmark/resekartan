var socket = io.connect();

$(document).ready(function(){
    $('.modal-trigger').leanModal({
        dismissible: false
    });
    $(".button-collapse").sideNav();
    $('select').material_select();
});

$('#login-button').click(function(){
    socket.emit('user login');
});

socket.on('user exists',function(){
    $('.errorReg-div').empty();
    var errorUserExists = 'Användarnamnet finns redan, försök igen.';
    $('.errorReg-div').append(errorUserExists);
});


socket.on('send user error message',function(){
    $('.error-div').empty();
    var errorMessageUser = 'Användarnamnet finns inte registrerat, försök igen.';
    $('.error-div').append(errorMessageUser);
});


socket.on('send password error message',function(){
    $('.error-div').empty();
    var errorMessagePassword = 'Fel lösenord, försök igen.';
    $('.error-div').append(errorMessagePassword);
});
