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

// Function to create a birthday card
function createBirthdayCard(event) {
    let birthdayLists = document.getElementById("birthday-lists");

    if (birthdayLists) {
        let birthdayListHTML = `
           <div class="birthday-list">
              <div class="birthday-image">
                <img src="./images/birthday.avif" alt="birthday" />
              </div>
              <div class="birthday-detail">
                <h5 id="${event.eventStatus}">${event.eventStatus}</h5>
                <h5>${event.eventDate}</h5>
                <p >${event.eventDescription}</p>
              </div>
            </div>
        `;
        birthdayLists.insertAdjacentHTML('beforeend', birthdayListHTML);
    } else {
        console.error('Element with ID "birthday-lists" not found.');
    }
}

// Function to create a wedding card
function createWeddingCard(event) {
    let weddingLists = document.getElementById("wedding-lists");
    if (weddingLists) {
        let weddingListHTML = `
            <div class="wedding-list">
              <div class="wedding-image">
                <img src="./images/marrage.jpg" alt="wedding" />
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

// Function to create a conference card
function createConferenceCard(event) {
    let conferenceLists = document.getElementById("conference-lists");
    if (conferenceLists) {
        let conferenceListHTML = `
           <div class="conferences-list">
              <div class="conference-image">
                <img src="./images/conference.avif" alt="conference" />
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

// Load events from localStorage and create event cards
let allEventJson = JSON.parse(localStorage.getItem("events") || "[]");

allEventJson.forEach(event => {
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
