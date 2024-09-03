// menu display area
let menu = document.querySelector('menu');
let menuIcon = document.querySelector('#menu-icon');


function menubarDisplay() {
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
        addEventArea.style.display = 'none';
        notificationArea.style.display = 'none';
        logoutArea.style.display = 'none';
    } else {
        menu.style.display = 'none';
    }
}


// addevent display area
let addEventArea = document.getElementById("event-add-block");

function addEvent() {
    window.location.href = "events.html";
    // if (addEventArea.style.display === 'none' || addEventArea.style.display === '') {
    //     addEventArea.style.display = 'block';
    //     notificationArea.style.display = 'none';  
    //     logoutArea.style.display = 'none'; 
    // } else {
    //     addEventArea.style.display = 'none'; 
    // }
}

// notification display area
let notificationArea = document.getElementById("notification-display");

function displayNotification() {
    if (notificationArea.style.display === 'none' || notificationArea.style.display === '') {
        notificationArea.style.display = 'block';
        addEventArea.style.display = 'none';
        logoutArea.style.display = 'none';
    } else {
        notificationArea.style.display = 'none';
    }
}

// profile logout popup area
let logoutArea = document.getElementById("profile-edit-area");

function displayLogout() {
    if (logoutArea.style.display === 'none' || logoutArea.style.display === '') {
        logoutArea.style.display = 'flex';
        addEventArea.style.display = 'none';
        notificationArea.style.display = 'none';
    } else {
        logoutArea.style.display = 'none';
    }
}

//get data from user to store in table 

let guestName = document.getElementById("guest-name");
let guestEmail = document.getElementById("guest-email");
let guestLocation = document.getElementById("guest-location");
let guestNumber = document.getElementById("guest-number");

//guest name error check
function guestNameCheck() {
    let name = guestName.value.trim();
    let nameError = document.getElementById("name-error");
    if (name === '') {
        nameError.innerHTML = "Enter a name..."
        return false;
    }
    else {
        nameError.innerHTML = ""
        return true;
    }
}

//guest email  error check
function guestEmailCheck() {
    let email = guestEmail.value.trim();
    let emailError = document.getElementById("email-error");
    let foundGuest = allGuest.find(guest => guest.guestEmail === email);
    if (email === '') {
        emailError.innerHTML = "Enter an Email...";
        return false;
    }
    else if (foundGuest) {
        emailError.innerHTML = "Guest Already exists...";
        return false;
    }
    else {
        emailError.innerHTML = "";
        return true;
    }
}


//guest location  error check
function guestLocationCheck() {
    let location = guestLocation.value.trim();
    let locationError = document.getElementById("location-error");
    if (location === '') {
        locationError.innerHTML = "Enter a Guest Location..."
        return false;
    }
    else {
        locationError.innerHTML = "";
        return true;
    }
}

//guest contact number  error check
function guestNumberCheck() {
    let number = guestNumber.value.trim();
    let numberError = document.getElementById("number-error");
    if (number === '') {
        numberError.innerHTML = "Enter a Guest Number..."
        return false;
    }
    else if (isNaN(number)) {
        numberError.innerHTML = "Enter a valid Number..."
        return false;
    }
    else {
        numberError.innerHTML = "";
        return true;
    }
}

//add guest object for store in array
const allGuest = [];
function Guest(name, email, location, number) {
    this.guestName = name;
    this.guestEmail = email;
    this.guestLocation = location;
    // this.guestNumber = number;
}




//add guest in table


function addGuest(event) {
    event.preventDefault();
    let message = document.getElementById("success-message");
    let errormessage = document.getElementById("name-error");
    if (guestNameCheck() && guestEmailCheck() && guestLocationCheck()) {
        const newGuest = new Guest(guestName.value, guestEmail.value, guestLocation.value);
        allGuest.push(newGuest);
        let guestTable = document.getElementById("guest-table");
        let tableData = ` <tr>
                            <td>${guestName.value}</td>
                            <td>${guestEmail.value}</td>
                            <td>${guestLocation.value}</td>
                            <td><button onclick="inviteGuest()" id="invite-btn">Invite</button></td>
                            <td><button onclick="deleteGuest('${guestEmail.value}')" id="delete-btn">Delete</button></td>
                          </tr>`;
        guestTable.innerHTML += tableData;
        guestName.value = "";
        guestEmail.value = "";
        guestLocation.value = "";
        message.innerHTML = "Guest added successfully...";
        setTimeout(function () {
            message.innerHTML = "";
        }, 3000);
    } else {
        errormessage.innerHTML = "Enter all the Mandatory Fields..";
        message.innerHTML = "";
    }
}


// emailjs.init("3lfc4E2nm0ohLKKCU"); 


// function inviteGuest(guestEmail, guestName) {
//     const templateParams = {
//         to_name: guestName,
//         from_name: "Your Name", 
//         message: "You have been invited to an event!",
//         reply_to: guestEmail
//     };

//     emailjs.send("service_f0ad9dr", "i7yn4sf", templateParams)
//         .then(function(response) {
//             console.log("Email sent successfully:", response);
//             alert("Invitation sent!");
//         }, function(error) {
//             console.error("Failed to send email:", error);
//             alert("Failed to send invitation. Please check the console for more details.");
//         });
// }



// Example function to add a guest and send an invitation
function addGuest(event) {
    event.preventDefault();
    let message = document.getElementById("success-message");
    let errormessage = document.getElementById("name-error");
    if (guestNameCheck() && guestEmailCheck() && guestLocationCheck()) {
        const newGuest = new Guest(guestName.value, guestEmail.value, guestLocation.value);
        allGuest.push(newGuest);
        let guestTable = document.getElementById("guest-table");
        let tableData = ` <tr>
                            <td>${guestName.value}</td>
                            <td>${guestEmail.value}</td>
                            <td>${guestLocation.value}</td>
                            <td><button onclick="inviteGuest('${guestEmail.value}', '${guestName.value}')" id="invite-btn">Invite</button></td>
                            <td><button onclick="deleteGuest('${guestEmail.value}')" id="delete-btn">Delete</button></td>
                          </tr>`;
        guestTable.innerHTML += tableData;
        guestName.value = "";
        guestEmail.value = "";
        guestLocation.value = "";
        message.innerHTML = "Guest added successfully...";
        setTimeout(function () {
            message.innerHTML = "";
        }, 3000);
    } else {
        errormessage.innerHTML = "Enter all the Mandatory Fields..";
        message.innerHTML = "";
    }
}



// find guest using email id
function findGuest(event) {
    event.preventDefault();

    let findMailElement = document.getElementById("find-guest-email");
    let findMailValue = findMailElement.value.trim();
    let resultMessage = document.getElementById("result-guest-error");
    let searchDisplayArea = document.getElementById("display-search-guest");
    let resultTableBody = document.getElementById("result-guest");
    resultTableBody.innerHTML = "";

    if (findMailValue) {
        let foundGuest = allGuest.find(guest => guest.guestEmail === findMailValue);

        if (foundGuest) {
            searchDisplayArea.style.display = "block";
            resultMessage.innerHTML = "";

            let tableData = `<tr>
                                <td>${foundGuest.guestName}</td>
                                <td>${foundGuest.guestEmail}</td>
                                <td>${foundGuest.guestLocation}</td>
                                <td><button onclick="inviteGuest('${foundGuest.guestEmail}')" id="invite-btn">Invite</button></td>
                                <td><button onclick="deleteGuest('${foundGuest.guestEmail}')" id="delete-btn">Delete</button></td>
                             </tr>`;
            resultTableBody.innerHTML = tableData;

        } else {
            resultMessage.style.color = "red";
            resultMessage.innerHTML = "No guest found with this email.";
            setTimeout(function () {
                resultMessage.innerHTML = "";
            }, 3000);
        }

    } else {
        resultMessage.style.color = "red";
        resultMessage.innerHTML = "Please enter an email to search.";
        setTimeout(function () {
            resultMessage.innerHTML = "";
        }, 3000);
    }

    findMailElement.value = "";
}




// delete the guest 
function deleteGuest(email) {

    const index = allGuest.findIndex(guest => guest.guestEmail === email);
    if (index > -1) {
        allGuest.splice(index, 1);
    }
    
    // Remove the guest row from the guest table
    const rows = document.querySelectorAll('#guest-table tr');
    rows.forEach(row => {
        const emailCell = row.querySelector('td:nth-child(2)');
        if (emailCell && emailCell.textContent === email) {
            row.remove();
        }
    });
    
    // Remove the guest row from the search result table
    const searchResultRows = document.querySelectorAll('#result-guest tr');
    let displayguestSearch=document.getElementById("display-search-guest");
    searchResultRows.forEach(row => {
        const emailCell = row.querySelector('td:nth-child(2)');
        if (emailCell && emailCell.textContent === email) {
            row.remove();
            displayguestSearch.style="display:none;"
        }
    });
    
    alert("Guest deleted!");
}



// Function to load and display user profile details
function loadUserProfile() {
    let allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
    let loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    let user = allUsersJson.find(user => user.userEmail === loggedInUserEmail);

    console.log("Logged In User Email:", loggedInUserEmail); 
    console.log("User Object:", user); 

    let profileName = document.getElementById("profile-name");
    let dateOfBirth = document.getElementById("profile-dateOfBirth");

    if (user) {
        if (profileName && dateOfBirth) {
            profileName.innerText = user.userName;
            dateOfBirth.innerText = user.userBirthDate; 
        } else {
            console.error("Profile elements not found.");
        }
    } else {
        console.error("User not found in localStorage.");
    }
}

// Call functions on page load
document.addEventListener("DOMContentLoaded", () => {
    loadUserProfile();
});