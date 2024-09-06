// Get references to DOM elements
var menu = document.querySelector('menu');
var menuIcon = document.querySelector('#menu-icon');
var addEventArea = document.getElementById("event-add-block");
var notificationArea = document.getElementById("notification-display");
var logoutArea = document.getElementById("profile-edit-area");
// Toggle menu display
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
// Toggle add event area display
function addEvent() {
    if (addEventArea) {
        addEventArea.style.display = addEventArea.style.display === "block" ? "none" : "block";
    }
}
// Add or update an event
function addEventItem() {
    if (nameCheck()) {
        var inputItem = document.getElementById("input-item");
        var inputValue = inputItem.value.trim();
        var allEvents = JSON.parse(localStorage.getItem("EventItems") || "[]");
        if (eventToEditName) {
            var eventToEdit = allEvents.find(function (event) { return event.name === eventToEditName; });
            if (eventToEdit) {
                eventToEdit.name = inputValue;
            }
            eventToEditName = null;
        }
        else {
            var newEvent = {
                name: inputValue,
                icon: 'fa-solid fa-holly-berry',
                eventCategory: 'general',
            };
            allEvents.push(newEvent);
        }
        localStorage.setItem("EventItems", JSON.stringify(allEvents));
        inputItem.value = "";
        displayEvents();
    }
}
// Display events in the list
function displayEvents() {
    var eventsList = document.getElementById("events-list");
    var allEvents = JSON.parse(localStorage.getItem("EventItems") || "[]");
    if (eventsList) {
        allEvents.forEach(function (event) {
            var listItem = document.createElement('li');
            listItem.innerHTML = "\n                <div class=\"icon\">\n                    <i class=\"".concat(event.icon, "\"></i>\n                </div>\n                <span>").concat(event.name, "</span>\n                <button class=\"delete-btn\" data-event-name=\"").concat(event.name, "\">Delete</button>\n                <button class=\"edit-btn\" data-event-name=\"").concat(event.name, "\">Edit</button>\n            ");
            eventsList.appendChild(listItem);
        });
        // Add event listeners for delete and edit buttons
        eventsList.addEventListener('click', function (e) {
            var target = e.target;
            if (target.classList.contains('delete-btn')) {
                var eventName = target.getAttribute('data-event-name');
                if (eventName) {
                    deleteEvent(eventName);
                }
            }
            else if (target.classList.contains('edit-btn')) {
                var eventName = target.getAttribute('data-event-name');
                if (eventName) {
                    editEvent(eventName);
                }
            }
        });
    }
}
// Delete an event
function deleteEvent(name) {
    var eventsList = document.getElementById("events-list");
    if (eventsList) {
        var listItems = eventsList.getElementsByTagName('li');
        for (var i = 0; i < listItems.length; i++) {
            var listItem = listItems[i];
            var span = listItem.querySelector('span');
            var button = listItem.querySelector('.delete-btn');
            if (span && button && button.getAttribute('data-event-name') === name) {
                // Remove the <li> element from the DOM
                listItem.remove();
                break;
            }
        }
        // Update localStorage after removing the item from the DOM
        var allEvents = JSON.parse(localStorage.getItem("EventItems") || "[]");
        var updatedEvents = allEvents.filter(function (event) { return event.name !== name; });
        localStorage.setItem("EventItems", JSON.stringify(updatedEvents));
    }
}
// Variable to keep track of the event being edited
var eventToEditName = null;
// Edit an event
function editEvent(name) {
    var allEvents = JSON.parse(localStorage.getItem("EventItems") || "[]");
    var eventToEdit = allEvents.find(function (event) { return event.name === name; });
    if (eventToEdit) {
        var inputItem = document.getElementById("input-item");
        if (inputItem) {
            inputItem.value = eventToEdit.name;
        }
        eventToEditName = name;
        addEvent();
    }
}
// Check if input item name is valid
function nameCheck() {
    var inputItem = document.getElementById("input-item");
    return inputItem.value.trim() !== "";
}
// Toggle notification display
function displayNotification() {
    if (notificationArea) {
        notificationArea.style.display = notificationArea.style.display === 'none' || notificationArea.style.display === '' ? 'block' : 'none';
        addEventArea.style.display = 'none';
        logoutArea.style.display = 'none';
    }
}
// Toggle logout display
function displayLogout() {
    if (logoutArea) {
        logoutArea.style.display = logoutArea.style.display === 'none' || logoutArea.style.display === '' ? 'flex' : 'none';
        addEventArea.style.display = 'none';
        notificationArea.style.display = 'none';
    }
}
// Create a birthday card
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
// Create a wedding card
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
// Create a conference card
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
// Load user events
function loadUserEvents() {
    var allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
    var loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    var user = allUsersJson.find(function (user) { return user.userEmail === loggedInUserEmail; });
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
// Load user profile
function loadUserProfile() {
    var profileArea = document.getElementById("profile-area");
    var loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (profileArea && loggedInUserEmail) {
        var allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
        var user = allUsersJson.find(function (user) { return user.userEmail === loggedInUserEmail; });
        if (user) {
            profileArea.innerHTML = "\n                <h2>".concat(user.userName, "</h2>\n                <p>Email: ").concat(user.userEmail, "</p>\n                <p>Birth Date: ").concat(user.userBirthDate, "</p>\n            ");
        }
        else {
            console.error("User profile could not be found.");
        }
    }
    else {
        console.error("Profile area element not found or user not logged in.");
    }
}
// Initialize the application on DOM content loaded
document.addEventListener('DOMContentLoaded', function () {
    loadUserProfile();
    loadUserEvents();
});
