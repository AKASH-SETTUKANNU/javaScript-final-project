// Elements
var email = document.getElementById("user-mail");
var password = document.getElementById("user-password");
var mailError = document.getElementById("email-error");
var passwordError = document.getElementById("password-error");
// Handle email error
function emailErrorHandel() {
    var emailValue = email.value.trim();
    if (emailValue === '') {
        mailError.textContent = "Please enter your Email...";
        return false;
    }
    else if (!emailExistornot(emailValue)) {
        mailError.textContent = "User does not exist, please sign up...";
        return false;
    }
    else {
        mailError.textContent = "";
        return true;
    }
}
// Function to check if the email exists
function emailExistornot(emailValue) {
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    // Log users and the email being checked
    console.log('Users:', users);
    console.log('Checking email:', emailValue);
    return users.some(function (user) { return user.userEmail.trim() === emailValue; });
}
// Check if password in local storage matches or not
function passWordMatch() {
    var emailValue = email.value.trim();
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var user = users.find(function (user) { return user.userEmail.trim() === emailValue; });
    // Log user and password
    console.log('Found user:', user);
    return user ? user.userPassword === password.value : false;
}
// Handle password error
function passwordErrorHandel() {
    if (password.value.trim() === '') {
        passwordError.textContent = "Please enter your password...";
        return false;
    }
    else if (!passWordMatch()) {
        passwordError.textContent = "Password does not match...";
        return false;
    }
    else {
        passwordError.textContent = "";
        return true;
    }
}
// Login user if login button is triggered
function loginUser(event) {
    event.preventDefault();
    if (emailErrorHandel() && passwordErrorHandel()) {
        var emailValue_1 = email.value.trim();
        var users = JSON.parse(localStorage.getItem("users") || "[]");
        var user = users.find(function (user) { return user.userEmail.trim() === emailValue_1; });
        if (user) {
            var name_1 = user.userName;
            localStorage.setItem("loggedInUserEmail", emailValue_1);
            if (user.userRole === 'admin') {
                window.location.href = "./adminIndex/adminIndex.html";
            }
            else {
                alert("Welcome, ".concat(name_1, "!"));
                window.location.href = "./guestIndex/guestIndex.html";
            }
        }
        else {
            alert("Invalid email or password.");
        }
    }
}
// Add event listeners when the window loads
window.addEventListener('load', function () {
    // Attach event listeners
    var emailInput = document.getElementById('user-mail');
    var passwordInput = document.getElementById('user-password');
    var loginButton = document.querySelector('.login-btn button');
    if (emailInput && passwordInput && loginButton) {
        emailInput.addEventListener('blur', emailErrorHandel);
        passwordInput.addEventListener('blur', passwordErrorHandel);
        loginButton.addEventListener('click', loginUser);
    }
});
