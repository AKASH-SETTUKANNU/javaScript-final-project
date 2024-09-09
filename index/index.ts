// Rename CustomEvent to EventDetails to avoid conflict with built-in CustomEvent
interface EventDetails {
    id: string;
    eventCategory: string;
    eventStatus: string;
    eventDate: string;
    eventDescription: string;
}

// Define User interface
interface User {
    userEmail: string;
    userName: string;
    userBirthDate: string;
    events?: EventDetails[];
}

// Get menu elements
let menu = document.querySelector('menu') as HTMLElement;
let menuIcon = document.querySelector('#menu-icon') as HTMLElement;
let addEventArea = document.getElementById("event-add-block") as HTMLElement;
let notificationArea = document.getElementById("notification-display") as HTMLElement;
let logoutArea = document.getElementById("profile-edit-area") as HTMLElement;

// Define form element and error elements
const form = document.querySelector('.event-form') as HTMLFormElement;
const popupeventName = document.getElementById("event-name") as HTMLInputElement;
const popupeventDate = document.getElementById("event-date") as HTMLInputElement;
const popupeventDescription = document.getElementById("event-description") as HTMLTextAreaElement;
const popupeventStatus = document.getElementById("event-status") as HTMLSelectElement;
const popupeventCategory = document.getElementById("event-category") as HTMLSelectElement;
const popupsuccessMessage = document.getElementById("success-message") as HTMLElement;

// Error elements
const popupnameError = document.getElementById("name-error") as HTMLElement;
const popupdateError = document.getElementById("date-error") as HTMLElement;
const popupdescriptionError = document.getElementById("description-error") as HTMLElement;
const popupstatusError = document.getElementById("status-error") as HTMLElement;
const popupcategoryError = document.getElementById("category-error") as HTMLElement;

// Variable to store the ID of the event being edited
let eventToEditId: string | null = null;

// Function to toggle menu display
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

// Function to toggle add event display
function addEvent(): void {
    window.location.href = "../events/events.html";
}

// Function to toggle notification display
function displayNotification(): void {
    if (notificationArea.style.display === 'none' || notificationArea.style.display === '') {
        notificationArea.style.display = 'block'; 
        addEventArea.style.display = 'none';
        logoutArea.style.display = 'none'; 
    } else {
        notificationArea.style.display = 'none'; 
    }
}

// Function to toggle logout display
function displayLogout(): void {
    if (logoutArea.style.display === 'none' || logoutArea.style.display === '') {
        logoutArea.style.display = 'flex';
        addEventArea.style.display = 'none'; 
        notificationArea.style.display = 'none';
    } else {
        logoutArea.style.display = 'none'; 
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
// Function to create a birthday card
function createBirthdayCard(event: EventDetails): void {
    let birthdayLists = document.getElementById("birthday-lists") as HTMLElement;
    if (birthdayLists) {
        let birthdayListHTML = `
           <div class="birthday-list" id="${event.id}" >
              <div class="birthday-image">
                <img src="../images/birthday.avif" alt="birthday" />
              </div>
              <div class="birthday-detail">
                <h5 id="${event.eventStatus}">${event.eventStatus}</h5>
                <h5>${event.eventDate}</h5>
                <p>${event.eventDescription}</p>
                <i class="fa-solid fa-info" onclick="displayDetails('${event.id}')" id="info-icon"></i>
                <i class="fa-solid fa-edit" onclick="showEditForm('${event.id}')" id="edit-icon"></i>
                <i class="fa-solid fa-trash" onclick="deleteCard('${event.id}')" id="delete-icon"></i>
              </div>
            </div>
        `;
        birthdayLists.insertAdjacentHTML('beforeend', birthdayListHTML);
    } else {
        console.error('Element with ID "birthday-lists" not found.');
    }
}

// Function to create a wedding card
function createWeddingCard(event: EventDetails): void {
    let weddingLists = document.getElementById("wedding-lists") as HTMLElement;
    if (weddingLists) {
        let weddingListHTML = `
            <div class="wedding-list" id="${event.id} "onclick="displayDetails('${event.id}')">
              <div class="wedding-image">
                <img src="../images/marrage.jpg" alt="wedding" />
              </div>
              <div class="wedding-detail">
                <h5 id="${event.eventStatus}">${event.eventStatus}</h5>
                <h5>${event.eventDate}</h5>
                <p>${event.eventDescription}</p>
                <i class="fa-solid fa-info" onclick="displayDetails('${event.id}')" id="info-icon"></i>
                <i class="fa-solid fa-edit" onclick="showEditForm('${event.id}')" id="edit-icon"></i>
                <i class="fa-solid fa-trash" onclick="deleteCard('${event.id}')" id="delete-icon"></i>
              </div>
            </div>
        `;
        weddingLists.insertAdjacentHTML('beforeend', weddingListHTML);
    } else {
        console.error('Element with ID "wedding-lists" not found.');
    }
}

// Function to create a conference card
function createConferenceCard(event: EventDetails): void {
    let conferenceLists = document.getElementById("conference-lists") as HTMLElement;
    if (conferenceLists) {
        let conferenceListHTML = `
           <div class="conferences-list" id="${event.id}" onclick="displayDetails('${event.id}')">
              <div class="conference-image">
                <img src="../images/conference.avif" alt="conference" />
              </div>
              <div class="conference-detail">
                <h5 id="${event.eventStatus}">${event.eventStatus}</h5>
                <h5>${event.eventDate}</h5>
                <p>${event.eventDescription}</p>
                <i class="fa-solid fa-info" onclick="displayDetails('${event.id}')" id="info-icon"></i>
               <i class="fa-solid fa-edit" onclick="showEditForm('${event.id}')" id="edit-icon"></i>
                <i class="fa-solid fa-trash" onclick="deleteCard('${event.id}')" id="delete-icon"></i>
              </div>
            </div>
        `;
        conferenceLists.insertAdjacentHTML('beforeend', conferenceListHTML);
    } else {
        console.error('Element with ID "conference-lists" not found.');
    }
}

function displayDetails(eventId: string): void {
    const backdrop = document.getElementById("backdrop") as HTMLDivElement;
    const detailImage = document.getElementById("detail-img") as HTMLImageElement;
    const detailName = document.getElementById("detail-name") as HTMLHeadingElement;
    const detailDate = document.getElementById("detail-date") as HTMLHeadingElement;
    const detailDescription = document.getElementById("detail-description") as HTMLParagraphElement;
    const detailCategory = document.getElementById("detail-category") as HTMLSpanElement;
    const detailStatus = document.getElementById("detail-status") as HTMLSpanElement;
    const displayDetails = document.getElementById("display-details") as HTMLDivElement;

    if (!displayDetails) {
        console.error("Display details element not found.");
        return;
    }

    // Retrieve user data from localStorage
    const allUsersJson: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

    if (loggedInUserEmail) {
        const user = allUsersJson.find(user => user.userEmail === loggedInUserEmail);

        if (user && user.events) {
            const event = user.events.find(e => e.id === eventId);

            if (event) {
                // Populate the details
                detailImage.src = getEventImageByCategory(event.eventCategory);
                detailName.textContent = event.eventCategory;
                detailDate.textContent = `Event Date:${event.eventDate}`;
                detailDescription.textContent = event.eventDescription;
                detailCategory.textContent = `Event Category: ${event.eventCategory}`;
                
                // Set the status and its id
                detailStatus.textContent = ` ${event.eventStatus}`;
                detailStatus.id = event.eventStatus.toLowerCase(); 
                
                // Show the details div
                backdrop.classList.remove('hidden');
                backdrop.classList.add('visible');
                displayDetails.classList.remove('hidden');
                displayDetails.classList.add('visible');
            } else {
                console.error("Event not found.");
            }
        } else {
            console.error("User or events not found.");
        }
    } else {
        console.error("Logged in user email not found.");
    }
}





// Function to determine image based on event category
function getEventImageByCategory(category: string): string {
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

function closeDetail(): void {
    const displayDetails = document.getElementById("display-details") as HTMLDivElement;
    const backdrop = document.getElementById("backdrop") as HTMLDivElement;
    if (displayDetails.classList.contains('visible')) {
        displayDetails.classList.remove('visible');
        displayDetails.classList.add('hidden');
        backdrop.classList.remove('visible');
        backdrop.classList.add('hidden');
        window.location.reload();
    }
   
       
  
}


// Function to delete a card and its data from localStorage
function deleteCard(eventId: string): void {
    // Remove the card from the DOM
    let element = document.getElementById(eventId);
    if (element) {
        element.remove();
    } else {
        console.error(`Element with ID "${eventId}" not found.`);
    }

    // Remove the event from localStorage
    const usersJson = localStorage.getItem("users");
    const allUsersJson: User[] = usersJson ? JSON.parse(usersJson) : [];
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

    if (loggedInUserEmail) {
        const user = allUsersJson.find(user => user.userEmail === loggedInUserEmail);

        if (user && user.events) {
            user.events = user.events.filter(event => event.id !== eventId);
            localStorage.setItem("users", JSON.stringify(allUsersJson));
        } else {
            console.error("User or events not found.");
        }
    } else {
        console.error("Logged in user email not found.");
    }
}


// Show the form for editing an event
function showEditForm(eventId: string): void {
    form.style.display = 'flex'; 
    const usersJson = localStorage.getItem("users");
    const allUsersJson: User[] = usersJson ? JSON.parse(usersJson) : [];
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

    if (loggedInUserEmail) {
        const user = allUsersJson.find(user => user.userEmail === loggedInUserEmail);
        if (user && user.events) {
            const event = user.events.find(e => e.id === eventId);
            console.log('Event ID:', eventId);
            console.log('Events:', user.events);
            if (event) {
                // Populate the form with existing event data
                popupeventName.value = event.eventCategory;
                popupeventDate.value = event.eventDate;
                popupeventDescription.value = event.eventDescription;
                popupeventStatus.value = event.eventStatus;
                popupeventCategory.value = event.eventCategory;
                eventToEditId = eventId; // Set the ID of the event being edited
                // Display the form
                addEventArea.style.display = 'block';
            } else {
                console.error("Event not found.");
            }
        } else {
            console.error("User or events not found.");
        }
    } else {
        console.error("Logged in user email not found.");
    }
}

// Save or update event in localStorage
function updateEvent(event: Event): void {
    event.preventDefault();

    if (popupnameCheck() && popupdateCheck() && popupdescriptionCheck() && popupstatusCheck() && popupcategoryCheck()) {
        const allUsersJson: User[] = JSON.parse(localStorage.getItem("users") || "[]");
        const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

        if (loggedInUserEmail) {
            const user = allUsersJson.find((user) => user.userEmail === loggedInUserEmail);

            if (user) {
                if (!user.events) {
                    user.events = [];
                }

                // Find the event to update
                const eventIndex = user.events.findIndex(event => event.id === eventToEditId);

                if (eventIndex > -1) {
                    user.events[eventIndex] = {
                        id: eventToEditId!,
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
                    setTimeout(() => {
                       
                        form.style.display = 'none'; 
                        popupsuccessMessage.innerHTML = "";
                    }, 3000);
                } else {
                    console.error("Event not found.");
                }
            } else {
                console.error("User not found.");
            }
        } else {
            console.error("Logged in user email not found.");
        }
    } else {
        setTimeout(() => {
            popupcategoryError.innerHTML = "Enter all required fields.";
        }, 3000);
    }
}

// Attach event handler to the form
form?.addEventListener('submit', updateEvent);

// Load events for the logged-in user from localStorage and create event cards
function loadUserEvents(): void {
    const usersJson = localStorage.getItem("users");
    const allUsersJson: User[] = usersJson ? JSON.parse(usersJson) : [];
    const loggedInUserEmail: string | null = localStorage.getItem("loggedInUserEmail");

    if (loggedInUserEmail) {
        const user = allUsersJson.find((user) => user.userEmail === loggedInUserEmail);

        if (user && user.events) {
            user.events.forEach(event => {
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
                        console.error(`Unknown event category: ${event.eventCategory}`);
                }
            });
        } else {
            console.error("User or events not found.");
        }
    } else {
        console.error("Logged in user email not found.");
    }
}

// Call this function to load events on page load
window.onload = loadUserEvents;

// Validation functions for form
function popupnameCheck(): boolean {
    if (!popupeventName.value.trim()) {
        popupnameError.innerHTML = "Event name is required.";
        return false;
    } else {
        popupnameError.innerHTML = "";
        return true;
    }
}

function popupdateCheck(): boolean {
    if (!popupeventDate.value.trim()) {
        popupdateError.innerHTML = "Event date is required.";
        return false;
    } else {
        popupdateError.innerHTML = "";
        return true;
    }
}

function popupdescriptionCheck(): boolean {
    if (!popupeventDescription.value.trim()) {
        popupdescriptionError.innerHTML = "Event description is required.";
        return false;
    } else {
        popupdescriptionError.innerHTML = "";
        return true;
    }
}

function popupstatusCheck(): boolean {
    if (!popupeventStatus.value.trim()) {
        popupstatusError.innerHTML = "Event status is required.";
        return false;
    } else {
        popupstatusError.innerHTML = "";
        return true;
    }
}

function popupcategoryCheck(): boolean {
    if (!popupeventCategory.value.trim()) {
        popupcategoryError.innerHTML = "Event category is required.";
        return false;
    } else {
        popupcategoryError.innerHTML = "";
        return true;
    }
}
// Call functions on page load
document.addEventListener("DOMContentLoaded", () => {
    loadUserProfile();
  
});
