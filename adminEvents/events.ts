interface EventItem {
    name: string;
}

const menu = document.querySelector('menu') as HTMLElement;
const menuIcon = document.querySelector('#menu-icon') as HTMLElement;
const addEventArea = document.getElementById("event-add-block") as HTMLElement;
const notificationArea = document.getElementById("notification-display") as HTMLElement;
const logoutArea = document.getElementById("profile-edit-area") as HTMLElement;

function menubarDisplay(): void {
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
        addEventArea.style.display = 'none';
        notificationArea.style.display = 'none';
        logoutArea.style.display = 'none';
    } else {
        menu.style.display = 'none';
    }
}

function addEvent(): void {
    window.location.href = "../adminEvents/events.html";
}

function displayNotification(): void {
    if (notificationArea.style.display === 'none' || notificationArea.style.display === '') {
        notificationArea.style.display = 'block';
        addEventArea.style.display = 'none';
        logoutArea.style.display = 'none';
    } else {
        notificationArea.style.display = 'none';
    }
}

function displayLogout(): void {
    if (logoutArea.style.display === 'none' || logoutArea.style.display === '') {
        logoutArea.style.display = 'flex';
        addEventArea.style.display = 'none';
        notificationArea.style.display = 'none';
    } else {
        logoutArea.style.display = 'none';
    }
}

const eventName = document.getElementById("event-name") as HTMLInputElement;
const eventDate = document.getElementById("event-date") as HTMLInputElement;
const eventDescription = document.getElementById("event-description") as HTMLInputElement;
const eventStatus = document.getElementById("event-status") as HTMLSelectElement;
const eventCategory = document.getElementById("event-category") as HTMLInputElement;

const nameError = document.getElementById("name-error") as HTMLElement;
const dateError = document.getElementById("date-error") as HTMLElement;
const descriptionError = document.getElementById("description-error") as HTMLElement;
const eventstatusError = document.getElementById("status-error") as HTMLElement;
const categoryError = document.getElementById("category-error") as HTMLElement;
const successMessage = document.getElementById("success-message") as HTMLElement;

function nameCheck(): boolean {
    const name = eventName.value.trim();
    if (name === '') {
        nameError.innerHTML = "Enter Event Name...";
        return false;
    } else {
        nameError.innerHTML = "";
        return true;
    }
}

function dateCheck(): boolean {
    const date = eventDate.value.trim();
    if (date === '') {
        dateError.innerHTML = "Enter Event Date...";
        return false;
    } else {
        dateError.innerHTML = "";
        return true;
    }
}

function descriptionCheck(): boolean {
    const description = eventDescription.value.trim();
    if (description === '') {
        descriptionError.innerHTML = "Enter Event Description...";
        return false;
    } else {
        descriptionError.innerHTML = "";
        return true;
    }
}

function statusCheck(): boolean {
    const status = eventStatus.value.trim();
    if (status === '') {
        eventstatusError.innerHTML = "Enter Event Status...";
        return false;
    } else {
        eventstatusError.innerHTML = "";
        return true;
    }
}

function categoryCheck(): boolean {
    const category = eventCategory.value.trim();
    if (category === '') {
        categoryError.innerHTML = "Enter Event Category...";
        return false;
    } else {
        categoryError.innerHTML = "";
        return true;
    }
}

// Update EventDetails class to include ID
class EventDetails {
    constructor(
        public id: string,
        public eventName: string,
        public eventDate: string,
        public eventDescription: string,
        public eventStatus: string,
        public eventCategory: string
    ) {}

    displayData(): void {
        console.log(`Event ID: ${this.id}`);
        console.log(`Event Name: ${this.eventName}`);
        console.log(`Event Date: ${this.eventDate}`);
        console.log(`Event Description: ${this.eventDescription}`);
        console.log(`Event Status: ${this.eventStatus}`);
        console.log(`Event Category: ${this.eventCategory}`);
    }

    toPlainObject(): object {
        return {
            id: this.id,
            eventName: this.eventName,
            eventDate: this.eventDate,
            eventDescription: this.eventDescription,
            eventStatus: this.eventStatus,
            eventCategory: this.eventCategory
        };
    }
}

// Save event to localStorage
function saveEvent(event: Event): void {
    event.preventDefault();

    if (nameCheck() && dateCheck() && descriptionCheck() && statusCheck() && categoryCheck()) {
        const allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
        const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

        if (loggedInUserEmail) {
            const user = allUsersJson.find((user: any) => user.userEmail === loggedInUserEmail);

            if (user) {
                if (!user.events) {
                    user.events = [];
                }

                // Generate ID based on the length of the existing events array
                const newEventId = (user.events.length + 1).toString();
                
                const newEvent = new EventDetails(
                    newEventId,
                    eventName.value,
                    eventDate.value,
                    eventDescription.value,
                    eventStatus.value,
                    eventCategory.value
                );

                newEvent.displayData();

                const newEventObject = newEvent.toPlainObject();
                user.events.push(newEventObject);

                localStorage.setItem("users", JSON.stringify(allUsersJson));

                eventName.value = "";
                eventDate.value = "";
                eventDescription.value = "";
                eventStatus.value = "";
                eventCategory.value = "";

                setTimeout(() => {
                    successMessage.innerHTML = "Event Added Successfully...";
                }, 3000);
            } else {
                console.error("User not found.");
            }
        } else {
            console.error("Logged in user email not found.");
        }
    } else {
        setTimeout(() => {
            categoryError.innerHTML = "Enter all required fields.";
        }, 3000);
    }
}

// Load and display user profile details
function loadUserProfile(): void {
    const allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

    if (loggedInUserEmail) {
        const user = allUsersJson.find((user: any) => user.userEmail === loggedInUserEmail);
        console.log("Logged In User Email:", loggedInUserEmail);
        console.log("User Object:", user);

        const profileName = document.getElementById("profile-name") as HTMLElement;
        const dateOfBirth = document.getElementById("profile-dateOfBirth") as HTMLElement;

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
    } else {
        console.error("Logged in user email not found.");
    }
}

// Function to populate the select options with event statuses
function populateEventStatusOptions(): void {
    const eventStatusSelect = document.getElementById("event-category") as HTMLSelectElement;

    if (eventStatusSelect) {
        // Retrieve events from localStorage
        const allEvents: EventItem[] = JSON.parse(localStorage.getItem("EventItems") || "[]");

        // Clear existing options
        eventStatusSelect.innerHTML = `
            <option value="conference">Conference</option>
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday</option>
        `;

        // Populate options based on events
        allEvents.forEach(event => {
            const option = document.createElement("option");
            option.value = event.name;
            option.textContent = event.name;
            eventStatusSelect.appendChild(option);
        });
    } else {
        console.error('Element with ID "event-status" not found.');
    }
}

// Call functions on page load
document.addEventListener("DOMContentLoaded", () => {
    loadUserProfile();
    populateEventStatusOptions();
});
