var menu = document.querySelector('menu');
var menuIcon = document.querySelector('#menu-icon');
var addEventArea = document.getElementById("event-add-block");
var notificationArea = document.getElementById("notification-display");
var logoutArea = document.getElementById("profile-edit-area");
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
function addEvent() {
    window.location.href = "../adminEvents/events.html";
}
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
var eventName = document.getElementById("event-name");
var eventDate = document.getElementById("event-date");
var eventDescription = document.getElementById("event-description");
var eventStatus = document.getElementById("event-status");
var eventCategory = document.getElementById("event-category");
var nameError = document.getElementById("name-error");
var dateError = document.getElementById("date-error");
var descriptionError = document.getElementById("description-error");
var eventstatusError = document.getElementById("status-error");
var categoryError = document.getElementById("category-error");
var successMessage = document.getElementById("success-message");
function nameCheck() {
    var name = eventName.value.trim();
    if (name === '') {
        nameError.innerHTML = "Enter Event Name...";
        return false;
    }
    else {
        nameError.innerHTML = "";
        return true;
    }
}
function dateCheck() {
    var date = eventDate.value.trim();
    if (date === '') {
        dateError.innerHTML = "Enter Event Date...";
        return false;
    }
    else {
        dateError.innerHTML = "";
        return true;
    }
}
function descriptionCheck() {
    var description = eventDescription.value.trim();
    if (description === '') {
        descriptionError.innerHTML = "Enter Event Description...";
        return false;
    }
    else {
        descriptionError.innerHTML = "";
        return true;
    }
}
function statusCheck() {
    var status = eventStatus.value.trim();
    if (status === '') {
        eventstatusError.innerHTML = "Enter Event Status...";
        return false;
    }
    else {
        eventstatusError.innerHTML = "";
        return true;
    }
}
function categoryCheck() {
    var category = eventCategory.value.trim();
    if (category === '') {
        categoryError.innerHTML = "Enter Event Category...";
        return false;
    }
    else {
        categoryError.innerHTML = "";
        return true;
    }
}
// Update EventDetails class to include ID
var EventDetails = /** @class */ (function () {
    function EventDetails(id, eventName, eventDate, eventDescription, eventStatus, eventCategory) {
        this.id = id;
        this.eventName = eventName;
        this.eventDate = eventDate;
        this.eventDescription = eventDescription;
        this.eventStatus = eventStatus;
        this.eventCategory = eventCategory;
    }
    EventDetails.prototype.displayData = function () {
        console.log("Event ID: ".concat(this.id));
        console.log("Event Name: ".concat(this.eventName));
        console.log("Event Date: ".concat(this.eventDate));
        console.log("Event Description: ".concat(this.eventDescription));
        console.log("Event Status: ".concat(this.eventStatus));
        console.log("Event Category: ".concat(this.eventCategory));
    };
    EventDetails.prototype.toPlainObject = function () {
        return {
            id: this.id,
            eventName: this.eventName,
            eventDate: this.eventDate,
            eventDescription: this.eventDescription,
            eventStatus: this.eventStatus,
            eventCategory: this.eventCategory
        };
    };
    return EventDetails;
}());
// Save event to localStorage
function saveEvent(event) {
    event.preventDefault();
    if (nameCheck() && dateCheck() && descriptionCheck() && statusCheck() && categoryCheck()) {
        var allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
        var loggedInUserEmail_1 = localStorage.getItem("loggedInUserEmail");
        if (loggedInUserEmail_1) {
            var user = allUsersJson.find(function (user) { return user.userEmail === loggedInUserEmail_1; });
            if (user) {
                if (!user.events) {
                    user.events = [];
                }
                // Generate ID based on the length of the existing events array
                var newEventId = (user.events.length + 1).toString();
                var newEvent = new EventDetails(newEventId, eventName.value, eventDate.value, eventDescription.value, eventStatus.value, eventCategory.value);
                newEvent.displayData();
                var newEventObject = newEvent.toPlainObject();
                user.events.push(newEventObject);
                localStorage.setItem("users", JSON.stringify(allUsersJson));
                eventName.value = "";
                eventDate.value = "";
                eventDescription.value = "";
                eventStatus.value = "";
                eventCategory.value = "";
                setTimeout(function () {
                    successMessage.innerHTML = "Event Added Successfully...";
                }, 3000);
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
            categoryError.innerHTML = "Enter all required fields.";
        }, 3000);
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
// Function to populate the select options with event statuses
function populateEventStatusOptions() {
    var eventStatusSelect = document.getElementById("event-category");
    if (eventStatusSelect) {
        // Retrieve events from localStorage
        var allEvents = JSON.parse(localStorage.getItem("EventItems") || "[]");
        // Clear existing options
        eventStatusSelect.innerHTML = "\n            <option value=\"conference\">Conference</option>\n            <option value=\"wedding\">Wedding</option>\n            <option value=\"birthday\">Birthday</option>\n        ";
        // Populate options based on events
        allEvents.forEach(function (event) {
            var option = document.createElement("option");
            option.value = event.name;
            option.textContent = event.name;
            eventStatusSelect.appendChild(option);
        });
    }
    else {
        console.error('Element with ID "event-status" not found.');
    }
}
// Call functions on page load
document.addEventListener("DOMContentLoaded", function () {
    loadUserProfile();
    populateEventStatusOptions();
});
