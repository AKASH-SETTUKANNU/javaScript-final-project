// Menu display area
const menu = document.querySelector('menu') as HTMLElement;
const menuIcon = document.querySelector('#menu-icon') as HTMLElement;

// Event display areas
const addEventArea = document.getElementById("event-add-block") as HTMLElement;
const notificationArea = document.getElementById("notification-display") as HTMLElement;
const logoutArea = document.getElementById("profile-edit-area") as HTMLElement;

// Function to toggle menu display
function menubarDisplay(): void {
    if (menu && (menu.style.display === 'none' || menu.style.display === '')) {
        menu.style.display = 'block';
        if (addEventArea) addEventArea.style.display = 'none';
        if (notificationArea) notificationArea.style.display = 'none';
        if (logoutArea) logoutArea.style.display = 'none';
    } else if (menu) {
        menu.style.display = 'none';
    }
}

// Function to toggle add event display
function addEvent(): void {
    window.location.href = "../events/events.html";
}

// Function to toggle notification display
function displayNotification(): void {
    if (notificationArea && (notificationArea.style.display === 'none' || notificationArea.style.display === '')) {
        notificationArea.style.display = 'block';
        if (addEventArea) addEventArea.style.display = 'none';
        if (logoutArea) logoutArea.style.display = 'none';
    } else if (notificationArea) {
        notificationArea.style.display = 'none';
    }
}

// Function to toggle logout display
function displayLogout(): void {
    if (logoutArea && (logoutArea.style.display === 'none' || logoutArea.style.display === '')) {
        logoutArea.style.display = 'flex';
        if (addEventArea) addEventArea.style.display = 'none';
        if (notificationArea) notificationArea.style.display = 'none';
    } else if (logoutArea) {
        logoutArea.style.display = 'none';
    }
}

// Validate and handle location input
function locationCheck(): void {
    const locationInput = document.getElementById('location-name') as HTMLInputElement | null;
    const errorElement = document.getElementById('location-error') as HTMLElement | null;

    if (locationInput && errorElement) {
        if (locationInput.value.trim() === '') {
            errorElement.textContent = 'Location is required.';
        } else {
            errorElement.textContent = '';
        }
    }
}

// Validate and handle date input
function dateCheck(): void {
    const dateInput = document.getElementById('event-date') as HTMLInputElement | null;
    const errorElement = document.getElementById('date-error') as HTMLElement | null;

    if (dateInput && errorElement) {
        if (dateInput.value.trim() === '') {
            errorElement.textContent = 'Date is required.';
        } else {
            errorElement.textContent = '';
        }
    }
}

// Validate and handle start time input
function eventStartCheck(): void {
    const startInput = document.getElementById('event-start') as HTMLInputElement | null;
    const errorElement = document.getElementById('start-error') as HTMLElement | null;

    if (startInput && errorElement) {
        if (startInput.value.trim() === '') {
            errorElement.textContent = 'Start time is required.';
        } else {
            errorElement.textContent = '';
        }
    }
}

// Validate and handle end time input
function eventEndCheck(): void {
    const endInput = document.getElementById('event-end') as HTMLInputElement | null;
    const errorElement = document.getElementById('end-error') as HTMLElement | null;

    if (endInput && errorElement) {
        if (endInput.value.trim() === '') {
            errorElement.textContent = 'End time is required.';
        } else {
            errorElement.textContent = '';
        }
    }
}

// Validate and handle description input
function descriptionCheck(): void {
    const descriptionInput = document.getElementById('event-description') as HTMLInputElement | null;
    const errorElement = document.getElementById('description-error') as HTMLElement | null;

    if (descriptionInput && errorElement) {
        if (descriptionInput.value.trim() === '') {
            errorElement.textContent = 'Description is required.';
        } else {
            errorElement.textContent = '';
        }
    }
}

// Form and table elements
const form = document.getElementById('eventForm') as HTMLFormElement | null;
const agendaTable = document.getElementById('agendaTable')?.getElementsByTagName('tbody')[0];
const saveBtn = document.getElementById('save-btn') as HTMLButtonElement | null;

// Load events and add event listener
loadEvents();

if (form) {
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault();
        if (validateForm()) {
            const eventData = {
                location: (document.getElementById('location-name') as HTMLInputElement).value,
                date: (document.getElementById('event-date') as HTMLInputElement).value,
                start: (document.getElementById('event-start') as HTMLInputElement).value,
                end: (document.getElementById('event-end') as HTMLInputElement).value,
                description: (document.getElementById('event-description') as HTMLInputElement).value,
            };
            const eventId = (form as HTMLFormElement).dataset.eventId;
            if (eventId) {
                updateEvent(parseInt(eventId, 10), eventData);
            } else {
                saveEventData(eventData);
            }
            form.reset();
            delete (form as HTMLFormElement).dataset.eventId;
            if (saveBtn) saveBtn.textContent = 'Save Event';
            loadEvents();
        }
    });
}

function validateForm(): boolean {
    let isValid = true;
    
    if ((document.getElementById('location-name') as HTMLInputElement).value.trim() === '') {
        (document.getElementById('location-error') as HTMLElement).textContent = 'Location is required.';
        isValid = false;
    } else {
        (document.getElementById('location-error') as HTMLElement).textContent = '';
    }

    if ((document.getElementById('event-date') as HTMLInputElement).value.trim() === '') {
        (document.getElementById('date-error') as HTMLElement).textContent = 'Date is required.';
        isValid = false;
    } else {
        (document.getElementById('date-error') as HTMLElement).textContent = '';
    }

    if ((document.getElementById('event-start') as HTMLInputElement).value.trim() === '') {
        (document.getElementById('start-error') as HTMLElement).textContent = 'Start time is required.';
        isValid = false;
    } else {
        (document.getElementById('start-error') as HTMLElement).textContent = '';
    }

    if ((document.getElementById('event-end') as HTMLInputElement).value.trim() === '') {
        (document.getElementById('end-error') as HTMLElement).textContent = 'End time is required.';
        isValid = false;
    } else {
        (document.getElementById('end-error') as HTMLElement).textContent = '';
    }

    if ((document.getElementById('event-description') as HTMLInputElement).value.trim() === '') {
        (document.getElementById('description-error') as HTMLElement).textContent = 'Description is required.';
        isValid = false;
    } else {
        (document.getElementById('description-error') as HTMLElement).textContent = '';
    }

    return isValid;
}

// Save event data
function saveEventData(eventData: { location: string; date: string; start: string; end: string; description: string }): void {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    events.push(eventData);
    localStorage.setItem('events', JSON.stringify(events));
}

// Update event data
function updateEvent(id: number, updatedEventData: { location: string; date: string; start: string; end: string; description: string }): void {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    events[id] = updatedEventData;
    localStorage.setItem('events', JSON.stringify(events));
}

// Delete event data
function deleteEvent(id: number): void {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    events.splice(id, 1);
    localStorage.setItem('events', JSON.stringify(events));
    loadEvents();
}

// Load events
function loadEvents(): void {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    if (agendaTable) {
        agendaTable.innerHTML = '';
        events.forEach((eventData: { location: string; date: string; start: string; end: string; description: string }, index: number) => {
            const row = agendaTable.insertRow();

            row.insertCell().textContent = eventData.location;
            row.insertCell().textContent = eventData.date;
            row.insertCell().textContent = eventData.start;
            row.insertCell().textContent = eventData.end;
            row.insertCell().textContent = eventData.description;

            const actionsCell = row.insertCell();
            actionsCell.className = 'actions-cell'; 

            // Create and append Edit button
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.className = 'edit-btn';
            editBtn.addEventListener('click', () => editEvent(index));
            actionsCell.appendChild(editBtn);

            // Create and append Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => deleteEvent(index));
            actionsCell.appendChild(deleteBtn);
        });
    }
}

// Function to handle editing an event
function editEvent(id: number): void {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const event = events[id];

    if (event) {
        (document.getElementById('location-name') as HTMLInputElement).value = event.location;
        (document.getElementById('event-date') as HTMLInputElement).value = event.date;
        (document.getElementById('event-start') as HTMLInputElement).value = event.start;
        (document.getElementById('event-end') as HTMLInputElement).value = event.end;
        (document.getElementById('event-description') as HTMLInputElement).value = event.description;

        (form as HTMLFormElement).dataset.eventId = id.toString();
        if (saveBtn) saveBtn.textContent = 'Update Event';
    }
}

// Function to load and display user profile details
function loadUserProfile(): void {
    const allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    const user = allUsersJson.find((user: { userEmail: string }) => user.userEmail === loggedInUserEmail);

    const profileName = document.getElementById("profile-name") as HTMLElement | null;
    const dateOfBirth = document.getElementById("profile-dateOfBirth") as HTMLElement | null;

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
    loadUserProfile();
});

