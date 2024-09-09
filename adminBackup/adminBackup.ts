// Get menu elements
let menu = document.querySelector('menu') as HTMLElement;
let menuIcon = document.querySelector('#menu-icon') as HTMLElement;
let addEventArea = document.getElementById("event-add-block") as HTMLElement;
let notificationArea = document.getElementById("notification-display") as HTMLElement;
let logoutArea = document.getElementById("profile-edit-area") as HTMLElement;

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
    window.location.href = "../adminEvents/events.html";
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

// Function to display backup history
function displayBackupHistory(): void {
    const historyContainer = document.querySelector('.displaBackUpHistory') as HTMLElement;
    const backupHistory = JSON.parse(localStorage.getItem('backupHistory') || "[]");

    historyContainer.innerHTML = '<h2>Backup History</h2>';

    backupHistory.forEach((backup: { timestamp: string, fileName: string }) => {
        const backupDiv = document.createElement('div');
        backupDiv.className = 'backup-item';
        backupDiv.innerHTML = `<p>${backup.timestamp}: <a href="${backup.fileName}" download>${backup.fileName}</a></p>`;
        historyContainer.appendChild(backupDiv);
    });
}

// Backup function to include all local storage data
document.getElementById('backup-btn')?.addEventListener('click', () => {
    const allStorageData: { [key: string]: string | null } = {};

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
            allStorageData[key] = localStorage.getItem(key);
        }
    }

    const jsonData = JSON.stringify({
        localStorage: allStorageData
    });

    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const fileName = `backup-${new Date().toISOString()}.json`;

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);

    // Save backup data to localStorage for history
    const backupHistory = JSON.parse(localStorage.getItem('backupHistory') || "[]");
    backupHistory.push({ timestamp: new Date().toLocaleString(), fileName });
    localStorage.setItem('backupHistory', JSON.stringify(backupHistory));

    // Update the backup history display
    displayBackupHistory();
});

// Initial display of backup history on page load
document.addEventListener("DOMContentLoaded", () => {
    loadUserProfile();
    displayBackupHistory();
});
