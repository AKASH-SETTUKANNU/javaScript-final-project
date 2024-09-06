/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!************************!*\
  !*** ./index/index.ts ***!
  \************************/

// Get menu elements
const menu = document.querySelector('menu');
const menuIcon = document.querySelector('#menu-icon');
const addEventArea = document.getElementById("event-add-block");
const notificationArea = document.getElementById("notification-display");
const logoutArea = document.getElementById("profile-edit-area");
const eventAddBtn = document.getElementById("event-add-btn");
const notificationBell = document.getElementById("notification-bell");
const profileEditIcon = document.getElementById("profile-edit-icon");
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
    window.location.href = "../events/events.html";
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
    const birthdayLists = document.getElementById("birthday-lists");
    if (birthdayLists) {
        const birthdayListHTML = `
            <div class="birthday-list">
                <div class="birthday-image">
                    <img src="../images/birthday.avif" alt="birthday" />
                </div>
                <div class="birthday-detail">
                    <h5 id="${event.eventStatus}">${event.eventStatus}</h5>
                    <h5>${event.eventDate}</h5>
                    <p>${event.eventDescription}</p>
                </div>
            </div>
        `;
        birthdayLists.insertAdjacentHTML('beforeend', birthdayListHTML);
    }
    else {
        console.error('Element with ID "birthday-lists" not found.');
    }
}
// Function to create a wedding card
function createWeddingCard(event) {
    const weddingLists = document.getElementById("wedding-lists");
    if (weddingLists) {
        const weddingListHTML = `
            <div class="wedding-list">
                <div class="wedding-image">
                    <img src="../images/marrage.jpg" alt="wedding" />
                </div>
                <div class="wedding-detail">
                    <h5 id="${event.eventStatus}">${event.eventStatus}</h5>
                    <h5>${event.eventDate}</h5>
                    <p>${event.eventDescription}</p>
                </div>
            </div>
        `;
        weddingLists.insertAdjacentHTML('beforeend', weddingListHTML);
    }
    else {
        console.error('Element with ID "wedding-lists" not found.');
    }
}
// Function to create a conference card
function createConferenceCard(event) {
    const conferenceLists = document.getElementById("conference-lists");
    if (conferenceLists) {
        const conferenceListHTML = `
            <div class="conferences-list">
                <div class="conference-image">
                    <img src="../images/conference.avif" alt="conference" />
                </div>
                <div class="conference-detail">
                    <h5 id="${event.eventStatus}">${event.eventStatus}</h5>
                    <h5>${event.eventDate}</h5>
                    <p>${event.eventDescription}</p>
                </div>
            </div>
        `;
        conferenceLists.insertAdjacentHTML('beforeend', conferenceListHTML);
    }
    else {
        console.error('Element with ID "conference-lists" not found.');
    }
}
// Load events for the logged-in user from localStorage and create event cards
function loadUserEvents() {
    const usersJson = localStorage.getItem("users");
    const allUsersJson = usersJson ? JSON.parse(usersJson) : [];
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (loggedInUserEmail) {
        const filteredUsers = allUsersJson.filter((user) => user.userEmail === loggedInUserEmail);
        const user = filteredUsers.length > 0 ? filteredUsers[0] : undefined;
        if (user && user.events) {
            user.events.forEach((event) => {
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
                        console.warn(`Unknown event category: ${event.eventCategory}`);
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
// Add event listeners to elements
document.addEventListener("DOMContentLoaded", () => {
    loadUserEvents();
    loadUserProfile();
    if (menuIcon)
        menuIcon.addEventListener("click", menubarDisplay);
    if (eventAddBtn)
        eventAddBtn.addEventListener("click", addEvent);
    if (notificationBell)
        notificationBell.addEventListener("click", displayNotification);
    if (profileEditIcon)
        profileEditIcon.addEventListener("click", displayLogout);
});

/******/ })()
;
//# sourceMappingURL=index.bundle.js.map