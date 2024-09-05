// Get references to DOM elements
const menu = document.querySelector('menu') as HTMLMenuElement;
const menuIcon = document.querySelector('#menu-icon') as HTMLElement;
const addEventArea = document.getElementById("event-add-block") as HTMLElement;
const notificationArea = document.getElementById("notification-display") as HTMLElement;
const logoutArea = document.getElementById("profile-edit-area") as HTMLElement;

// Define interfaces
interface EventItem {
    name: string;
    icon: string;
    eventCategory: string;
}

interface User {
    userEmail: string;
    userName: string;
    userBirthDate: string;
    events?: EventItem[];
}

// Toggle menu display
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

// Toggle add event area display
function addEvent(): void {
    if (addEventArea) {
        addEventArea.style.display = addEventArea.style.display === "block" ? "none" : "block";
    }
}

// Add or update an event
function addEventItem(): void {
    if (nameCheck()) {
        const inputItem = document.getElementById("input-item") as HTMLInputElement;
        const inputValue = inputItem.value.trim();

        const allEvents: EventItem[] = JSON.parse(localStorage.getItem("EventItems") || "[]");

        if (eventToEditName) {
            const eventToEdit = allEvents.find((event) => event.name === eventToEditName);
            if (eventToEdit) {
                eventToEdit.name = inputValue;
            }
            eventToEditName = null;
        } else {
            const newEvent: EventItem = {
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
function displayEvents(): void {
    const eventsList = document.getElementById("events-list");
    const allEvents: EventItem[] = JSON.parse(localStorage.getItem("EventItems") || "[]");

    if (eventsList) {

        allEvents.forEach((event) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="icon">
                    <i class="${event.icon}"></i>
                </div>
                <span>${event.name}</span>
                <button class="delete-btn" data-event-name="${event.name}">Delete</button>
                <button class="edit-btn" data-event-name="${event.name}">Edit</button>
            `;
            eventsList.appendChild(listItem);
        });

        // Add event listeners for delete and edit buttons
        eventsList.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('delete-btn')) {
                const eventName = target.getAttribute('data-event-name');
                if (eventName) {
                    deleteEvent(eventName, target.closest('li') as HTMLLIElement);
                }
            } else if (target.classList.contains('edit-btn')) {
                const eventName = target.getAttribute('data-event-name');
                if (eventName) {
                    editEvent(eventName);
                }
            }
        });
    }
}


// Delete an event
function deleteEvent(name: string): void {
    // Get reference to the events list container
    const eventsList = document.getElementById("events-list");

    if (eventsList) {
       
        const listItems = eventsList.getElementsByTagName('li');
        for (let i = 0; i < listItems.length; i++) {
            const listItem = listItems[i];
            const span = listItem.querySelector('span');
            const button = listItem.querySelector('.delete-btn');

            if (span && button && button.getAttribute('data-event-name') === name) {
                // Remove the <li> element from the DOM
                listItem.remove();
                break;
            }
        }

        // Update localStorage after removing the item from the DOM
        const allEvents: EventItem[] = JSON.parse(localStorage.getItem("EventItems") || "[]");
        const updatedEvents = allEvents.filter((event) => event.name !== name);
        localStorage.setItem("EventItems", JSON.stringify(updatedEvents));
    }
}



// Variable to keep track of the event being edited
let eventToEditName: string | null = null;

// Edit an event
function editEvent(name: string): void {
    const allEvents: EventItem[] = JSON.parse(localStorage.getItem("EventItems") || "[]");
    const eventToEdit = allEvents.find((event) => event.name === name);

    if (eventToEdit) {
        const inputItem = document.getElementById("input-item") as HTMLInputElement;
        if (inputItem) {
            inputItem.value = eventToEdit.name;
        }

        eventToEditName = name;
        addEvent();
    }
}

// Check if input item name is valid
function nameCheck(): boolean {
    const inputItem = document.getElementById("input-item") as HTMLInputElement;
    return inputItem.value.trim() !== "";
}

// Toggle notification display
function displayNotification(): void {
    if (notificationArea) {
        notificationArea.style.display = notificationArea.style.display === 'none' || notificationArea.style.display === '' ? 'block' : 'none';
        addEventArea.style.display = 'none';
        logoutArea.style.display = 'none';
    }
}

// Toggle logout display
function displayLogout(): void {
    if (logoutArea) {
        logoutArea.style.display = logoutArea.style.display === 'none' || logoutArea.style.display === '' ? 'flex' : 'none';
        addEventArea.style.display = 'none';
        notificationArea.style.display = 'none';
    }
}

// Create a birthday card
function createBirthdayCard(event: { eventStatus: string; eventDate: string; eventDescription: string; }): void {
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
    } else {
        console.error('Element with ID "birthday-lists" not found.');
    }
}

// Create a wedding card
function createWeddingCard(event: { eventStatus: string; eventDate: string; eventDescription: string; }): void {
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
    } else {
        console.error('Element with ID "wedding-lists" not found.');
    }
}

// Create a conference card
function createConferenceCard(event: { eventStatus: string; eventDate: string; eventDescription: string; }): void {
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
    } else {
        console.error('Element with ID "conference-lists" not found.');
    }
}

// Load user events
function loadUserEvents(): void {
    const allUsersJson: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

    const user = allUsersJson.find((user: User) => user.userEmail === loggedInUserEmail);

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
    } else {
        console.error("User not found or no events available.");
    }
}

// Load user profile
function loadUserProfile(): void {
    const profileArea = document.getElementById("profile-area");
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

    if (profileArea && loggedInUserEmail) {
        const allUsersJson: User[] = JSON.parse(localStorage.getItem("users") || "[]");
        const user = allUsersJson.find((user: User) => user.userEmail === loggedInUserEmail);

        if (user) {
            profileArea.innerHTML = `
                <h2>${user.userName}</h2>
                <p>Email: ${user.userEmail}</p>
                <p>Birth Date: ${user.userBirthDate}</p>
            `;
        } else {
            console.error("User profile could not be found.");
        }
    } else {
        console.error("Profile area element not found or user not logged in.");
    }
}

// Initialize the application on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile();
    loadUserEvents();
});
