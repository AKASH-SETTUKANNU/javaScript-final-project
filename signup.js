// name error show
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

// DateofBirth error show
function dateError(event) {
    let input = event.value.trim();
    let error = document.getElementById('date-error');
    if (input === '') {
        error.innerText = "Enter a Date of birth..";
        return false;
    } else {
        error.innerText = "";
        return true; 
    }
}

// email error show
function emailError(event) {
    let input = event.value.trim();
    let error = document.getElementById('email-error');

    let alluser = localStorage.getItem("users");
    let allUsersJson = JSON.parse(alluser || "[]");

    // Function to check if the email exists
    function emailExistornot() {
        return allUsersJson.some((user) => user.userEmail === input);
    }

    if (input === '') {
        error.innerText = "Enter a Email..";
        return false; 
    } else if (emailExistornot()) { 
        error.innerText = "Email already Exists..";
        return false; 
    } else {
        error.innerText = "";
        return true; 
    }
}

//password error show
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

//create user object 
class createUser {
    constructor(userName, userEmail, userbirthDate, userPassword) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userbirthDate = userbirthDate;
        this.userPassword = userPassword;
    }

    displaydata() {
        console.log(`Name: ${this.userName}`);
        console.log(`Email: ${this.userEmail}`);
        console.log(`Date of Birth: ${this.userbirthDate}`);
        console.log(`password: ${this.userPassword}`);
    }

    toPlainObject() {
        return {
            userName: this.userName,
            userEmail: this.userEmail,
            userBirthDate: this.userbirthDate,
            userPassword: this.userPassword
        };
    }
}

//adduser in localstorage
function addUser(event) {
    event.preventDefault();
    let userName = document.getElementById('user-name');
    let userEmail = document.getElementById('user-mail');
    let userbirthDate = document.getElementById('user-birth-date');
    let userPassword = document.getElementById("user-password");

    // Validate all fields
    const nameValid = nameError(userName);
    const emailValid = emailError(userEmail);
    const dateValid = dateError(userbirthDate);
    const passwordValid = passwordInputError();

    if (nameValid && emailValid && dateValid && passwordValid) {
        let newUser = new createUser(userName.value, userEmail.value, userbirthDate.value, userPassword.value);
        newUser.displaydata();

        let newUserObject = newUser.toPlainObject();
        let allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
        allUsersJson.push(newUserObject);
        localStorage.setItem("users", JSON.stringify(allUsersJson));
        alert("Account created...!");
        window.location.href = "login.html";
    } else {
        alert("Please correct the errors in the form.");
    }
}
