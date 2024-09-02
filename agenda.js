// menu display area
let menu = document.querySelector('menu');
let menuIcon = document.querySelector('#menu-icon');

// Function to toggle menu display
function menubarDisplay() {
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
        addEventArea.style.display = 'none';
        notificationArea.style.display = 'none'; 
        logoutArea.style.display = 'none'; 
    } else {
        menu.style.display = 'none'; 
    }
}

// addevent display area
let addEventArea = document.getElementById("event-add-block");

// Function to toggle add event display
function addEvent() {
    if (addEventArea.style.display === 'none' || addEventArea.style.display === '') {
        addEventArea.style.display = 'block';
        notificationArea.style.display = 'none';  
        logoutArea.style.display = 'none'; 
    } else {
        addEventArea.style.display = 'none'; 
    }
}

// notification display area
let notificationArea = document.getElementById("notification-display");

// Function to toggle notification display
function displayNotification() {
    if (notificationArea.style.display === 'none' || notificationArea.style.display === '') {
        notificationArea.style.display = 'block'; 
        addEventArea.style.display = 'none';
        logoutArea.style.display = 'none'; 
    } else {
        notificationArea.style.display = 'none'; 
    }
}

// profile logout popup area
let logoutArea = document.getElementById("profile-edit-area");

// Function to toggle logout display
function displayLogout() {
    if (logoutArea.style.display === 'none' || logoutArea.style.display === '') {
        logoutArea.style.display = 'flex';
        addEventArea.style.display = 'none'; 
        notificationArea.style.display = 'none';
    } else {
        logoutArea.style.display = 'none'; 
    }
}
// JavaScript for handling form validation and agenda display

// Save event function
function saveEvent(event) {
    event.preventDefault();
    // Implement saving logic here

    // For demonstration, we'll just log the event details
    console.log("Event saved");
}

// Example function to validate and handle location input
function locationCheck() {
    const locationInput = document.getElementById('location-name');
    const errorElement = document.getElementById('location-error');

    if (locationInput.value.trim() === '') {
        errorElement.textContent = 'Location is required.';
    } else {
        errorElement.textContent = '';
    }
}

// Example function to validate and handle date input
function dateCheck() {
    const dateInput = document.getElementById('event-date');
    const errorElement = document.getElementById('date-error');

    if (dateInput.value.trim() === '') {
        errorElement.textContent = 'Date is required.';
    } else {
        errorElement.textContent = '';
    }
}

// Example function to validate and handle start time input
function eventStartCheck() {
    const startInput = document.getElementById('event-start');
    const errorElement = document.getElementById('start-error');

    if (startInput.value.trim() === '') {
        errorElement.textContent = 'Start time is required.';
    } else {
        errorElement.textContent = '';
    }
}

// Example function to validate and handle end time input
function eventEndCheck() {
    const endInput = document.getElementById('event-end');
    const errorElement = document.getElementById('end-error');

    if (endInput.value.trim() === '') {
        errorElement.textContent = 'End time is required.';
    } else {
        errorElement.textContent = '';
    }
}

// Example function to validate and handle description input
function descriptionCheck() {
    const descriptionInput = document.getElementById('event-description');
    const errorElement = document.getElementById('description-error');

    if (descriptionInput.value.trim() === '') {
        errorElement.textContent = 'Description is required.';
    } else {
        errorElement.textContent = '';
    }
}


    const form = document.getElementById('eventForm');
    const agendaTable = document.getElementById('agendaTable').getElementsByTagName('tbody')[0];
    const saveBtn = document.getElementById('save-btn');

    loadEvents();

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateForm()) {
            const eventData = {
                location: document.getElementById('location-name').value,
                date: document.getElementById('event-date').value,
                start: document.getElementById('event-start').value,
                end: document.getElementById('event-end').value,
                description: document.getElementById('event-description').value,
            };
            const eventId = form.dataset.eventId;
            if (eventId) {
                updateEvent(eventId, eventData);
            } else {
                saveEvent(eventData);
            }
            form.reset();
            delete form.dataset.eventId;
            saveBtn.textContent = 'Save Event';
            loadEvents();
        }
    });

    function validateForm() {
        let isValid = true;
        if (document.getElementById('location-name').value.trim() === '') {
            document.getElementById('location-error').textContent = 'Location is required.';
            isValid = false;
        } else {
            document.getElementById('location-error').textContent = '';
        }

        if (document.getElementById('event-date').value.trim() === '') {
            document.getElementById('date-error').textContent = 'Date is required.';
            isValid = false;
        } else {
            document.getElementById('date-error').textContent = '';
        }

        if (document.getElementById('event-start').value.trim() === '') {
            document.getElementById('start-error').textContent = 'Start time is required.';
            isValid = false;
        } else {
            document.getElementById('start-error').textContent = '';
        }

        if (document.getElementById('event-end').value.trim() === '') {
            document.getElementById('end-error').textContent = 'End time is required.';
            isValid = false;
        } else {
            document.getElementById('end-error').textContent = '';
        }

        if (document.getElementById('event-description').value.trim() === '') {
            document.getElementById('description-error').textContent = 'Description is required.';
            isValid = false;
        } else {
            document.getElementById('description-error').textContent = '';
        }

        return isValid;
    }

    function saveEvent(eventData) {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.push(eventData);
        localStorage.setItem('events', JSON.stringify(events));
    }

    function updateEvent(id, updatedEventData) {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events[id] = updatedEventData;
        localStorage.setItem('events', JSON.stringify(events));
    }

    function deleteEvent(id) {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.splice(id, 1);
        localStorage.setItem('events', JSON.stringify(events));
        loadEvents();
    }

    function loadEvents() {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        agendaTable.innerHTML = '';
        events.forEach((eventData, index) => {
            const row = agendaTable.insertRow();
            row.insertCell().textContent = eventData.location;
            row.insertCell().textContent = eventData.date;
            row.insertCell().textContent = eventData.start;
            row.insertCell().textContent = eventData.end;
            row.insertCell().textContent = eventData.description;

            const actionsCell = row.insertCell();
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => editEvent(index));
            actionsCell.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteEvent(index));
            actionsCell.appendChild(deleteBtn);
        });
    }

    function editEvent(id) {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        const event = events[id];
        
        document.getElementById('location-name').value = event.location;
        document.getElementById('event-date').value = event.date;
        document.getElementById('event-start').value = event.start;
        document.getElementById('event-end').value = event.end;
        document.getElementById('event-description').value = event.description;

        form.dataset.eventId = id;
        saveBtn.textContent = 'Update Event';
    }

