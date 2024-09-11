// Elements
const email = document.getElementById("user-mail") as HTMLInputElement;
const password = document.getElementById("user-password") as HTMLInputElement;
const mailError = document.getElementById("email-error") as HTMLSpanElement;
const passwordError = document.getElementById("password-error") as HTMLSpanElement;

// Handle email error
function emailErrorHandel(): boolean {
    const emailValue = email.value.trim();
    if (emailValue === '') {
        mailError.textContent = "Please enter your Email...";
        return false;
    } else if (!emailExistornot(emailValue)) { 
        mailError.textContent = "User does not exist, please sign up...";
        return false;
    } else {
        mailError.textContent = "";
        return true;
    }
}

// Function to check if the email exists
function emailExistornot(emailValue: string): boolean {
    const users: { userEmail: string; userPassword: string }[] = JSON.parse(localStorage.getItem("users") || "[]");
    // Log users and the email being checked
    console.log('Users:', users);
    console.log('Checking email:', emailValue);
    return users.some(user => user.userEmail.trim() === emailValue); 
}

// Check if password in local storage matches or not
function passWordMatch(): boolean {
    const emailValue = email.value.trim();
    const users: { userEmail: string; userPassword: string }[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(user => user.userEmail.trim() === emailValue); 
    // Log user and password
    console.log('Found user:', user);
    return user ? user.userPassword === password.value : false;
}

// Handle password error
function passwordErrorHandel(): boolean {
    if (password.value.trim() === '') {
        passwordError.textContent = "Please enter your password...";
        return false;
    } else if (!passWordMatch()) { 
        passwordError.textContent = "Password does not match...";
        return false;
    } else {
        passwordError.textContent = "";
        return true;
    }
}

// Login user if login button is triggered
function loginUser(event: Event): void {
    event.preventDefault(); 

    if (emailErrorHandel() && passwordErrorHandel()) { 
        const emailValue = email.value.trim();
        const users: { userName: string; userEmail: string; userPassword: string; userRole: string }[] = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(user => user.userEmail.trim() === emailValue); 

        if (user) {
            const name = user.userName;
            
            localStorage.setItem("loggedInUserEmail", emailValue);

            if (user.userRole === 'admin') {
                window.location.href = "./adminIndex/adminIndex.html";
            } else {
                alert(`Welcome, ${name}!`);
                window.location.href = "./guestIndex/guestIndex.html";
            }
        } else {
            alert("Invalid email or password.");
        }
    }
}

// Add event listeners when the window loads
window.addEventListener('load', () => {
    // Attach event listeners
    const emailInput = document.getElementById('user-mail') as HTMLInputElement;
    const passwordInput = document.getElementById('user-password') as HTMLInputElement;
    const loginButton = document.querySelector('.login-btn button') as HTMLButtonElement;

    if (emailInput && passwordInput && loginButton) {
        emailInput.addEventListener('blur', emailErrorHandel);
        passwordInput.addEventListener('blur', passwordErrorHandel);
        loginButton.addEventListener('click', loginUser);
    }
});
