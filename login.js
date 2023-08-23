// Hard coded login credentials for testing
let exampleTel = '07123456789';
let exampleEmail = 'example@email.com';
let examplePassword = 'password';

// Event listeners
let mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
mediaQuery.addEventListener('change', themeChange)

$('#password-input-img').on('click', function() {
    if ($('#password-input').attr('type') == 'password') {
        $('#password-input').attr('type', 'text');
        $(this).attr('src', 'imgs/eye.svg');
    } else {
        $('#password-input').attr('type', 'password');
        $(this).attr('src', 'imgs/eye-off.svg');
    }
})
$('#login-btn').on('click', function() {
    attemptLogin();
})
$('#password-input').on('keypress', function(event) {
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        attemptLogin();
    }
})
$('#forgot-btn').on('click', function() {
    togglePages('forgot-screen');
})
$('.return-to-login').on('click', function() {
    togglePages('login-container');
})
$('#register-btn').on('click', function() {
    $('#username-input').val('');
    $('#password-input').val('');
    $('.error').remove();
    if (checkForTel($('#tel-input').val()) && checkForTel($('#tel-input').val()) !== '') {
        $('#inputted-tel').text($('#tel-input').val());
        togglePages('registration-form', $('#tel-input').val());
    } else if ($('#tel-input').val() == ''){
        addErrorSpan('Field must be filled.', 'error-tel', 'reg-p', 'tel-input');
    } else {
        addErrorSpan('Please enter a valid phone number.', 'error-tel', 'register-btn');
    }
})
$('#forgot-submit-btn').on('click', function() {
    $('.error').remove();
    if (!checkForEmail($('#forgot-email-input').val()) && $('#forgot-email-input').val() !== '') {
        addErrorSpan('Please enter a valid email address', 'error-forgot-email', 'forgot-email-label');
    } else if (checkForEmail($('#forgot-email-input').val())){
        console.log('forgot email would be sent');
        $('#forgot-submit-btn').after("<span class='confirm-message'>Check your inbox and spam folder for our email.</span>");
    } else {
        addErrorSpan('Field must be filled', 'error-forgot-email', 'forgot-email-label', 'forgot-email-input');
    }
})
$('#code-submit-btn').on('click', function() {
    console.log('continue on to rest of registration')
    $('#code-submit-btn').after("<span class='confirm-message'>next steps of registration would continue from here</span>");
})

// Functions
function themeChange(event) {
    if (event.matches) {
      $('link[rel="icon"]').attr('href', 'img/favicon-dark.png');
    } else {
      $('link[rel="icon"]').attr('href', 'img/favicon-light.png')
    }
}
function attemptLogin() {
    $('#tel-input').val('');
    $('.error').remove();
    if ($('#username-input').val() && $('#password-input').val()) {
        if(($('#username-input').val() == exampleEmail || $('#username-input').val() == exampleTel) && $('#password-input').val() == examplePassword) {
            console.log('logged in');
            $('#account-text').text('My Account');
            togglePages('logged-in-screen');
        } else {
            console.log('couldnt login');
            addErrorSpan('You have entered an invalid username or password', 'error-login', 'login-btn');
        }
    } else {
        addErrorSpan('Field must be filled', 'error-username', 'username-label', 'username-input', );
        addErrorSpan('Field must be filled', 'error-password', 'password-label', 'password-input');
 
    }
}
function addErrorSpan(text, id, selector, input) {
    if (input) {
        if (!$(`#${input}`).val()) {
            if ($(`#${id}`).length == 0) {
                $(`#${selector}`).after(`<span class='error' id='${id}'>${text}</span>`);
            }
        } else {
            $(`#${id}`).remove();
        }
    } else {
        if ($(`#${id}`).length == 0) {
            $(`#${selector}`).after(`<span class='error' id='${id}'>${text}</span>`);
        }
    }
}
function togglePages(newPage) {
    $('.confirm-message').remove();
    $('.error').remove();
    $('.page').hide();
    $(`#${newPage}`).show();
    $('.input').val('');
}
function checkForEmail(text) { 
    let re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    return re.test(text);
}
function checkForTel(text) {
    let re = /^(?:\W*\d){11}\W*$/;
    return re.test(text)
}