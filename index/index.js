// Get menu elements
var menu = document.querySelector('menu');
var menuIcon = document.querySelector('#menu-icon');
var addEventArea = document.getElementById("event-add-block");
var notificationArea = document.getElementById("notification-display");
var logoutArea = document.getElementById("profile-edit-area");
// Function to toggle menu display
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
// Function to toggle add event display
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
// Function to toggle notification display
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
// Function to toggle logout display
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
// Function to create a birthday card
function createBirthdayCard(event) {
    var birthdayLists = document.getElementById("birthday-lists");
    if (birthdayLists) {
        var birthdayListHTML = "\n           <div class=\"birthday-list\">\n              <div class=\"birthday-image\">\n                <img src=\"../images/birthday.avif\" alt=\"birthday\" />\n              </div>\n              <div class=\"birthday-detail\">\n                <h5 id=\"".concat(event.eventStatus, "\">").concat(event.eventStatus, "</h5>\n                <h5>").concat(event.eventDate, "</h5>\n                <p>").concat(event.eventDescription, "</p>\n              </div>\n            </div>\n        ");
        birthdayLists.insertAdjacentHTML('beforeend', birthdayListHTML);
    }
    else {
        console.error('Element with ID "birthday-lists" not found.');
    }
}
// Function to create a wedding card
function createWeddingCard(event) {
    var weddingLists = document.getElementById("wedding-lists");
    if (weddingLists) {
        var weddingListHTML = "\n            <div class=\"wedding-list\">\n              <div class=\"wedding-image\">\n                <img src=\"../images/marrage.jpg\" alt=\"wedding\" />\n              </div>\n              <div class=\"wedding-detail\">\n                <h5 id=\"".concat(event.eventStatus, "\">").concat(event.eventStatus, "</h5>\n                <h5>").concat(event.eventDate, "</h5>\n                <p>").concat(event.eventDescription, "</p>\n              </div>\n            </div>\n        ");
        weddingLists.insertAdjacentHTML('beforeend', weddingListHTML);
    }
    else {
        console.error('Element with ID "wedding-lists" not found.');
    }
}
// Function to create a conference card
function createConferenceCard(event) {
    var conferenceLists = document.getElementById("conference-lists");
    if (conferenceLists) {
        var conferenceListHTML = "\n           <div class=\"conferences-list\">\n              <div class=\"conference-image\">\n                <img src=\"../images/conference.avif\" alt=\"conference\" />\n              </div>\n              <div class=\"conference-detail\">\n                <h5 id=\"".concat(event.eventStatus, "\">").concat(event.eventStatus, "</h5>\n                <h5>").concat(event.eventDate, "</h5>\n                <p>").concat(event.eventDescription, "</p>\n              </div>\n            </div>\n        ");
        conferenceLists.insertAdjacentHTML('beforeend', conferenceListHTML);
    }
    else {
        console.error('Element with ID "conference-lists" not found.');
    }
}
// Load events for the logged-in user from localStorage and create event cards
// Load events for the logged-in user from localStorage and create event cards
function loadUserEvents() {
    var usersJson = localStorage.getItem("users");
    var allUsersJson = usersJson ? JSON.parse(usersJson) : [];
    var loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (loggedInUserEmail) {
        // Using filter instead of find
        var filteredUsers = allUsersJson.filter(function (user) { return user.userEmail === loggedInUserEmail; });
        var user = filteredUsers.length > 0 ? filteredUsers[0] : undefined;
        if (user && user.events) {
            user.events.forEach(function (event) {
                switch (event.eventCategory.toLowerCase()) {
                    case 'birthday':
                        createBirthdayCard(event);
                        break;
                    case 'wedding':
                        createWeddingCard(event);
                        break;
                    case 'conference':
                        createConferenceCard(event);
                        break;
                    default:
                        console.warn("Unknown event category: ".concat(event.eventCategory));
                        break;
                }
            });
        }
        else {
            console.error("User not found or no events available.");
        }
    }
    else {
        console.error("No logged-in user email found.");
    }
}
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
// Call functions on page load
document.addEventListener("DOMContentLoaded", function () {
    loadUserEvents();
    loadUserProfile();
});
