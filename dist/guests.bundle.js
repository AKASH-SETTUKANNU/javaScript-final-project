/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*************************!*\
  !*** ./guests/guest.ts ***!
  \*************************/

// Get menu elements
const menu = document.querySelector('menu');
const menuIcon = document.querySelector('#menu-icon');
const addEventArea = document.getElementById("event-add-block");
const notificationArea = document.getElementById("notification-display");
const logoutArea = document.getElementById("profile-edit-area");
// Menu display function
function menubarDisplay() {
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
        addEventArea.style.display = 'none';
        notificationArea.style.display = 'none';
        logoutArea.style.display = 'none';
    }
    else {
        menu.style.display = 'none';
    }
}
// Add event function
function addEvent() {
    window.location.href = "../events/events.html";
}
// Notification display function
function displayNotification() {
    if (notificationArea.style.display === 'none' || notificationArea.style.display === '') {
        notificationArea.style.display = 'block';
        addEventArea.style.display = 'none';
        logoutArea.style.display = 'none';
    }
    else {
        notificationArea.style.display = 'none';
    }
}
// Logout display function
function displayLogout() {
    if (logoutArea.style.display === 'none' || logoutArea.style.display === '') {
        logoutArea.style.display = 'flex';
        addEventArea.style.display = 'none';
        notificationArea.style.display = 'none';
    }
    else {
        logoutArea.style.display = 'none';
    }
}
// Guest form elements
const guestName = document.getElementById("guest-name");
const guestEmail = document.getElementById("guest-email");
const guestLocation = document.getElementById("guest-location");
const guestNumber = document.getElementById("guest-number");
// Guest validation functions
function guestNameCheck() {
    const name = guestName.value.trim();
    const nameError = document.getElementById("name-error");
    if (name === '') {
        nameError.innerHTML = "Enter a name...";
        return false;
    }
    else {
        nameError.innerHTML = "";
        return true;
    }
}
function guestEmailCheck() {
    const email = guestEmail.value.trim();
    const emailError = document.getElementById("email-error");
    const allGuests = JSON.parse(localStorage.getItem("guests") || "[]");
    const foundGuest = allGuests.find((guest) => guest.guestEmail === email);
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
function guestLocationCheck() {
    const location = guestLocation.value.trim();
    const locationError = document.getElementById("location-error");
    if (location === '') {
        locationError.innerHTML = "Enter a Guest Location...";
        return false;
    }
    else {
        locationError.innerHTML = "";
        return true;
    }
}
function guestNumberCheck() {
    const number = guestNumber.value.trim();
    const numberError = document.getElementById("number-error");
    if (number === '') {
        numberError.innerHTML = "Enter a Guest Number...";
        return false;
    }
    else if (isNaN(Number(number))) {
        numberError.innerHTML = "Enter a valid Number...";
        return false;
    }
    else {
        numberError.innerHTML = "";
        return true;
    }
}
// Guest constructor
class Guest {
    constructor(name, email, location) {
        this.guestName = name;
        this.guestEmail = email;
        this.guestLocation = location;
    }
}
// Load guests from local storage and display them
function loadGuests() {
    const allGuests = JSON.parse(localStorage.getItem("guests") || "[]");
    allGuests.forEach((guest) => {
        addGuestToTable(guest);
    });
}
function loadallGuests() {
    const allGuests = JSON.parse(localStorage.getItem("guests") || "[]");
    const guestTable = document.getElementById("guest-table");
    if (guestTable) {
        allGuests.forEach((guest) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${guest.guestName}</td>
                <td>${guest.guestEmail}</td>
                <td>${guest.guestLocation}</td>
                <td><button class="invite-btn">Invite</button></td>
                <td><button class="delete-btn" data-name="${guest.guestEmail}">Delete</button></td>
            `;
            guestTable.appendChild(tr);
        });
    }
    else {
        console.error("Table element not found");
    }
}
// Add guest to the table
function addGuestToTable(guest) {
    const guestTable = document.getElementById("guest-table");
    const tableData = `
        <tr>
            <td>${guest.guestName}</td>
            <td>${guest.guestEmail}</td>
            <td>${guest.guestLocation}</td>
            <td><button  id="invite-btn">Invite</button></td>
            <td><button  id="delete-btn" data-name="${guest.guestEmail}">Delete</button></td>
        </tr>`;
    guestTable.innerHTML += tableData;
    const deleteButtonElement = document.querySelector(`button[data-name="${guest.guestEmail}"]`);
    if (deleteButtonElement) {
        deleteButtonElement.addEventListener("click", () => deleteGuest(guest.guestEmail));
    }
    else {
        console.error("Button with the specified data-name not found.");
    }
}
// Add guest to local storage and table
function addGuest(event) {
    event.preventDefault();
    const message = document.getElementById("success-message");
    const errorMessage = document.getElementById("name-error");
    if (guestNameCheck() && guestEmailCheck() && guestLocationCheck()) {
        const newGuest = new Guest(guestName.value, guestEmail.value, guestLocation.value);
        // Save guest to local storage
        const allGuests = JSON.parse(localStorage.getItem("guests") || "[]");
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
    }
    else {
        errorMessage.innerHTML = "Enter all the Mandatory Fields..";
        message.innerHTML = "";
    }
}
// Find guest using email id
function findGuest(event) {
    event.preventDefault();
    const findMailElement = document.getElementById("find-guest-email");
    const findMailValue = findMailElement.value.trim();
    const resultMessage = document.getElementById("result-guest-error");
    const searchDisplayArea = document.getElementById("display-search-guest");
    const resultTableBody = document.getElementById("result-guest");
    resultTableBody.innerHTML = "";
    if (findMailValue) {
        const allGuests = JSON.parse(localStorage.getItem("guests") || "[]");
        const foundGuest = allGuests.find((guest) => guest.guestEmail === findMailValue);
        if (foundGuest) {
            searchDisplayArea.style.display = "block";
            resultMessage.innerHTML = "";
            const tableData = `
                <tr>
                    <td>${foundGuest.guestName}</td>
                    <td>${foundGuest.guestEmail}</td>
                    <td>${foundGuest.guestLocation}</td>
                    <td><button onclick="inviteGuest('${foundGuest.guestEmail}', '${foundGuest.guestName}')" id="invite-btn">Invite</button></td>
                    <td><button onclick="deleteGuest('${foundGuest.guestEmail}')" id="delete-btn">Delete</button></td>
                </tr>`;
            resultTableBody.innerHTML = tableData;
        }
        else {
            resultMessage.style.color = "red";
            resultMessage.innerHTML = "No guest found with this email.";
            setTimeout(() => {
                resultMessage.innerHTML = "";
            }, 3000);
        }
    }
    else {
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
    const allGuests = JSON.parse(localStorage.getItem("guests") || "[]");
    const index = allGuests.findIndex((guest) => guest.guestEmail === email);
    if (index > -1) {
        allGuests.splice(index, 1);
        localStorage.setItem("guests", JSON.stringify(allGuests));
        // Remove the guest row from the guest table
        const guestTable = document.getElementById("guest-table");
        if (guestTable) {
            const rows = guestTable.querySelectorAll('tr');
            rows.forEach(row => {
                const emailCell = row.querySelector('td:nth-child(2)');
                if (emailCell && emailCell.textContent === email) {
                    row.remove();
                }
            });
        }
        // Remove the guest row from the search result table
        const searchResultTable = document.getElementById("result-guest");
        if (searchResultTable) {
            const searchResultRows = searchResultTable.querySelectorAll('tr');
            searchResultRows.forEach(row => {
                const emailCell = row.querySelector('td:nth-child(2)');
                if (emailCell && emailCell.textContent === email) {
                    row.remove();
                    const displaySearchGuest = document.getElementById("display-search-guest");
                    if (displaySearchGuest) {
                        displaySearchGuest.style.display = "none";
                    }
                }
            });
        }
        alert("Guest deleted!");
    }
    else {
        console.error("Guest with this email not found.");
    }
}
const addGuestBtn = document.getElementById("add-guest-btn");
const findGuestBtn = document.getElementById("find-user-btn");
const eventAddBtn = document.getElementById("event-add-btn");
const notificationBell = document.getElementById("notification-bell");
document.addEventListener("DOMContentLoaded", () => {
    // Adding blur event listeners to form fields for validation
    guestName.addEventListener("blur", guestNameCheck);
    guestEmail.addEventListener("blur", guestEmailCheck);
    guestLocation.addEventListener("blur", guestLocationCheck);
    if (addGuestBtn) {
        // Only one event listener assigned here
        addGuestBtn.addEventListener("click", addGuest);
    }
    // Assign findGuest to the correct button
    if (findGuestBtn) {
        findGuestBtn.addEventListener("click", findGuest);
    }
    loadallGuests();
    loadUserProfile();
    // Event listeners for UI elements
    if (menuIcon)
        menuIcon.addEventListener("click", menubarDisplay);
    if (eventAddBtn)
        eventAddBtn.addEventListener("click", addEvent);
    if (notificationBell)
        notificationBell.addEventListener("click", displayNotification);
});
// Function to load and display user profile details
function loadUserProfile() {
    const usersJson = localStorage.getItem("users");
    const allUsersJson = usersJson ? JSON.parse(usersJson) : [];
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (loggedInUserEmail) {
        const filteredUsers = allUsersJson.filter((user) => user.userEmail === loggedInUserEmail);
        const user = filteredUsers.length > 0 ? filteredUsers[0] : undefined;
        console.log("Logged In User Email:", loggedInUserEmail);
        console.log("User Object:", user);
        const profileName = document.getElementById("profile-name");
        const dateOfBirth = document.getElementById("profile-dateOfBirth");
        if (user) {
            if (profileName && dateOfBirth) {
                profileName.innerText = user.userName;
                dateOfBirth.innerText = user.userBirthDate;
            }
            else {
                console.error("Profile elements not found.");
            }
        }
        else {
            console.error("User not found in localStorage.");
        }
    }
    else {
        console.error("No logged-in user email found.");
    }
}

/******/ })()
;
//# sourceMappingURL=guests.bundle.js.map