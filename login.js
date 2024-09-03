// Elements
let email = document.getElementById("user-mail");
let password = document.getElementById("user-password");
let mailError = document.getElementById("email-error");
let passwordError = document.getElementById("password-error");

// Handle email error
function emailErrorHandel() {
   if (email.value.trim() === '') {
      mailError.textContent = "Please enter your Email...";
      return false;
   } else if (!emailExistornot()) { 
      mailError.textContent = "User does not exist, please sign up...";
      return false;
   } else {
      mailError.textContent = "";
      return true;
   }
}

// Function to check if the email exists
function emailExistornot() {
   let users = JSON.parse(localStorage.getItem("users") || "[]");
   return users.some((user) => user.userEmail === email.value); 
}

// Check if password in local storage matches or not
function passWordMatch() {
   let users = JSON.parse(localStorage.getItem("users") || "[]");
   let user = users.find((user) => user.userEmail === email.value); 
   if (user) {
      return user.userPassword === password.value; 
   }
   return false;
}

// Handle password error
function passwordErrorHandel() {
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
function loginUser(event) {
   event.preventDefault(); 

   if (emailErrorHandel() && passwordErrorHandel()) { 
       let emailValue = email.value.trim();
       let users = JSON.parse(localStorage.getItem("users") || "[]");
       let user = users.find(user => user.userEmail === emailValue); 

       if (user) {
         let name = user.userName;
         // Store logged-in user email in localStorage
         localStorage.setItem("loggedInUserEmail", emailValue);

         if (user.userRole === 'admin') {
             window.location.href = "adminIndex.html";
         } else {
             alert(`Welcome, ${name}!`);
             window.location.href = "index.html";
         }
       } else {
           alert("Invalid email or password.");
       }
   }
}

