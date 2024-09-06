/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!**************************!*\
  !*** ./signup/signup.ts ***!
  \**************************/

// Name Error Validation
function nameError(event) {
    const input = event.value.trim();
    const error = document.getElementById('name-error');
    if (input === '') {
        error.innerText = "Enter a name..";
        return false;
    }
    else {
        error.innerText = "";
        return true;
    }
}
// Date of Birth Error Validation
function dateError(event) {
    const input = event.value.trim();
    const error = document.getElementById('date-error');
    if (input === '') {
        error.innerText = "Enter a Date of Birth..";
        return false;
    }
    else {
        error.innerText = "";
        return true;
    }
}
// Email Error Validation
function emailError(event) {
    const input = event.value.trim();
    const error = document.getElementById('email-error');
    const allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
    function emailExistornot() {
        return allUsersJson.some(user => user.userEmail === input);
    }
    if (input === '') {
        error.innerText = "Enter an Email..";
        return false;
    }
    else if (emailExistornot()) {
        error.innerText = "Email already Exists..";
        return false;
    }
    else {
        error.innerText = "";
        return true;
    }
}
// Password Error Validation
function passwordInputError() {
    const password = document.querySelector('.user-password').value.trim();
    const confirmPassword = document.querySelector('.confirm-password').value.trim();
    const errorElement = document.getElementById('password-error');
    if (password !== confirmPassword) {
        errorElement.innerText = "Passwords do not match";
        return false;
    }
    else {
        errorElement.innerText = "";
        return true;
    }
}
// Create User Object
class CreateUser {
    constructor(userName, userEmail, userBirthDate, userPassword, userRole = "user") {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userBirthDate = userBirthDate;
        this.userPassword = userPassword;
        this.userRole = userRole;
    }
    displayData() {
        console.log(`Name: ${this.userName}`);
        console.log(`Email: ${this.userEmail}`);
        console.log(`Date of Birth: ${this.userBirthDate}`);
        console.log(`Password: ${this.userPassword}`);
        console.log(`Role: ${this.userRole}`);
    }
    toPlainObject() {
        return {
            userName: this.userName,
            userEmail: this.userEmail,
            userBirthDate: this.userBirthDate,
            userPassword: this.userPassword,
            userRole: this.userRole
        };
    }
}
// Add User to Local Storage
function addUser(event) {
    event.preventDefault();
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-mail');
    const userBirthDate = document.getElementById('user-birth-date');
    const userPassword = document.getElementById('user-password');
    const nameValid = nameError(userName);
    const emailValid = emailError(userEmail);
    const dateValid = dateError(userBirthDate);
    const passwordValid = passwordInputError();
    if (nameValid && emailValid && dateValid && passwordValid) {
        const allUsersJson = JSON.parse(localStorage.getItem("users") || "[]").map((user) => new CreateUser(user.userName, user.userEmail, user.userBirthDate, user.userPassword, user.userRole));
        const newUser = new CreateUser(userName.value, userEmail.value, userBirthDate.value, userPassword.value);
        allUsersJson.push(newUser); // Push `CreateUser` instance
        localStorage.setItem("users", JSON.stringify(allUsersJson.map(user => user.toPlainObject())));
        alert("Account created...!");
        window.location.href = "../login/login.html";
    }
    else {
        alert("Please correct the errors in the form.");
    }
}
// By Default Add Admin User
window.addEventListener('load', () => {
    const allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
    if (allUsersJson.length === 0) {
        const adminUser = new CreateUser('Admin', 'akashkce123@gmail.com', '2003-10-09', 'Akash@2003', 'admin');
        localStorage.setItem("users", JSON.stringify([adminUser.toPlainObject()]));
    }
    // Attach event listeners
    const userNameInput = document.getElementById('user-name');
    const userEmailInput = document.getElementById('user-mail');
    const userBirthDateInput = document.getElementById('user-birth-date');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const signupButton = document.querySelector('.signup-btn button');
    if (userNameInput && userEmailInput && userBirthDateInput && confirmPasswordInput && signupButton) {
        userNameInput.addEventListener('blur', () => nameError(userNameInput));
        userEmailInput.addEventListener('blur', () => emailError(userEmailInput));
        userBirthDateInput.addEventListener('blur', () => dateError(userBirthDateInput));
        confirmPasswordInput.addEventListener('blur', passwordInputError);
        signupButton.addEventListener('click', addUser);
    }
});

/******/ })()
;
//# sourceMappingURL=signup.bundle.js.map