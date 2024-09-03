// Name Error Validation
function nameError(event) {
    let input = event.value.trim();
    let error = document.getElementById('name-error');
    if (input === '') {
        error.innerText = "Enter a name..";
        return false;
    } else {
        error.innerText = "";
        return true; 
    }
}

// Date of Birth Error Validation
function dateError(event) {
    let input = event.value.trim();
    let error = document.getElementById('date-error');
    if (input === '') {
        error.innerText = "Enter a Date of Birth..";
        return false;
    } else {
        error.innerText = "";
        return true; 
    }
}

// Email Error Validation
function emailError(event) {
    let input = event.value.trim();
    let error = document.getElementById('email-error');

    let alluser = localStorage.getItem("users");
    let allUsersJson = JSON.parse(alluser || "[]");

    function emailExistornot() {
        return allUsersJson.some((user) => user.userEmail === input);
    }

    if (input === '') {
        error.innerText = "Enter an Email..";
        return false; 
    } else if (emailExistornot()) { 
        error.innerText = "Email already Exists..";
        return false; 
    } else {
        error.innerText = "";
        return true; 
    }
}

// Password Error Validation
function passwordInputError() {
    let password = document.querySelector('.user-password').value.trim();
    let confirmPassword = document.querySelector('.confirm-password').value.trim();
    let errorElement = document.getElementById('password-error');

    if (password !== confirmPassword) {
        errorElement.innerText = "Passwords do not match";
        return false; 
    } else {
        errorElement.innerText = "";
        return true; 
    }
}

// Create User Object
class createUser {
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
    let userName = document.getElementById('user-name');
    let userEmail = document.getElementById('user-mail');
    let userBirthDate = document.getElementById('user-birth-date');
    let userPassword = document.getElementById('user-password');

    const nameValid = nameError(userName);
    const emailValid = emailError(userEmail);
    const dateValid = dateError(userBirthDate);
    const passwordValid = passwordInputError();

    if (nameValid && emailValid && dateValid && passwordValid) {
        let allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");

        let newUser = new createUser(userName.value, userEmail.value, userBirthDate.value, userPassword.value);
        allUsersJson.push(newUser.toPlainObject());
        localStorage.setItem("users", JSON.stringify(allUsersJson));
        alert("Account created...!");
        window.location.href = "login.html";
    } else {
        alert("Please correct the errors in the form.");
    }
}

// By Default Add Admin User
window.addEventListener('load', () => {
    let allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
    if (allUsersJson.length === 0) {
        let adminUser = new createUser('Admin', 'akashkce123@gmail.com', '2003-10-09', 'Akash@2003', 'admin');
        localStorage.setItem("users", JSON.stringify([adminUser.toPlainObject()]));
    }
});
