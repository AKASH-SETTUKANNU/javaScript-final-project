// menu display area
let menu = document.querySelector('menu');
let menuIcon = document.querySelector('#menu-icon');


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

function addEvent() {
    window.location.href = "events.html";
    // if (addEventArea.style.display === 'none' || addEventArea.style.display === '') {
    //     addEventArea.style.display = 'block';
    //     notificationArea.style.display = 'none';  
    //     logoutArea.style.display = 'none'; 
    // } else {
    //     addEventArea.style.display = 'none'; 
    // }
}

// notification display area
let notificationArea = document.getElementById("notification-display");

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

function displayLogout() {
    if (logoutArea.style.display === 'none' || logoutArea.style.display === '') {
        logoutArea.style.display = 'flex';
        addEventArea.style.display = 'none';
        notificationArea.style.display = 'none';
    } else {
        logoutArea.style.display = 'none';
    }
}

//get data from form

let eventName = document.getElementById("event-name");
let eventDate = document.getElementById("event-date");
let eventDescription = document.getElementById("event-description");
let eventStatus = document.getElementById("event-status");
let eventCategory = document.getElementById("event-category");

let nameError = document.getElementById("name-error");
let dateError = document.getElementById("date-error");
let descriptionError = document.getElementById("description-error");
let eventstatusError = document.getElementById("status-error");
let categoryError = document.getElementById("category-error");
let successMessage = document.getElementById("success-message");

//name error check
function nameCheck() {
    let name = eventName.value.trim();
    if (name == '') {
        nameError.innerHTML = "Enter Event Name..."
        return false;
    }
    else {
        nameError.innerHTML = ""
        return true;
    }
}

//date check
function dateCheck() {
    let date = eventDate.value.trim();
    if (date == '') {
        dateError.innerHTML = "Enter Event Date..."
        return false;
    }
    else {
        dateError.innerHTML = ""
        return true;
    }
}

//description check
function descriptionCheck() {
    let description = eventDescription.value.trim();
    if (description == '') {
        descriptionError.innerHTML = "Enter Event Description..."
        return false;
    }
    else {
        descriptionError.innerHTML = ""
        return true;
    }
}

//event status check

function statusCheck() {
    let status = eventStatus.value.trim();
    if (status == '') {
        eventstatusError.innerHTML = "Enter Event Description..."
        return false;
    }
    else {
        eventstatusError.innerHTML = ""
        return true;
    }
}

//event category check

function categoryCheck() {
    let category = eventCategory.value.trim();
    if (category == '') {
        categoryError.innerHTML = "Enter Event Description..."
        return false;
    }
    else {
        categoryError.innerHTML = ""
        return true;
    }
}

// create object for event 
class createEvent {
    constructor(name, date, description, status, category) {
        this.eventName = name;
        this.eventDate = date;
        this.eventDescription = description;
        this.eventStatus = status;
        this.eventCategory = category;
    }

    displayData() {
        console.log(`event name:${this.eventName}`);
        console.log(`event Date:${this.eventDate}`);
        console.log(`event Description:${this.eventDescription}`);
        console.log(`event Status:${this.eventStatus}`);
        console.log(`event Category:${this.eventCategory}`);
    }

    toPlainObject() {
        return {
            eventName: this.eventName,
            eventDate: this.eventDate,
            eventDescription: this.eventDescription,
            eventStatus: this.eventStatus,
            eventCategory: this.eventCategory
        };
    }
}

// Function to save event data to localStorage
function saveEvent(event) {
    event.preventDefault();

  
    if (nameCheck && dateCheck && descriptionCheck && statusCheck && categoryCheck) {
        let createdEvent = new createEvent(
            eventName.value,
            eventDate.value,
            eventDescription.value,
            eventStatus.value,
            eventCategory.value
        );
        createdEvent.displayData();

        let newEventObject = createdEvent.toPlainObject();
        let allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
        let loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

        // Find the logged-in user
        let user = allUsersJson.find(user => user.userEmail === loggedInUserEmail);

        if (user) {
            // Add event to the user's events
            if (!user.events) {
                user.events = [];
            }
            user.events.push(newEventObject);

            // Save updated users list back to localStorage
            localStorage.setItem("users", JSON.stringify(allUsersJson));

            // Clear the form fields
            eventName.value = "";
            eventDate.value = "";
            eventDescription.value = "";
            eventStatus.value = "";
            eventCategory.value = "";

            // Display success message
            setTimeout(() => {
                successMessage.innerHTML = "Event Added Successfully...";
            }, 3000);
        } else {
            console.error("User not found.");
        }
    } else {
        // Display error message if validation fails
        setTimeout(() => {
            categoryError.innerHTML = "Enter all required fields.";
        }, 3000);
    }
}
// Function to load and display user profile details
function loadUserProfile() {
    let allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
    let loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    let user = allUsersJson.find(user => user.userEmail === loggedInUserEmail);

    console.log("Logged In User Email:", loggedInUserEmail); 
    console.log("User Object:", user); 

    let profileName = document.getElementById("profile-name");
    let dateOfBirth = document.getElementById("profile-dateOfBirth");

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