// Name Error Validation
function nameError(input) {
    var value = input.value.trim();
    var error = document.getElementById('name-error');
    if (value === '') {
        error.innerText = "Enter a name..";
        return false;
    }
    else {
        error.innerText = "";
        return true;
    }
}
// Date of Birth Error Validation
function dateError(input) {
    var value = input.value.trim();
    var error = document.getElementById('date-error');
    if (value === '') {
        error.innerText = "Enter a Date of Birth..";
        return false;
    }
    else {
        error.innerText = "";
        return true;
    }
}
// Email Error Validation
function emailError(input) {
    var value = input.value.trim();
    var error = document.getElementById('email-error');
    var allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
    function emailExistornot() {
        return allUsersJson.some(function (user) { return user.userEmail === value; });
    }
    if (value === '') {
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
    var password = document.querySelector('.user-password').value.trim();
    var confirmPassword = document.querySelector('.confirm-password').value.trim();
    var errorElement = document.getElementById('password-error');
    var hasCapitalLetter = /[A-Z]/.test(password);
    var hasNumber = /[0-9]/.test(password);
    var hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    var isValid = true;
    if (password !== confirmPassword) {
        errorElement.innerText = "Passwords do not match.";
        isValid = false;
    }
    else if (!hasCapitalLetter || !hasNumber || !hasSpecialCharacter) {
        var errorMessages = [];
        if (!hasCapitalLetter)
            errorMessages.push("Password must contain at least one capital letter.");
        if (!hasNumber)
            errorMessages.push("Password must contain at least one number.");
        if (!hasSpecialCharacter)
            errorMessages.push("Password must contain at least one special character.");
        errorElement.innerText = errorMessages.join(" ");
        isValid = false;
    }
    else {
        errorElement.innerText = "";
    }
    return isValid;
}
// Create User Object
var CreateUser = /** @class */ (function () {
    function CreateUser(userName, userEmail, userBirthDate, userPassword, userRole) {
        if (userRole === void 0) { userRole = "user"; }
        this.userName = userName;
        this.userEmail = userEmail;
        this.userBirthDate = userBirthDate;
        this.userPassword = userPassword;
        this.userRole = userRole;
    }
    CreateUser.prototype.displayData = function () {
        console.log("Name: ".concat(this.userName));
        console.log("Email: ".concat(this.userEmail));
        console.log("Date of Birth: ".concat(this.userBirthDate));
        console.log("Password: ".concat(this.userPassword));
        console.log("Role: ".concat(this.userRole));
    };
    CreateUser.prototype.toPlainObject = function () {
        return {
            userName: this.userName,
            userEmail: this.userEmail,
            userBirthDate: this.userBirthDate,
            userPassword: this.userPassword,
            userRole: this.userRole
        };
    };
    return CreateUser;
}());
// Add User to Local Storage
function addUser(event) {
    event.preventDefault();
    var userName = document.getElementById('user-name');
    var userEmail = document.getElementById('user-mail');
    var userBirthDate = document.getElementById('user-birth-date');
    var userPassword = document.getElementById('user-password');
    if (!userName || !userEmail || !userBirthDate || !userPassword) {
        alert("Form elements missing.");
        return;
    }
    var nameValid = nameError(userName);
    var emailValid = emailError(userEmail);
    var dateValid = dateError(userBirthDate);
    var passwordValid = passwordInputError();
    if (nameValid && emailValid && dateValid && passwordValid) {
        var allUsersJson = JSON.parse(localStorage.getItem("users") || "[]").map(function (user) { return new CreateUser(user.userName, user.userEmail, user.userBirthDate, user.userPassword, user.userRole); });
        var newUser = new CreateUser(userName.value, userEmail.value, userBirthDate.value, userPassword.value);
        allUsersJson.push(newUser); // Push `CreateUser` instance
        localStorage.setItem("users", JSON.stringify(allUsersJson.map(function (user) { return user.toPlainObject(); })));
        alert("Account created...!");
        window.location.href = "../index.html";
    }
    else {
        alert("Please correct the errors in the form.");
    }
}
// By Default Add Admin User
window.addEventListener('load', function () {
    var allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
    if (allUsersJson.length === 0) {
        var adminUser = new CreateUser('Akash', 'akashkce123@gmail.com', '2003-10-09', 'Akash@2003', 'admin');
        localStorage.setItem("users", JSON.stringify([adminUser.toPlainObject()]));
    }
    // Attach event listeners
    var userNameInput = document.getElementById('user-name');
    var userEmailInput = document.getElementById('user-mail');
    var userBirthDateInput = document.getElementById('user-birth-date');
    var confirmPasswordInput = document.getElementById('confirm-password');
    var signupButton = document.querySelector('.signup-btn button');
    if (userNameInput && userEmailInput && userBirthDateInput && confirmPasswordInput && signupButton) {
        userNameInput.addEventListener('blur', function () { return nameError(userNameInput); });
        userEmailInput.addEventListener('blur', function () { return emailError(userEmailInput); });
        userBirthDateInput.addEventListener('blur', function () { return dateError(userBirthDateInput); });
        confirmPasswordInput.addEventListener('blur', passwordInputError);
        signupButton.addEventListener('click', addUser);
    }
});
