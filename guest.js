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

//get data from user to store in table 

let guestName = document.getElementById("guest-name");
let guestEmail = document.getElementById("guest-email");
let guestLocation = document.getElementById("guest-location");
let guestNumber = document.getElementById("guest-number");

//guest name error check
function guestNameCheck() {
    let name = guestName.value.trim();
    let nameError = document.getElementById("name-error");
    if (name === '') {
        nameError.innerHTML = "Enter a name..."
        return false;
    }
    else {
        nameError.innerHTML = ""
        return true;
    }
}

//guest email  error check
function guestEmailCheck() {
    let email = guestEmail.value.trim();
    let emailError = document.getElementById("email-error");
    let foundGuest = allGuest.find(guest => guest.guestEmail === email);
    if (email === '') {
        emailError.innerHTML = "Enter an Email...";
        return false;
    }
    else if (foundGuest) {
        emailError.innerHTML = "Guest Already exists...";
        return false;
    }
    else {
        emailError.innerHTML = "";
        return true;
    }
}


//guest location  error check
function guestLocationCheck() {
    let location = guestLocation.value.trim();
    let locationError = document.getElementById("location-error");
    if (location === '') {
        locationError.innerHTML = "Enter a Guest Location..."
        return false;
    }
    else {
        locationError.innerHTML = "";
        return true;
    }
}

//guest contact number  error check
function guestNumberCheck() {
    let number = guestNumber.value.trim();
    let numberError = document.getElementById("number-error");
    if (number === '') {
        numberError.innerHTML = "Enter a Guest Number..."
        return false;
    }
    else if (isNaN(number)) {
        numberError.innerHTML = "Enter a valid Number..."
        return false;
    }
    else {
        numberError.innerHTML = "";
        return true;
    }
}

//add guest object for store in array
const allGuest = [];
function Guest(name, email, location, number) {
    this.guestName = name;
    this.guestEmail = email;
    this.guestLocation = location;
    // this.guestNumber = number;
}




//add guest in table


function addGuest(event) {
    event.preventDefault();
    let message = document.getElementById("success-message");
    let errormessage = document.getElementById("name-error");
    if (guestNameCheck && guestEmailCheck && guestLocationCheck) {
        const newGuest = new Guest(guestName.value, guestEmail.value, guestLocation.value);
        allGuest.push(newGuest);
        let guestTable = document.getElementById("guest-table");
        let tableData = ` <tr>
                            <td>${guestName.value}</td>
                            <td>${guestEmail.value}</td>
                            <td>${guestLocation.value}</td>
                            <td><div class="invite-btn" id="invite-btn"><button onclick="inviteGuest()">Invite</button></td>
                           <td><div class="delete-btn" id="delete-btn"><button onclick="deleteGuest()">Delete</button></td>
                          </tr>`;
        guestTable.innerHTML += tableData;
        guestName.value = "";
        guestEmail.value = "";
        guestLocation.value = "";
        // guestNumber.value = "";
        message.innerHTML = "Guest added successfully...";
        setTimeout(function () {
            message.innerHTML = "";
        }, 3000);
    }
    else {
        errormessage.innerHTML = "Enter all the Mandotry Fields..";
        message.innerHTML = "";
    }

}

// find guest using email id
function findGuest(event) {
    event.preventDefault();

    let findMailElement = document.getElementById("find-guest-email");
    let findMailValue = findMailElement.value.trim();
    let resultMessage = document.getElementById("result-guest-error");
    let searchDisplayArea = document.getElementById("display-search-guest");
    let resultTableBody = document.getElementById("result-guest");
    resultTableBody.innerHTML = "";

    if (findMailValue) {
        let foundGuest = allGuest.find(guest => guest.guestEmail === findMailValue);

        if (foundGuest) {
            searchDisplayArea.style.display = "block";
            resultMessage.innerHTML = "";

            let tableData = `<tr>
                                <td>${foundGuest.guestName}</td>
                                <td>${foundGuest.guestEmail}</td>
                                <td>${foundGuest.guestLocation}</td>
                                <td><div class="invite-btn" id="invite-btn"><button onclick="inviteGuest()">Invite</button></td>
                           <td><div class="delete-btn" id="delete-btn"><button onclick="deleteGuest()">Delete</button></td>
                             </tr>`;
            resultTableBody.innerHTML = tableData;

        } else {
            resultMessage.style.color = "red";
            resultMessage.innerHTML = "No guest found with this email.";
            setTimeout(function () {
                resultMessage.innerHTML = "";
            }, 3000);
        }

    } else {
        resultMessage.style.color = "red";
        resultMessage.innerHTML = "Please enter an email to search.";
        setTimeout(function () {
            resultMessage.innerHTML = "";
        }, 3000);
    }

    findMailElement.value = "";
}
