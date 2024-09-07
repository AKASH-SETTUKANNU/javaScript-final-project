var _a;
// Menu display area
var menu = document.querySelector('menu');
var menuIcon = document.querySelector('#menu-icon');
// Event display areas
var addEventArea = document.getElementById("event-add-block");
var notificationArea = document.getElementById("notification-display");
var logoutArea = document.getElementById("profile-edit-area");
// Function to toggle menu display
function menubarDisplay() {
    if (menu && (menu.style.display === 'none' || menu.style.display === '')) {
        menu.style.display = 'block';
        if (addEventArea)
            addEventArea.style.display = 'none';
        if (notificationArea)
            notificationArea.style.display = 'none';
        if (logoutArea)
            logoutArea.style.display = 'none';
    }
    else if (menu) {
        menu.style.display = 'none';
    }
}
// Function to toggle add event display
function addEvent() {
    window.location.href = "../adminEvents/events.html";
}
// Function to toggle notification display
function displayNotification() {
    if (notificationArea && (notificationArea.style.display === 'none' || notificationArea.style.display === '')) {
        notificationArea.style.display = 'block';
        if (addEventArea)
            addEventArea.style.display = 'none';
        if (logoutArea)
            logoutArea.style.display = 'none';
    }
    else if (notificationArea) {
        notificationArea.style.display = 'none';
    }
}
// Function to toggle logout display
function displayLogout() {
    if (logoutArea && (logoutArea.style.display === 'none' || logoutArea.style.display === '')) {
        logoutArea.style.display = 'flex';
        if (addEventArea)
            addEventArea.style.display = 'none';
        if (notificationArea)
            notificationArea.style.display = 'none';
    }
    else if (logoutArea) {
        logoutArea.style.display = 'none';
    }
}
// Validate and handle location input
function locationCheck() {
    var locationInput = document.getElementById('location-name');
    var errorElement = document.getElementById('location-error');
    if (locationInput && errorElement) {
        if (locationInput.value.trim() === '') {
            errorElement.textContent = 'Location is required.';
        }
        else {
            errorElement.textContent = '';
        }
    }
}
// Validate and handle date input
function dateCheck() {
    var dateInput = document.getElementById('event-date');
    var errorElement = document.getElementById('date-error');
    if (dateInput && errorElement) {
        if (dateInput.value.trim() === '') {
            errorElement.textContent = 'Date is required.';
        }
        else {
            errorElement.textContent = '';
        }
    }
}
// Validate and handle start time input
function eventStartCheck() {
    var startInput = document.getElementById('event-start');
    var errorElement = document.getElementById('start-error');
    if (startInput && errorElement) {
        if (startInput.value.trim() === '') {
            errorElement.textContent = 'Start time is required.';
        }
        else {
            errorElement.textContent = '';
        }
    }
}
// Validate and handle end time input
function eventEndCheck() {
    var endInput = document.getElementById('event-end');
    var errorElement = document.getElementById('end-error');
    if (endInput && errorElement) {
        if (endInput.value.trim() === '') {
            errorElement.textContent = 'End time is required.';
        }
        else {
            errorElement.textContent = '';
        }
    }
}
// Validate and handle description input
function descriptionCheck() {
    var descriptionInput = document.getElementById('event-description');
    var errorElement = document.getElementById('description-error');
    if (descriptionInput && errorElement) {
        if (descriptionInput.value.trim() === '') {
            errorElement.textContent = 'Description is required.';
        }
        else {
            errorElement.textContent = '';
        }
    }
}
// Form and table elements
var form = document.getElementById('eventForm');
var agendaTable = (_a = document.getElementById('agendaTable')) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('tbody')[0];
var saveBtn = document.getElementById('save-btn');
// Load events and add event listener
loadEvents();
if (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            var eventData = {
                location: document.getElementById('location-name').value,
                date: document.getElementById('event-date').value,
                start: document.getElementById('event-start').value,
                end: document.getElementById('event-end').value,
                description: document.getElementById('event-description').value,
            };
            var eventId = form.dataset.eventId;
            if (eventId) {
                updateEvent(parseInt(eventId, 10), eventData);
            }
            else {
                saveEventData(eventData);
            }
            form.reset();
            delete form.dataset.eventId;
            if (saveBtn)
                saveBtn.textContent = 'Save Event';
            loadEvents();
        }
    });
}
function validateForm() {
    var isValid = true;
    if (document.getElementById('location-name').value.trim() === '') {
        document.getElementById('location-error').textContent = 'Location is required.';
        isValid = false;
    }
    else {
        document.getElementById('location-error').textContent = '';
    }
    if (document.getElementById('event-date').value.trim() === '') {
        document.getElementById('date-error').textContent = 'Date is required.';
        isValid = false;
    }
    else {
        document.getElementById('date-error').textContent = '';
    }
    if (document.getElementById('event-start').value.trim() === '') {
        document.getElementById('start-error').textContent = 'Start time is required.';
        isValid = false;
    }
    else {
        document.getElementById('start-error').textContent = '';
    }
    if (document.getElementById('event-end').value.trim() === '') {
        document.getElementById('end-error').textContent = 'End time is required.';
        isValid = false;
    }
    else {
        document.getElementById('end-error').textContent = '';
    }
    if (document.getElementById('event-description').value.trim() === '') {
        document.getElementById('description-error').textContent = 'Description is required.';
        isValid = false;
    }
    else {
        document.getElementById('description-error').textContent = '';
    }
    return isValid;
}
// Save event data
function saveEventData(eventData) {
    var events = JSON.parse(localStorage.getItem('events') || '[]');
    events.push(eventData);
    localStorage.setItem('events', JSON.stringify(events));
}
// Update event data
function updateEvent(id, updatedEventData) {
    var events = JSON.parse(localStorage.getItem('events') || '[]');
    events[id] = updatedEventData;
    localStorage.setItem('events', JSON.stringify(events));
}
// Delete event data
function deleteEvent(id) {
    var events = JSON.parse(localStorage.getItem('events') || '[]');
    events.splice(id, 1);
    localStorage.setItem('events', JSON.stringify(events));
    loadEvents();
}
// Load events
function loadEvents() {
    var events = JSON.parse(localStorage.getItem('events') || '[]');
    if (agendaTable) {
        agendaTable.innerHTML = '';
        events.forEach(function (eventData, index) {
            var row = agendaTable.insertRow();
            row.insertCell().textContent = eventData.location;
            row.insertCell().textContent = eventData.date;
            row.insertCell().textContent = eventData.start;
            row.insertCell().textContent = eventData.end;
            row.insertCell().textContent = eventData.description;
            var actionsCell = row.insertCell();
            actionsCell.className = 'actions-cell';
            // Create and append Edit button
            var editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.className = 'edit-btn';
            editBtn.addEventListener('click', function () { return editEvent(index); });
            actionsCell.appendChild(editBtn);
            // Create and append Delete button
            var deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', function () { return deleteEvent(index); });
            actionsCell.appendChild(deleteBtn);
        });
    }
}
// Function to handle editing an event
function editEvent(id) {
    var events = JSON.parse(localStorage.getItem('events') || '[]');
    var event = events[id];
    if (event) {
        document.getElementById('location-name').value = event.location;
        document.getElementById('event-date').value = event.date;
        document.getElementById('event-start').value = event.start;
        document.getElementById('event-end').value = event.end;
        document.getElementById('event-description').value = event.description;
        form.dataset.eventId = id.toString();
        if (saveBtn)
            saveBtn.textContent = 'Update Event';
    }
}
// Function to load and display user profile details
function loadUserProfile() {
    var allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
    var loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    var user = allUsersJson.find(function (user) { return user.userEmail === loggedInUserEmail; });
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
// Call functions on page load
document.addEventListener("DOMContentLoaded", function () {
    loadUserProfile();
});
