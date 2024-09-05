// Name Error Validation
function nameError(event: HTMLInputElement): boolean {
    const input = event.value.trim();
    const error = document.getElementById('name-error') as HTMLSpanElement;
    if (input === '') {
        error.innerText = "Enter a name..";
        return false;
    } else {
        error.innerText = "";
        return true; 
    }
}

// Date of Birth Error Validation
function dateError(event: HTMLInputElement): boolean {
    const input = event.value.trim();
    const error = document.getElementById('date-error') as HTMLSpanElement;
    if (input === '') {
        error.innerText = "Enter a Date of Birth..";
        return false;
    } else {
        error.innerText = "";
        return true; 
    }
}

// Email Error Validation
function emailError(event: HTMLInputElement): boolean {
    const input = event.value.trim();
    const error = document.getElementById('email-error') as HTMLSpanElement;

    const allUsersJson: { userEmail: string }[] = JSON.parse(localStorage.getItem("users") || "[]");

    function emailExistornot(): boolean {
        return allUsersJson.some(user => user.userEmail === input);
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
function passwordInputError(): boolean {
    const password = (document.querySelector('.user-password') as HTMLInputElement).value.trim();
    const confirmPassword = (document.querySelector('.confirm-password') as HTMLInputElement).value.trim();
    const errorElement = document.getElementById('password-error') as HTMLSpanElement;

    if (password !== confirmPassword) {
        errorElement.innerText = "Passwords do not match";
        return false; 
    } else {
        errorElement.innerText = "";
        return true; 
    }
}

// Create User Object
class CreateUser {
    userName: string;
    userEmail: string;
    userBirthDate: string;
    userPassword: string;
    userRole: string;

    constructor(userName: string, userEmail: string, userBirthDate: string, userPassword: string, userRole: string = "user") {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userBirthDate = userBirthDate;
        this.userPassword = userPassword;
        this.userRole = userRole; 
    }

    displayData(): void {
        console.log(`Name: ${this.userName}`);
        console.log(`Email: ${this.userEmail}`);
        console.log(`Date of Birth: ${this.userBirthDate}`);
        console.log(`Password: ${this.userPassword}`);
        console.log(`Role: ${this.userRole}`);
    }

    toPlainObject(): { userName: string; userEmail: string; userBirthDate: string; userPassword: string; userRole: string } {
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
function addUser(event: Event): void {
    event.preventDefault();
    const userName = document.getElementById('user-name') as HTMLInputElement;
    const userEmail = document.getElementById('user-mail') as HTMLInputElement;
    const userBirthDate = document.getElementById('user-birth-date') as HTMLInputElement;
    const userPassword = document.getElementById('user-password') as HTMLInputElement;

    const nameValid = nameError(userName);
    const emailValid = emailError(userEmail);
    const dateValid = dateError(userBirthDate);
    const passwordValid = passwordInputError();

    if (nameValid && emailValid && dateValid && passwordValid) {
        const allUsersJson: CreateUser[] = JSON.parse(localStorage.getItem("users") || "[]").map((user: any) => new CreateUser(user.userName, user.userEmail, user.userBirthDate, user.userPassword, user.userRole));

        const newUser = new CreateUser(userName.value, userEmail.value, userBirthDate.value, userPassword.value);
        allUsersJson.push(newUser); // Push `CreateUser` instance
        localStorage.setItem("users", JSON.stringify(allUsersJson.map(user => user.toPlainObject())));
        alert("Account created...!");
        window.location.href = "../login/login.html";
    } else {
        alert("Please correct the errors in the form.");
    }
}


// By Default Add Admin User
window.addEventListener('load', () => {
    const allUsersJson: CreateUser[] = JSON.parse(localStorage.getItem("users") || "[]");
    if (allUsersJson.length === 0) {
        const adminUser = new CreateUser('Admin', 'akashkce123@gmail.com', '2003-10-09', 'Akash@2003', 'admin');
        localStorage.setItem("users", JSON.stringify([adminUser.toPlainObject()]));
    }
});
