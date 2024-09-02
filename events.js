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

function saveEvent(event) {
    event.preventDefault();

    if (nameCheck && dateCheck && descriptionCheck && statusCheck && categoryCheck) {
        let createdEvent = new createEvent(eventName.value, eventDate.value, eventDescription.value, eventStatus.value, eventCategory.value);
        createdEvent.displayData();

        let newEventObject = createdEvent.toPlainObject();
        let allEventJson = JSON.parse(localStorage.getItem("events") || "[]");
        allEventJson.push(newEventObject);
        localStorage.setItem("events", JSON.stringify(allEventJson));
        eventName.value="";
        eventDate.value="";
        eventDescription.value="";
        eventStatus.value="";
        eventCategory.value="";
        setTimeout(function(){
            successMessage.innerHTML="Event Added Successfully...";
        },3000);
    }
    else {
        setTimeout(function () {
            categoryError.innerHTML = "Enter all recquired Fields.."
        }, 3000);
    }
}