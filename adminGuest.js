// Menu display area
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

// Add event display area
let addEventArea = document.getElementById("event-add-block");

function addEvent() {
    window.location.href = "events.html";
}

// Notification display area
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

// Profile logout popup area
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

// Get data from user to store in table
let guestName = document.getElementById("guest-name");
let guestEmail = document.getElementById("guest-email");
let guestLocation = document.getElementById("guest-location");
let guestNumber = document.getElementById("guest-number");

// Guest name error check
function guestNameCheck() {
    let name = guestName.value.trim();
    let nameError = document.getElementById("name-error");
    if (name === '') {
        nameError.innerHTML = "Enter a name...";
        return false;
    } else {
        nameError.innerHTML = "";
        return true;
    }
}

// Guest email error check
function guestEmailCheck() {
    let email = guestEmail.value.trim();
    let emailError = document.getElementById("email-error");
    let allGuests = JSON.parse(localStorage.getItem("guests") || "[]");
    let foundGuest = allGuests.find(guest => guest.guestEmail === email);
    if (email === '') {
        emailError.innerHTML = "Enter an Email...";
        return false;
    } else if (foundGuest) {
        emailError.innerHTML = "Guest Already exists...";
        return false;
    } else {
        emailError.innerHTML = "";
        return true;
    }
}

// Guest location error check
function guestLocationCheck() {
    let location = guestLocation.value.trim();
    let locationError = document.getElementById("location-error");
    if (location === '') {
        locationError.innerHTML = "Enter a Guest Location...";
        return false;
    } else {
        locationError.innerHTML = "";
        return true;
    }
}

// Guest contact number error check
function guestNumberCheck() {
    let number = guestNumber.value.trim();
    let numberError = document.getElementById("number-error");
    if (number === '') {
        numberError.innerHTML = "Enter a Guest Number...";
        return false;
    } else if (isNaN(number)) {
        numberError.innerHTML = "Enter a valid Number...";
        return false;
    } else {
        numberError.innerHTML = "";
        return true;
    }
}

// Guest Constructor
function Guest(name, email, location) {
    this.guestName = name;
    this.guestEmail = email;
    this.guestLocation = location;
}

// Load guests from local storage and display them
function loadGuests() {
    let allGuests = JSON.parse(localStorage.getItem("guests") || "[]");
    allGuests.forEach(guest => {
        addGuestToTable(guest);
    });
}

// Add guest to the table
function addGuestToTable(guest) {
    let guestTable = document.getElementById("guest-table");
    let tableData = `<tr>
                        <td>${guest.guestName}</td>
                        <td>${guest.guestEmail}</td>
                        <td>${guest.guestLocation}</td>
                        <td><button onclick="inviteGuest('${guest.guestEmail}', '${guest.guestName}')" id="invite-btn">Invite</button></td>
                        <td><button onclick="deleteGuest('${guest.guestEmail}')" id="delete-btn">Delete</button></td>
                      </tr>`;
    guestTable.innerHTML += tableData;
}

// Add guest to local storage and table
function addGuest(event) {
    event.preventDefault();
    let message = document.getElementById("success-message");
    let errormessage = document.getElementById("name-error");

    if (guestNameCheck() && guestEmailCheck() && guestLocationCheck()) {
        const newGuest = new Guest(guestName.value, guestEmail.value, guestLocation.value);

        // Save guest to local storage
        let allGuests = JSON.parse(localStorage.getItem("guests") || "[]");
        allGuests.push(newGuest);
        localStorage.setItem("guests", JSON.stringify(allGuests));

        // Add guest to table
        addGuestToTable(newGuest);

        // Clear form fields
        guestName.value = "";
        guestEmail.value = "";
        guestLocation.value = "";

        message.innerHTML = "Guest added successfully...";
        setTimeout(() => {
            message.innerHTML = "";
        }, 3000);
    } else {
        errormessage.innerHTML = "Enter all the Mandatory Fields..";
        message.innerHTML = "";
    }
}

// Find guest using email id
function findGuest(event) {
    event.preventDefault();

    let findMailElement = document.getElementById("find-guest-email");
    let findMailValue = findMailElement.value.trim();
    let resultMessage = document.getElementById("result-guest-error");
    let searchDisplayArea = document.getElementById("display-search-guest");
    let resultTableBody = document.getElementById("result-guest");
    resultTableBody.innerHTML = "";

    if (findMailValue) {
        let allGuests = JSON.parse(localStorage.getItem("guests") || "[]");
        let foundGuest = allGuests.find(guest => guest.guestEmail === findMailValue);

        if (foundGuest) {
            searchDisplayArea.style.display = "block";
            resultMessage.innerHTML = "";

            let tableData = `<tr>
                                <td>${foundGuest.guestName}</td>
                                <td>${foundGuest.guestEmail}</td>
                                <td>${foundGuest.guestLocation}</td>
                                <td><button onclick="inviteGuest('${foundGuest.guestEmail}', '${foundGuest.guestName}')" id="invite-btn">Invite</button></td>
                                <td><button onclick="deleteGuest('${foundGuest.guestEmail}')" id="delete-btn">Delete</button></td>
                             </tr>`;
            resultTableBody.innerHTML = tableData;

        } else {
            resultMessage.style.color = "red";
            resultMessage.innerHTML = "No guest found with this email.";
            setTimeout(() => {
                resultMessage.innerHTML = "";
            }, 3000);
        }

    } else {
        resultMessage.style.color = "red";
        resultMessage.innerHTML = "Please enter an email to search.";
        setTimeout(() => {
            resultMessage.innerHTML = "";
        }, 3000);
    }

    findMailElement.value = "";
}

// Delete guest
function deleteGuest(email) {
    let allGuests = JSON.parse(localStorage.getItem("guests") || "[]");
    const index = allGuests.findIndex(guest => guest.guestEmail === email);
    if (index > -1) {
        allGuests.splice(index, 1);
        localStorage.setItem("guests", JSON.stringify(allGuests));

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
        let displayguestSearch = document.getElementById("display-search-guest");
        searchResultRows.forEach(row => {
            const emailCell = row.querySelector('td:nth-child(2)');
            if (emailCell && emailCell.textContent === email) {
                row.remove();
                displayguestSearch.style.display = "none";
            }
        });

        alert("Guest deleted!");
    }
}

// Call loadGuests on page load to display all guests from local storage
document.addEventListener("DOMContentLoaded", () => {
    loadGuests();
});

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
    loadGuests();
    loadUserProfile();
});
