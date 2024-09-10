// Function to toggle menu display
function menubarDisplay(): void {
    const menu = document.querySelector('menu') as HTMLElement | null;
    const addEventArea = document.getElementById("event-add-block") as HTMLElement | null;
    const notificationArea = document.getElementById("notification-display") as HTMLElement | null;
    const logoutArea = document.getElementById("profile-edit-area") as HTMLElement | null;

    if (menu) {
        if (menu.style.display === 'none' || menu.style.display === '') {
            menu.style.display = 'block';
            if (addEventArea) addEventArea.style.display = 'none';
            if (notificationArea) notificationArea.style.display = 'none';
            if (logoutArea) logoutArea.style.display = 'none';
        } else {
            menu.style.display = 'none';
        }
    }
}

// Function to navigate to add event page
function addEvent(): void {
    window.location.href = "../adminEvents/events.html";
}

// Function to toggle notification display
function displayNotification(): void {
    const notificationArea = document.getElementById("notification-display") as HTMLElement | null;
    if (notificationArea) {
        notificationArea.style.display = (notificationArea.style.display === 'none' || notificationArea.style.display === '') ? 'block' : 'none';
    }
}

// Function to toggle logout display
function displayLogout(): void {
    const logoutArea = document.getElementById("profile-edit-area") as HTMLElement | null;
    if (logoutArea) {
        logoutArea.style.display = (logoutArea.style.display === 'none' || logoutArea.style.display === '') ? 'flex' : 'none';
    }
}

// Load and display user profile details
function loadUserProfile(): void {
    const allUsersJson = JSON.parse(localStorage.getItem("users") || "[]") as Array<{ userEmail: string, userName: string, userBirthDate: string }>;
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

    if (loggedInUserEmail) {
        const user = allUsersJson.find(user => user.userEmail === loggedInUserEmail);
        const profileName = document.getElementById("profile-name") as HTMLElement | null;
        const dateOfBirth = document.getElementById("profile-dateOfBirth") as HTMLElement | null;

        if (user && profileName && dateOfBirth) {
            profileName.innerText = user.userName;
            dateOfBirth.innerText = user.userBirthDate;
        } else {
            console.error("Profile elements or user data not found.");
        }
    } else {
        console.error("Logged in user email not found.");
    }
}

// Function to merge data (if necessary)
function mergeData(existingValue: string, newValue: string): string {
    try {
        const existingData = JSON.parse(existingValue);
        const newData = JSON.parse(newValue);

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

// Function to save a new backup entry
function saveBackupHistory(fileName: string): void {
    const backupHistory = JSON.parse(localStorage.getItem('backupHistory') || "[]") as Array<{ timestamp: string, fileName: string }>;

    const isDuplicate = backupHistory.some(entry => entry.fileName === fileName);

    if (!isDuplicate) {
        backupHistory.push({ timestamp: new Date().toLocaleString(), fileName });
        localStorage.setItem('backupHistory', JSON.stringify(backupHistory));
    }
}

// Function to save a new restore entry
function saveRestoreHistory(fileName: string): void {
    const restoreHistory = JSON.parse(localStorage.getItem('restoreHistory') || "[]") as Array<{ timestamp: string, fileName: string }>;

    const isDuplicate = restoreHistory.some(entry => entry.fileName === fileName);

    if (!isDuplicate) {
        restoreHistory.push({ timestamp: new Date().toLocaleString(), fileName });
        localStorage.setItem('restoreHistory', JSON.stringify(restoreHistory));
    }
}

// Function to display backup history
function displayBackupHistory(): void {
    const historyContainer = document.querySelector('.displaBackUpHistory') as HTMLElement | null;
    const backupHistory = JSON.parse(localStorage.getItem('backupHistory') || "[]") as Array<{ timestamp: string, fileName: string }>;

    if (historyContainer) {
        historyContainer.innerHTML = '<h2>Backup History</h2>';
        backupHistory.forEach(backup => {
            const backupDiv = document.createElement('div');
            backupDiv.className = 'backup-item';
            backupDiv.innerHTML = `<p>Time: ${backup.timestamp} File: <a href="${backup.fileName}" download>${backup.fileName}</a></p>`;
            historyContainer.appendChild(backupDiv);
        });
    }
}

// Function to display restore history
function displayRestoreHistory(): void {
    const restoreHistoryContainer = document.querySelector('.displayRestoreHistory') as HTMLElement | null;
    const restoreHistory = JSON.parse(localStorage.getItem('restoreHistory') || "[]") as Array<{ timestamp: string, fileName: string }>;

    if (restoreHistoryContainer) {
        restoreHistoryContainer.innerHTML = '<h2>Restore History</h2>';
        restoreHistory.forEach(restore => {
            const restoreDiv = document.createElement('div');
            restoreDiv.className = 'backup-item';
            restoreDiv.innerHTML = `<p>Time: ${restore.timestamp} Restored File: ${restore.fileName}</p>`;
            restoreHistoryContainer.appendChild(restoreDiv);
        });
    }
}

// Function to handle file upload and restore data
function restoreData(file: File): void {
    const reader = new FileReader();

    reader.onload = function(event) {
        try {
            const jsonData = JSON.parse(event.target?.result as string);
            if (jsonData.localStorage) {
                for (const [key, value] of Object.entries(jsonData.localStorage)) {
                    const existingValue = localStorage.getItem(key);
                    if (existingValue) {
                        const mergedValue = mergeData(existingValue, value as string);
                        localStorage.setItem(key, mergedValue);
                    } else {
                        localStorage.setItem(key, value as string);
                    }
                }

                saveRestoreHistory(file.name);
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

    const userName = getLoggedInUserName();
    const fileName = userName ? `backup-${userName}-${new Date().toISOString()}.json` : `backup-${new Date().toISOString()}.json`;

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);

    saveBackupHistory(fileName);
    displayBackupHistory();
});

// Function to get logged-in user's name
function getLoggedInUserName(): string | null {
    const allUsersJson = JSON.parse(localStorage.getItem("users") || "[]") as Array<{ userEmail: string, userName: string }>;
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

    if (loggedInUserEmail) {
        const user = allUsersJson.find(user => user.userEmail === loggedInUserEmail);
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
    const fileInput = document.getElementById('file-input') as HTMLInputElement | null;
    if (fileInput && fileInput.files?.length) {
        restoreData(fileInput.files[0]);
    } else {
        alert("Please select a file to restore.");
    }
});

// Update file name display
const fileNameElement = document.getElementById('file-name') as HTMLElement | null;
if (fileNameElement) {
    document.getElementById('file-input')?.addEventListener('change', function(event) {
        const fileName = (event.target as HTMLInputElement).files?.[0]?.name ?? 'No file chosen';
        if (fileNameElement) {
            fileNameElement.textContent = fileName;
        }
    });
}

// Function to clear backup history
function clearBackupHistory(): void {
    localStorage.removeItem('backupHistory');
    displayBackupHistory();
}

// Function to clear restore history
function clearRestoreHistory(): void {
    localStorage.removeItem('restoreHistory');
    displayRestoreHistory();
}

// Add event listeners for clear history buttons
document.getElementById('clear-backup-history')?.addEventListener('click', clearBackupHistory);
document.getElementById('clear-restore-history')?.addEventListener('click', clearRestoreHistory);

// Initial display of backup and restore history on page load
document.addEventListener("DOMContentLoaded", () => {
    loadUserProfile();
    displayBackupHistory();
    displayRestoreHistory();
});
