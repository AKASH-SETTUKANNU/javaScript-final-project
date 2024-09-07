// Get menu elements
var menu = document.querySelector('menu');
var menuIcon = document.querySelector('#menu-icon');
var addEventArea = document.getElementById("event-add-block");
var notificationArea = document.getElementById("notification-display");
var logoutArea = document.getElementById("profile-edit-area");
// Define form element and error elements
var form = document.querySelector('.event-form');
var popupeventName = document.getElementById("event-name");
var popupeventDate = document.getElementById("event-date");
var popupeventDescription = document.getElementById("event-description");
var popupeventStatus = document.getElementById("event-status");
var popupeventCategory = document.getElementById("event-category");
var popupsuccessMessage = document.getElementById("success-message");
// Error elements
var popupnameError = document.getElementById("name-error");
var popupdateError = document.getElementById("date-error");
var popupdescriptionError = document.getElementById("description-error");
var popupstatusError = document.getElementById("status-error");
var popupcategoryError = document.getElementById("category-error");
// Variable to store the ID of the event being edited
var eventToEditId = null;
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
    var birthdayLists = document.getElementById("birthday-lists");
    if (birthdayLists) {
        var birthdayListHTML = "\n           <div class=\"birthday-list\" id=\"".concat(event.id, "\">\n              <div class=\"birthday-image\">\n                <img src=\"../images/birthday.avif\" alt=\"birthday\" />\n              </div>\n              <div class=\"birthday-detail\">\n                <h5 id=\"").concat(event.eventStatus, "\">").concat(event.eventStatus, "</h5>\n                <h5>").concat(event.eventDate, "</h5>\n                <p>").concat(event.eventDescription, "</p>\n                <i class=\"fa-solid fa-edit\" onclick=\"showEditForm('").concat(event.id, "')\" id=\"edit-icon\"></i>\n                <i class=\"fa-solid fa-trash\" onclick=\"deleteCard('").concat(event.id, "')\" id=\"delete-icon\"></i>\n              </div>\n            </div>\n        ");
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
        var weddingListHTML = "\n            <div class=\"wedding-list\" id=\"".concat(event.id, "\">\n              <div class=\"wedding-image\">\n                <img src=\"../images/marrage.jpg\" alt=\"wedding\" />\n              </div>\n              <div class=\"wedding-detail\">\n                <h5 id=\"").concat(event.eventStatus, "\">").concat(event.eventStatus, "</h5>\n                <h5>").concat(event.eventDate, "</h5>\n                <p>").concat(event.eventDescription, "</p>\n                <i class=\"fa-solid fa-edit\" onclick=\"showEditForm('").concat(event.id, "')\" id=\"edit-icon\"></i>\n                <i class=\"fa-solid fa-trash\" onclick=\"deleteCard('").concat(event.id, "')\" id=\"delete-icon\"></i>\n              </div>\n            </div>\n        ");
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
        var conferenceListHTML = "\n           <div class=\"conferences-list\" id=\"".concat(event.id, "\">\n              <div class=\"conference-image\">\n                <img src=\"../images/conference.avif\" alt=\"conference\" />\n              </div>\n              <div class=\"conference-detail\">\n                <h5 id=\"").concat(event.eventStatus, "\">").concat(event.eventStatus, "</h5>\n                <h5>").concat(event.eventDate, "</h5>\n                <p>").concat(event.eventDescription, "</p>\n               <i class=\"fa-solid fa-edit\" onclick=\"showEditForm('").concat(event.id, "')\" id=\"edit-icon\"></i>\n                <i class=\"fa-solid fa-trash\" onclick=\"deleteCard('").concat(event.id, "')\" id=\"delete-icon\"></i>\n              </div>\n            </div>\n        ");
        conferenceLists.insertAdjacentHTML('beforeend', conferenceListHTML);
    }
    else {
        console.error('Element with ID "conference-lists" not found.');
    }
}
// Function to delete a card and its data from localStorage
function deleteCard(eventId) {
    // Remove the card from the DOM
    var element = document.getElementById(eventId);
    if (element) {
        element.remove();
    }
    else {
        console.error("Element with ID \"".concat(eventId, "\" not found."));
    }
    // Remove the event from localStorage
    var usersJson = localStorage.getItem("users");
    var allUsersJson = usersJson ? JSON.parse(usersJson) : [];
    var loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (loggedInUserEmail) {
        var user = allUsersJson.find(function (user) { return user.userEmail === loggedInUserEmail; });
        if (user && user.events) {
            user.events = user.events.filter(function (event) { return event.id !== eventId; });
            localStorage.setItem("users", JSON.stringify(allUsersJson));
        }
        else {
            console.error("User or events not found.");
        }
    }
    else {
        console.error("Logged in user email not found.");
    }
}
// Show the form for editing an event
function showEditForm(eventId) {
    form.style.display = 'flex';
    var usersJson = localStorage.getItem("users");
    var allUsersJson = usersJson ? JSON.parse(usersJson) : [];
    var loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (loggedInUserEmail) {
        var user = allUsersJson.find(function (user) { return user.userEmail === loggedInUserEmail; });
        if (user && user.events) {
            var event_1 = user.events.find(function (e) { return e.id === eventId; });
            console.log('Event ID:', eventId);
            console.log('Events:', user.events);
            if (event_1) {
                // Populate the form with existing event data
                popupeventName.value = event_1.eventCategory;
                popupeventDate.value = event_1.eventDate;
                popupeventDescription.value = event_1.eventDescription;
                popupeventStatus.value = event_1.eventStatus;
                popupeventCategory.value = event_1.eventCategory;
                eventToEditId = eventId; // Set the ID of the event being edited
                // Display the form
                addEventArea.style.display = 'block';
            }
            else {
                console.error("Event not found.");
            }
        }
        else {
            console.error("User or events not found.");
        }
    }
    else {
        console.error("Logged in user email not found.");
    }
}
// Save or update event in localStorage
function updateEvent(event) {
    event.preventDefault();
    if (popupnameCheck() && popupdateCheck() && popupdescriptionCheck() && popupstatusCheck() && popupcategoryCheck()) {
        var allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
        var loggedInUserEmail_1 = localStorage.getItem("loggedInUserEmail");
        if (loggedInUserEmail_1) {
            var user = allUsersJson.find(function (user) { return user.userEmail === loggedInUserEmail_1; });
            if (user) {
                if (!user.events) {
                    user.events = [];
                }
                // Find the event to update
                var eventIndex = user.events.findIndex(function (event) { return event.id === eventToEditId; });
                if (eventIndex > -1) {
                    user.events[eventIndex] = {
                        id: eventToEditId,
                        eventCategory: popupeventCategory.value.trim(),
                        eventStatus: popupeventStatus.value.trim(),
                        eventDate: popupeventDate.value.trim(),
                        eventDescription: popupeventDescription.value.trim(),
                    };
                    localStorage.setItem("users", JSON.stringify(allUsersJson));
                    // Clear form values
                    popupeventName.value = "";
                    popupeventDate.value = "";
                    popupeventDescription.value = "";
                    popupeventStatus.value = "";
                    popupeventCategory.value = "";
                    popupsuccessMessage.innerHTML = "Event Updated Successfully...";
                    setTimeout(function () {
                        form.style.display = 'none';
                        popupsuccessMessage.innerHTML = "";
                    }, 3000);
                }
                else {
                    console.error("Event not found.");
                }
            }
            else {
                console.error("User not found.");
            }
        }
        else {
            console.error("Logged in user email not found.");
        }
    }
    else {
        setTimeout(function () {
            popupcategoryError.innerHTML = "Enter all required fields.";
        }, 3000);
    }
}
// Attach event handler to the form
form === null || form === void 0 ? void 0 : form.addEventListener('submit', updateEvent);
// Load events for the logged-in user from localStorage and create event cards
function loadUserEvents() {
    var usersJson = localStorage.getItem("users");
    var allUsersJson = usersJson ? JSON.parse(usersJson) : [];
    var loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (loggedInUserEmail) {
        var user = allUsersJson.find(function (user) { return user.userEmail === loggedInUserEmail; });
        if (user && user.events) {
            user.events.forEach(function (event) {
                switch (event.eventCategory) {
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
                        console.error("Unknown event category: ".concat(event.eventCategory));
                }
            });
        }
        else {
            console.error("User or events not found.");
        }
    }
    else {
        console.error("Logged in user email not found.");
    }
}
// Call this function to load events on page load
window.onload = loadUserEvents;
// Validation functions for form
function popupnameCheck() {
    if (!popupeventName.value.trim()) {
        popupnameError.innerHTML = "Event name is required.";
        return false;
    }
    else {
        popupnameError.innerHTML = "";
        return true;
    }
}
function popupdateCheck() {
    if (!popupeventDate.value.trim()) {
        popupdateError.innerHTML = "Event date is required.";
        return false;
    }
    else {
        popupdateError.innerHTML = "";
        return true;
    }
}
function popupdescriptionCheck() {
    if (!popupeventDescription.value.trim()) {
        popupdescriptionError.innerHTML = "Event description is required.";
        return false;
    }
    else {
        popupdescriptionError.innerHTML = "";
        return true;
    }
}
function popupstatusCheck() {
    if (!popupeventStatus.value.trim()) {
        popupstatusError.innerHTML = "Event status is required.";
        return false;
    }
    else {
        popupstatusError.innerHTML = "";
        return true;
    }
}
function popupcategoryCheck() {
    if (!popupeventCategory.value.trim()) {
        popupcategoryError.innerHTML = "Event category is required.";
        return false;
    }
    else {
        popupcategoryError.innerHTML = "";
        return true;
    }
}
