$(document).ready(function(){
    $('.modal-trigger').leanModal({
        dismissible: false
    });
    $(".button-collapse").sideNav();
    $('select').material_select();
});




/*

$('#login-button').click(function(){
    $('.error-div').empty();
    var errorMessageUser = 'Kombinationen av användarnamn och lösenord finns inte.';
    $('.error-div').append(errorMessageUser);
});
*/