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
        backupDiv.innerHTML = `<p>Time: ${backup.timestamp} File: <a href="${backup.fileName}" download>${backup.fileName}</a></p>`;
        historyContainer.appendChild(backupDiv);
    });
}

// Function to display restore history
function displayRestoreHistory(): void {
    const restoreHistoryContainer = document.querySelector('.displayRestoreHistory') as HTMLElement;
    const restoreHistory = JSON.parse(localStorage.getItem('restoreHistory') || "[]");

    restoreHistoryContainer.innerHTML = '<h2>Restore History</h2>';

    restoreHistory.forEach((restore: { timestamp: string, fileName: string }) => {
        const restoreDiv = document.createElement('div');
        restoreDiv.className = 'backup-item';
        restoreDiv.innerHTML = `<p>Time: ${restore.timestamp} Restored File: ${restore.fileName}</p>`;
        restoreHistoryContainer.appendChild(restoreDiv);
    });
}

// Function to merge data (if necessary)
function mergeData(existingValue: string, newValue: string): string {
    try {
        const existingData = JSON.parse(existingValue);
        const newData = JSON.parse(newValue);
        
        // Merge the existing and new data. Adjust merging logic as needed.
        // Here, simply merging arrays or objects for demonstration purposes.
        if (Array.isArray(existingData) && Array.isArray(newData)) {
            return JSON.stringify([...existingData, ...newData]);
        } else if (typeof existingData === 'object' && typeof newData === 'object') {
            return JSON.stringify({ ...existingData, ...newData });
        } else {
            return newValue; // No merge needed for non-array, non-object data
        }
    } catch (error) {
        console.error("Error merging data:", error);
        return newValue; // Fallback to newValue in case of error
    }
}

// Function to save restore history
function saveRestoreHistory(fileName: string): void {
    const restoreHistory = JSON.parse(localStorage.getItem('restoreHistory') || "[]");
    restoreHistory.push({ timestamp: new Date().toLocaleString(), fileName });
    localStorage.setItem('restoreHistory', JSON.stringify(restoreHistory));
}

// Function to handle file upload and restore data
function restoreData(file: File): void {
    const reader = new FileReader();
    
    reader.onload = function(event) {
        try {
            const jsonData = JSON.parse(event.target?.result as string);
            if (jsonData.localStorage) {
                // Merge the localStorage data from the file with the existing localStorage
                for (const [key, value] of Object.entries(jsonData.localStorage)) {
                    const existingValue = localStorage.getItem(key);
                    if (existingValue) {
                        // If there's already data for this key, merge it if necessary
                        const mergedValue = mergeData(existingValue, value as string);
                        localStorage.setItem(key, mergedValue);
                    } else {
                        // If no existing data, just set the new value
                        localStorage.setItem(key, value as string);
                    }
                }

                // Save restore data to localStorage for history
                saveRestoreHistory(file.name);
                
                // Update the backup and restore history display
                displayBackupHistory();
                displayRestoreHistory();
                
                alert("Data restored successfully.");
            } else {
                alert("Invalid file format.");
            }
        } catch (error) {
            console.error("Error reading or parsing file:", error);
            alert("Error reading or parsing file.");
        }
    };
    
    reader.readAsText(file);
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

    // Get the logged-in user's name and use it in the file name
    const userName = getLoggedInUserName();
    const fileName = userName ? `backup-${userName}-${new Date().toISOString()}.json` : `backup-${new Date().toISOString()}.json`;

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

// Function to get logged-in user's name
function getLoggedInUserName(): string | null {
    const allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

    if (loggedInUserEmail) {
        const user = allUsersJson.find((user: any) => user.userEmail === loggedInUserEmail);
        if (user) {
            return user.userName;
        } else {
            console.error("User not found in localStorage.");
        }
    } else {
        console.error("Logged in user email not found.");
    }
    return null;
}

// Add event listener for restore button
document.getElementById('restore-btn')?.addEventListener('click', () => {
    const fileInput = document.getElementById('restore-file') as HTMLInputElement;
    if (fileInput.files?.length) {
        restoreData(fileInput.files[0]);
    } else {
        alert("Please select a file to restore.");
    }
});

// Initial display of backup and restore history on page load
document.addEventListener("DOMContentLoaded", () => {
    loadUserProfile();
    displayBackupHistory();
    displayRestoreHistory();
});
