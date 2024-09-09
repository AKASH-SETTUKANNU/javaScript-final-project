// Get menu elements
const menu = document.querySelector('menu') as HTMLElement;
const menuIcon = document.querySelector('#menu-icon') as HTMLElement;
const addEventArea = document.getElementById("event-add-block") as HTMLElement;
const notificationArea = document.getElementById("notification-display") as HTMLElement;
const logoutArea = document.getElementById("profile-edit-area") as HTMLElement;

// Menu display function
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

// Add event function
function addEvent(): void {
    window.location.href = "../events/events.html";
}

// Notification display function
function displayNotification(): void {
    if (notificationArea.style.display === 'none' || notificationArea.style.display === '') {
        notificationArea.style.display = 'block';
        addEventArea.style.display = 'none';
        logoutArea.style.display = 'none';
    } else {
        notificationArea.style.display = 'none';
    }
}

// Logout display function
function displayLogout(): void {
    if (logoutArea.style.display === 'none' || logoutArea.style.display === '') {
        logoutArea.style.display = 'flex';
        addEventArea.style.display = 'none';
        notificationArea.style.display = 'none';
    } else {
        logoutArea.style.display = 'none';
    }
}

// Guest form elements
const guestName = document.getElementById("guest-name") as HTMLInputElement;
const guestEmail = document.getElementById("guest-email") as HTMLInputElement;
const guestLocation = document.getElementById("guest-location") as HTMLInputElement;
const guestNumber = document.getElementById("guest-number") as HTMLInputElement;

// Guest validation functions
function guestNameCheck(): boolean {
    const name = guestName.value.trim();
    const nameError = document.getElementById("name-error") as HTMLElement;
    if (name === '') {
        nameError.innerHTML = "Enter a name...";
        return false;
    } else {
        nameError.innerHTML = "";
        return true;
    }
}

function guestEmailCheck(): boolean {
    const email = guestEmail.value.trim();
    const emailError = document.getElementById("email-error") as HTMLElement;
    const allGuests = JSON.parse(localStorage.getItem("guests") || "[]");
    const foundGuest = allGuests.find((guest: any) => guest.guestEmail === email);
    if (email === '') {
        emailError.innerHTML = "Enter an Email...";
        return false;
    } else if (foundGuest) {
        emailError.innerHTML = "Guest Already exists...";
        return false;
    } else {
        emailError.innerHTML = "";
        return true;
    }
}

function guestLocationCheck(): boolean {
    const location = guestLocation.value.trim();
    const locationError = document.getElementById("location-error") as HTMLElement;
    if (location === '') {
        locationError.innerHTML = "Enter a Guest Location...";
        return false;
    } else {
        locationError.innerHTML = "";
        return true;
    }
}

function guestNumberCheck(): boolean {
    const number = guestNumber.value.trim();
    const numberError = document.getElementById("number-error") as HTMLElement;
    if (number === '') {
        numberError.innerHTML = "Enter a Guest Number...";
        return false;
    } else if (isNaN(Number(number))) {
        numberError.innerHTML = "Enter a valid Number...";
        return false;
    } else {
        numberError.innerHTML = "";
        return true;
    }
}

// Guest constructor
class Guest {
    guestName: string;
    guestEmail: string;
    guestLocation: string;

    constructor(name: string, email: string, location: string) {
        this.guestName = name;
        this.guestEmail = email;
        this.guestLocation = location;
    }
}

// Load guests from local storage and display them
function loadGuests(): void {
    const allGuests = JSON.parse(localStorage.getItem("guests") || "[]");
    allGuests.forEach((guest: Guest) => {
        addGuestToTable(guest);
    });
}

// Add guest to the table
function addGuestToTable(guest: Guest): void {
    const guestTable = document.getElementById("guest-table") as HTMLElement;
    const tableData = `
        <tr>
            <td>${guest.guestName}</td>
            <td>${guest.guestEmail}</td>
            <td>${guest.guestLocation}</td>
            <td><button onclick="inviteGuest('${guest.guestEmail}', '${guest.guestName}')" id="invite-btn">Invite</button></td>
            <td><button onclick="deleteGuest('${guest.guestEmail}')" id="delete-btn">Delete</button></td>
        </tr>`;
    guestTable.innerHTML += tableData;
}

// Add guest to local storage and table
function addGuest(event: Event): void {
    event.preventDefault();
    const message = document.getElementById("success-message") as HTMLElement;
    const errorMessage = document.getElementById("name-error") as HTMLElement;

    if (guestNameCheck() && guestEmailCheck() && guestLocationCheck()) {
        const newGuest = new Guest(guestName.value, guestEmail.value, guestLocation.value);

        // Save guest to local storage
        const allGuests = JSON.parse(localStorage.getItem("guests") || "[]");
        allGuests.push(newGuest);
        localStorage.setItem("guests", JSON.stringify(allGuests));

        // Add guest to table
        addGuestToTable(newGuest);

        // Clear form fields
        guestName.value = "";
        guestEmail.value = "";
        guestLocation.value = "";

        message.innerHTML = "Guest added successfully...";
        setTimeout(() => {
            message.innerHTML = "";
        }, 3000);
    } else {
        errorMessage.innerHTML = "Enter all the Mandatory Fields..";
        message.innerHTML = "";
    }
}

// Find guest using email id
function findGuest(event: Event): void {
    event.preventDefault();

    const findMailElement = document.getElementById("find-guest-email") as HTMLInputElement;
    const findMailValue = findMailElement.value.trim();
    const resultMessage = document.getElementById("result-guest-error") as HTMLElement;
    const searchDisplayArea = document.getElementById("display-search-guest") as HTMLElement;
    const resultTableBody = document.getElementById("result-guest") as HTMLElement;
    resultTableBody.innerHTML = "";

    if (findMailValue) {
        const allGuests = JSON.parse(localStorage.getItem("guests") || "[]");
        const foundGuest = allGuests.find((guest: Guest) => guest.guestEmail === findMailValue);

        if (foundGuest) {
            searchDisplayArea.style.display = "block";
            resultMessage.innerHTML = "";

            const tableData = `
                <tr>
                    <td>${foundGuest.guestName}</td>
                    <td>${foundGuest.guestEmail}</td>
                    <td>${foundGuest.guestLocation}</td>
                    <td><button onclick="inviteGuest('${foundGuest.guestEmail}', '${foundGuest.guestName}')" id="invite-btn">Invite</button></td>
                    <td><button onclick="deleteGuest('${foundGuest.guestEmail}')" id="delete-btn">Delete</button></td>
                </tr>`;
            resultTableBody.innerHTML = tableData;

        } else {
            resultMessage.style.color = "red";
            resultMessage.innerHTML = "No guest found with this email.";
            setTimeout(() => {
                resultMessage.innerHTML = "";
            }, 3000);
        }

    } else {
        resultMessage.style.color = "red";
        resultMessage.innerHTML = "Please enter an email to search.";
        setTimeout(() => {
            resultMessage.innerHTML = "";
        }, 3000);
    }

    findMailElement.value = "";
}

// Delete guest
function deleteGuest(email: string): void {
    const allGuests = JSON.parse(localStorage.getItem("guests") || "[]");
    const index = allGuests.findIndex((guest: Guest) => guest.guestEmail === email);
    if (index > -1) {
        allGuests.splice(index, 1);
        localStorage.setItem("guests", JSON.stringify(allGuests));

        // Remove the guest row from the guest table
        const guestTable = document.getElementById("guest-table") as HTMLElement;
        if (guestTable) {
            const rows = guestTable.querySelectorAll('tr');
            rows.forEach(row => {
                const emailCell = row.querySelector('td:nth-child(2)');
                if (emailCell && emailCell.textContent === email) {
                    row.remove();
                }
            });
        }

        // Remove the guest row from the search result table
        const searchResultTable = document.getElementById("result-guest") as HTMLElement;
        if (searchResultTable) {
            const searchResultRows = searchResultTable.querySelectorAll('tr');
            searchResultRows.forEach(row => {
                const emailCell = row.querySelector('td:nth-child(2)');
                if (emailCell && emailCell.textContent === email) {
                    row.remove();
                    const displaySearchGuest = document.getElementById("display-search-guest") as HTMLElement;
                    if (displaySearchGuest) {
                        displaySearchGuest.style.display = "none";
                    }
                }
            });
        }

        alert("Guest deleted!");
    } else {
        console.error("Guest with this email not found.");
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
// Call functions on page load
document.addEventListener("DOMContentLoaded", () => {
    loadUserProfile();
   
});
