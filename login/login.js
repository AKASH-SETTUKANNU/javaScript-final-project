// Elements
var email = document.getElementById("user-mail");
var password = document.getElementById("user-password");
var mailError = document.getElementById("email-error");
var passwordError = document.getElementById("password-error");
// Handle email error
function emailErrorHandel() {
    if (email.value.trim() === '') {
        mailError.textContent = "Please enter your Email...";
        return false;
    }
    else if (!emailExistornot()) {
        mailError.textContent = "User does not exist, please sign up...";
        return false;
    }
    else {
        mailError.textContent = "";
        return true;
    }
}
// Function to check if the email exists
function emailExistornot() {
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    return users.some(function (user) { return user.userEmail === email.value; });
}
// Check if password in local storage matches or not
function passWordMatch() {
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var user = users.filter(function (user) { return user.userEmail === email.value; })[0];
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
        var user = users.filter(function (user) { return user.userEmail === emailValue_1; })[0];
        if (user) {
            var name_1 = user.userName;
            // Store logged-in user email in localStorage
            localStorage.setItem("loggedInUserEmail", emailValue_1);
            if (user.userRole === 'admin') {
                window.location.href = "../adminIndex/adminIndex.html";
            }
            else {
                alert("Welcome, ".concat(name_1, "!"));
                window.location.href = "../index/index.html";
            }
        }
        else {
            alert("Invalid email or password.");
        }
    }
}
// Attach event listener to the login button
var loginButton = document.getElementById("login-button");
if (loginButton) {
    loginButton.addEventListener("click", loginUser);
}
