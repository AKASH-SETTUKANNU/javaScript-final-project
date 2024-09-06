// Get menu elements
var menu = document.querySelector('menu');
var menuIcon = document.querySelector('#menu-icon');
var addEventArea = document.getElementById("event-add-block");
var notificationArea = document.getElementById("notification-display");
var logoutArea = document.getElementById("profile-edit-area");
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
var guestName = document.getElementById("guest-name");
var guestEmail = document.getElementById("guest-email");
var guestLocation = document.getElementById("guest-location");
var guestNumber = document.getElementById("guest-number");
// Guest validation functions
function guestNameCheck() {
    var name = guestName.value.trim();
    var nameError = document.getElementById("name-error");
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
    var email = guestEmail.value.trim();
    var emailError = document.getElementById("email-error");
    var allGuests = JSON.parse(localStorage.getItem("guests") || "[]");
    var foundGuest = allGuests.find(function (guest) { return guest.guestEmail === email; });
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
    var location = guestLocation.value.trim();
    var locationError = document.getElementById("location-error");
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
    var number = guestNumber.value.trim();
    var numberError = document.getElementById("number-error");
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
var Guest = /** @class */ (function () {
    function Guest(name, email, location) {
        this.guestName = name;
        this.guestEmail = email;
        this.guestLocation = location;
    }
    return Guest;
}());
// Add guest to the table
function addGuestToTable(guest) {
    var guestTable = document.getElementById("guest-table");
    if (guestTable) {
        var tableData = "\n            <tr data-email=\"".concat(guest.guestEmail, "\">\n                <td>").concat(guest.guestName, "</td>\n                <td>").concat(guest.guestEmail, "</td>\n                <td>").concat(guest.guestLocation, "</td>\n                <td><button class=\"invite-btn\">Invite</button></td>\n                <td><button class=\"delete-btn\" data-email=\"").concat(guest.guestEmail, "\">Delete</button></td>\n            </tr>");
        guestTable.innerHTML += tableData;
    }
    else {
        console.error("Guest table element not found.");
    }
}
// Load all guests and attach event delegation
function loadallGuests() {
    var allGuests = JSON.parse(localStorage.getItem("guests") || "[]");
    var guestTable = document.getElementById("guest-table");
    if (guestTable) {
        allGuests.forEach(function (guest) { return addGuestToTable(guest); });
        // Add event delegation for dynamic buttons
        guestTable.addEventListener("click", function (event) {
            var _a, _b;
            var target = event.target;
            if (target.classList.contains("delete-btn")) {
                var email = target.getAttribute("data-email") || "";
                deleteGuest(email);
            }
            else if (target.classList.contains("invite-btn")) {
                var row = target.closest("tr");
                var email = ((_a = row === null || row === void 0 ? void 0 : row.querySelector('td:nth-child(2)')) === null || _a === void 0 ? void 0 : _a.textContent) || "";
                var name_1 = ((_b = row === null || row === void 0 ? void 0 : row.querySelector('td:nth-child(1)')) === null || _b === void 0 ? void 0 : _b.textContent) || "";
                inviteGuest(email, name_1);
            }
        });
    }
    else {
        console.error("Guest table element not found.");
    }
}
// Invite guest function (Assumed placeholder implementation)
function inviteGuest(email, name) {
    console.log("Inviting guest ".concat(name, " with email ").concat(email));
}
// Add guest to local storage and table
function addGuest(event) {
    event.preventDefault();
    var message = document.getElementById("success-message");
    var errorMessage = document.getElementById("name-error");
    if (guestNameCheck() && guestEmailCheck() && guestLocationCheck()) {
        var newGuest = new Guest(guestName.value, guestEmail.value, guestLocation.value);
        // Save guest to local storage
        var allGuests = JSON.parse(localStorage.getItem("guests") || "[]");
        allGuests.push(newGuest);
        localStorage.setItem("guests", JSON.stringify(allGuests));
        // Add guest to table
        addGuestToTable(newGuest);
        // Clear form fields
        guestName.value = "";
        guestEmail.value = "";
        guestLocation.value = "";
        message.innerHTML = "Guest added successfully...";
        setTimeout(function () {
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
    var findMailElement = document.getElementById("find-guest-email");
    var findMailValue = findMailElement.value.trim();
    var resultMessage = document.getElementById("result-guest-error");
    var searchDisplayArea = document.getElementById("display-search-guest");
    var resultTableBody = document.getElementById("result-guest");
    resultTableBody.innerHTML = "";
    if (findMailValue) {
        var allGuests = JSON.parse(localStorage.getItem("guests") || "[]");
        var foundGuest = allGuests.find(function (guest) { return guest.guestEmail === findMailValue; });
        if (foundGuest) {
            searchDisplayArea.style.display = "block";
            resultMessage.innerHTML = "";
            var tableData = "\n                <tr>\n                    <td>".concat(foundGuest.guestName, "</td>\n                    <td>").concat(foundGuest.guestEmail, "</td>\n                    <td>").concat(foundGuest.guestLocation, "</td>\n                    <td><button onclick=\"inviteGuest('").concat(foundGuest.guestEmail, "', '").concat(foundGuest.guestName, "')\" class=\"invite-btn\">Invite</button></td>\n                    <td><button onclick=\"deleteGuest('").concat(foundGuest.guestEmail, "')\" class=\"delete-btn\">Delete</button></td>\n                </tr>");
            resultTableBody.innerHTML = tableData;
        }
        else {
            resultMessage.style.color = "red";
            resultMessage.innerHTML = "No guest found with this email.";
            setTimeout(function () {
                resultMessage.innerHTML = "";
            }, 3000);
        }
    }
    else {
        resultMessage.style.color = "red";
        resultMessage.innerHTML = "Please enter an email to search.";
        setTimeout(function () {
            resultMessage.innerHTML = "";
        }, 3000);
    }
    findMailElement.value = "";
}
// Delete guest
function deleteGuest(email) {
    // Retrieve all guests from localStorage
    var allGuests = JSON.parse(localStorage.getItem("guests") || "[]");
    var index = allGuests.findIndex(function (guest) { return guest.guestEmail === email; });
    if (index > -1) {
        // Remove guest from localStorage
        allGuests.splice(index, 1);
        localStorage.setItem("guests", JSON.stringify(allGuests));
        // Remove the guest row from the guest table
        var guestTable = document.getElementById("guest-table");
        if (guestTable) {
            var rows = guestTable.querySelectorAll('tr');
            rows.forEach(function (row) {
                var emailCell = row.querySelector('td:nth-child(2)');
                if (emailCell && emailCell.textContent === email) {
                    row.remove();
                }
            });
        }
        // Remove the guest row from the search result table
        var searchResultTable = document.getElementById("result-guest");
        if (searchResultTable) {
            var searchResultRows = searchResultTable.querySelectorAll('tr');
            searchResultRows.forEach(function (row) {
                var emailCell = row.querySelector('td:nth-child(2)');
                if (emailCell && emailCell.textContent === email) {
                    row.remove();
                    var displaySearchGuest = document.getElementById("display-search-guest");
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
// Event listeners for buttons
var addGuestBtn = document.getElementById("add-guest-btn");
var findGuestBtn = document.getElementById("find-user-btn");
var eventAddBtn = document.getElementById("event-add-btn");
var notificationBell = document.getElementById("notification-bell");
document.addEventListener("DOMContentLoaded", function () {
    // Adding blur event listeners to form fields for validation
    guestName.addEventListener("blur", guestNameCheck);
    guestEmail.addEventListener("blur", guestEmailCheck);
    guestLocation.addEventListener("blur", guestLocationCheck);
    if (addGuestBtn) {
        addGuestBtn.addEventListener("click", addGuest);
    }
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
    var usersJson = localStorage.getItem("users");
    var allUsersJson = usersJson ? JSON.parse(usersJson) : [];
    var loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (loggedInUserEmail) {
        var filteredUsers = allUsersJson.filter(function (user) { return user.userEmail === loggedInUserEmail; });
        var user = filteredUsers.length > 0 ? filteredUsers[0] : undefined;
        console.log("Logged In User Email:", loggedInUserEmail);
        console.log("User Object:", user);
        var profileName = document.getElementById("profile-name");
        var dateOfBirth = document.getElementById("profile-dateOfBirth");
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
