// Get references to DOM elements
var menu = document.querySelector('menu');
var menuIcon = document.querySelector('#menu-icon');
var addEventArea = document.getElementById("event-add-block");
var notificationArea = document.getElementById("notification-display");
var logoutArea = document.getElementById("profile-edit-area");
// Define form element and error elements
var form = document.querySelector('.event-form');
var popupeventName = document.getElementById("event-namea");
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
/////////////////////////////////////////////////////////////////////////////////
// Variable to keep track of the event being edited
var eventToEditName = null;
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
/// Display events in the list
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
/////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to create a birthday card
function createBirthdayCard(event) {
    var birthdayLists = document.getElementById("birthday-lists");
    if (birthdayLists) {
        var birthdayListHTML = "\n           <div class=\"birthday-list\" id=\"".concat(event.id, "\" >\n              <div class=\"birthday-image\">\n                <img src=\"../images/birthday.avif\" alt=\"birthday\" />\n              </div>\n              <div class=\"birthday-detail\">\n                <h5 id=\"").concat(event.eventStatus, "\">").concat(event.eventStatus, "</h5>\n                  <h5>").concat(event.eventName, "</h5>\n                <h5>").concat(event.eventDate, "</h5>\n\n                <p class=\"truncate\">").concat(event.eventDescription, "</p>\n                 <i class=\"fa-solid fa-info\" onclick=\"displayDetails('").concat(event.id, "')\" id=\"info-icon\"></i>\n                <i class=\"fa-solid fa-edit\" onclick=\"showEditForm('").concat(event.id, "')\" id=\"edit-icon\"></i>\n                <i class=\"fa-solid fa-trash\" onclick=\"deleteCard('").concat(event.id, "')\" id=\"delete-icon\"></i>\n              </div>\n            </div>\n        ");
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
        var weddingListHTML = "\n            <div class=\"wedding-list\" id=\"".concat(event.id, "\" >\n              <div class=\"wedding-image\">\n                <img src=\"../images/marrage.jpg\" alt=\"wedding\" />\n              </div>\n              <div class=\"wedding-detail\">\n               \n                <h5 id=\"").concat(event.eventStatus, "\">").concat(event.eventStatus, "</h5>\n                 <h5>").concat(event.eventName, "</h5>\n                  <h5>").concat(event.eventDate, "</h5>\n                <p class=\"truncate\">").concat(event.eventDescription, "</p>\n                 <i class=\"fa-solid fa-info\" onclick=\"displayDetails('").concat(event.id, "')\" id=\"info-icon\"></i>\n                <i class=\"fa-solid fa-edit\" onclick=\"showEditForm('").concat(event.id, "')\" id=\"edit-icon\"></i>\n                <i class=\"fa-solid fa-trash\" onclick=\"deleteCard('").concat(event.id, "')\" id=\"delete-icon\"></i>\n              </div>\n            </div>\n        ");
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
        var conferenceListHTML = "\n           <div class=\"conferences-list\" id=\"".concat(event.id, "\" >\n              <div class=\"conference-image\">\n                <img src=\"../images/conference.avif\" alt=\"conference\" />\n              </div>\n              <div class=\"conference-detail\">\n                <h5 id=\"").concat(event.eventStatus, "\">").concat(event.eventStatus, "</h5>\n                 <h5>").concat(event.eventName, "</h5>\n                <h5>").concat(event.eventDate, "</h5>\n                <p class=\"truncate\">").concat(event.eventDescription, "</p>\n                 <i class=\"fa-solid fa-info\" onclick=\"displayDetails('").concat(event.id, "')\" id=\"info-icon\"></i>\n               <i class=\"fa-solid fa-edit\" onclick=\"showEditForm('").concat(event.id, "')\" id=\"edit-icon\"></i>\n                <i class=\"fa-solid fa-trash\" onclick=\"deleteCard('").concat(event.id, "')\" id=\"delete-icon\"></i>\n              </div>\n            </div>\n        ");
        conferenceLists.insertAdjacentHTML('beforeend', conferenceListHTML);
    }
    else {
        console.error('Element with ID "conference-lists" not found.');
    }
}
function displayDetails(eventId) {
    var backdrop = document.getElementById("backdrop");
    var detailImage = document.getElementById("detail-img");
    var detailName = document.getElementById("detail-name");
    var detailDate = document.getElementById("detail-date");
    var detailDescription = document.getElementById("detail-description");
    var detailCategory = document.getElementById("detail-category");
    var detailStatus = document.getElementById("detail-status");
    var displayDetails = document.getElementById("display-details");
    if (!displayDetails) {
        console.error("Display details element not found.");
        return;
    }
    // Retrieve user data from localStorage
    var allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
    var loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (loggedInUserEmail) {
        var user = allUsersJson.find(function (user) { return user.userEmail === loggedInUserEmail; });
        if (user && user.events) {
            var event_1 = user.events.find(function (e) { return e.id === eventId; });
            if (event_1) {
                // Populate the details
                detailImage.src = getEventImageByCategory(event_1.eventCategory);
                detailName.textContent = event_1.eventName;
                detailDate.textContent = "Event Date:".concat(event_1.eventDate);
                detailDescription.textContent = event_1.eventDescription;
                detailCategory.textContent = "Event Category: ".concat(event_1.eventCategory);
                // Set the status and its id
                detailStatus.textContent = " ".concat(event_1.eventStatus);
                detailStatus.id = event_1.eventStatus.toLowerCase();
                // Show the details div
                backdrop.classList.remove('hidden');
                backdrop.classList.add('visible');
                displayDetails.classList.remove('hidden');
                displayDetails.classList.add('visible');
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
// Function to determine image based on event category
function getEventImageByCategory(category) {
    switch (category.toLowerCase()) {
        case 'birthday':
            return '../images/birthday.avif';
        case 'wedding':
            return '../images/marrage.jpg';
        case 'conference':
            return '../images/conference.avif';
        default:
            return '../images/default.png';
    }
}
function closeDetail() {
    var displayDetails = document.getElementById("display-details");
    var backdrop = document.getElementById("backdrop");
    if (displayDetails.classList.contains('visible')) {
        displayDetails.classList.remove('visible');
        displayDetails.classList.add('hidden');
        backdrop.classList.remove('visible');
        backdrop.classList.add('hidden');
        window.location.reload();
    }
}
// Function to delete a card
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
//////////////////////////////////////////////////////////////////////////////
// Show the form for editing an event
function showEditForm(eventId) {
    var _a, _b, _c, _d, _e;
    form.style.display = 'flex';
    var usersJson = localStorage.getItem("users");
    if (!usersJson) {
        console.error("Users data not found in local storage.");
        return;
    }
    var allUsersJson = JSON.parse(usersJson);
    var loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (!loggedInUserEmail) {
        console.error("Logged in user email not found.");
        return;
    }
    var user = allUsersJson.find(function (user) { return user.userEmail === loggedInUserEmail; });
    if (!user) {
        console.error("User not found.");
        return;
    }
    if (user.events) {
        var event_2 = user.events.find(function (e) { return e.id === eventId; });
        if (event_2) {
            popupeventName.value = (_a = event_2.eventName) !== null && _a !== void 0 ? _a : "";
            popupeventDate.value = (_b = event_2.eventDate) !== null && _b !== void 0 ? _b : "";
            popupeventDescription.value = (_c = event_2.eventDescription) !== null && _c !== void 0 ? _c : "";
            popupeventStatus.value = (_d = event_2.eventStatus) !== null && _d !== void 0 ? _d : "";
            popupeventCategory.value = (_e = event_2.eventCategory) !== null && _e !== void 0 ? _e : "";
            // Store the event ID for further use
            eventToEditId = eventId;
        }
        else {
            console.error("Event not found.");
        }
    }
    else {
        console.error("User does not have any events.");
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
                        eventName: popupeventName.value.trim(),
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
                        window.location.reload();
                    }, 2000);
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
        }, 2000);
    }
}
// Attach event handler to the form
form === null || form === void 0 ? void 0 : form.addEventListener('submit', updateEvent);
///////////////////////////////////////////////////////////////////////////////////////////
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
// Load and display user profile details
function loadUserProfile() {
    var allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
    var loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (loggedInUserEmail) {
        var user = allUsersJson.find(function (user) { return user.userEmail === loggedInUserEmail; });
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
        console.error("Logged in user email not found.");
    }
}
// Initialize the application on DOM content loaded
document.addEventListener('DOMContentLoaded', function () {
    loadUserProfile();
    loadUserEvents();
    displayEvents();
});
