let email = document.getElementById("user-mail");
let password = document.getElementById("user-password");
let mailError = document.getElementById("email-error");
let passwordError = document.getElementById("password-error");

//handel email error here
function emailErrorHandel() {
   if (email.value.trim() === '') {
      mailError.textContent = "Please enter your Email...";
      return false;
   } else if (!emailExistornot()) { 
      mailError.textContent = "User not exist, please signup...";
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

//check pass password in local storage match or not
function passWordMatch() {
   let users = JSON.parse(localStorage.getItem("users") || "[]");
   let user = users.find((user) => user.userEmail === email.value); 
   if (user) {
      return user.userPassword === password.value; 
   }
   return false;
}

//password error handel
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

//login user if login button tiger
function loginUser(event) {
   event.preventDefault(); 

   if (emailErrorHandel() && passwordErrorHandel()) { 
       let email = document.getElementById('user-mail').value.trim();
       let users = JSON.parse(localStorage.getItem("users") || "[]");
       let user = users.find(user => user.userEmail === email); 

       if (user) {
           localStorage.setItem("loggedInUserEmail", email);

           let name = user.userName;
           alert(`Welcome, ${name}!`);
           window.location.href = "index.html";
       } else {
           alert("Invalid email or password.");
       }
   }
}

