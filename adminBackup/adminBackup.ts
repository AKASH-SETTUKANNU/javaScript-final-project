// Function to save backup history
function saveBackupHistory(fileName: string): void {
    const backupHistory = JSON.parse(localStorage.getItem('backupHistory') || "[]") as Array<{ timestamp: string, fileName: string }>;
    const isDuplicate = backupHistory.some(entry => entry.fileName === fileName);

    if (!isDuplicate) {
        backupHistory.push({ timestamp: new Date().toLocaleString(), fileName });
        localStorage.setItem('backupHistory', JSON.stringify(backupHistory));
    }
}

// Function to save restore history
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
    const historyContainer = document.querySelector('.displayBackupHistory .backup-history-items') as HTMLElement | null;
    const backupHistory = JSON.parse(localStorage.getItem('backupHistory') || "[]") as Array<{ timestamp: string, fileName: string }>;

    if (historyContainer) {
        historyContainer.innerHTML = '';
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
    const restoreHistoryContainer = document.querySelector('.displayRestoreHistory .restore-history-items') as HTMLElement | null;
    const restoreHistory = JSON.parse(localStorage.getItem('restoreHistory') || "[]") as Array<{ timestamp: string, fileName: string }>;

    if (restoreHistoryContainer) {
        restoreHistoryContainer.innerHTML = '';
        restoreHistory.forEach(restore => {
            const restoreDiv = document.createElement('div');
            restoreDiv.className = 'restore-item';
            restoreDiv.innerHTML = `<p>Time: ${restore.timestamp} Restored File: ${restore.fileName}</p>`;
            restoreHistoryContainer.appendChild(restoreDiv);
        });
    }
}

// Function to clear backup history
function clearBackupHistory(): void {
    localStorage.removeItem('backupHistory');
    displayBackupHistory(); // Refresh display
}

// Function to clear restore history
function clearRestoreHistory(): void {
    localStorage.removeItem('restoreHistory');
    displayRestoreHistory(); // Refresh display
}

// Function to handle menu display
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

// Function to handle adding events
function addEvent(): void {
    window.location.href = "../adminEvents/events.html";
}

// Function to display notifications
function displayNotification(): void {
    const notificationArea = document.getElementById("notification-display") as HTMLElement | null;
    if (notificationArea) {
        notificationArea.style.display = (notificationArea.style.display === 'none' || notificationArea.style.display === '') ? 'block' : 'none';
    }
}

// Function to display logout area
function displayLogout(): void {
    const logoutArea = document.getElementById("profile-edit-area") as HTMLElement | null;
    if (logoutArea) {
        logoutArea.style.display = (logoutArea.style.display === 'none' || logoutArea.style.display === '') ? 'flex' : 'none';
    }
}

// Function to load user profile information
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

// Function to merge data
function mergeData(existingValue: string, newValue: string): string {
    try {
        const existingData = JSON.parse(existingValue);
        const newData = JSON.parse(newValue);

        if (Array.isArray(existingData) && Array.isArray(newData)) {
            return JSON.stringify([...existingData, ...newData]);
        } else if (typeof existingData === 'object' && typeof newData === 'object') {
            return JSON.stringify({ ...existingData, ...newData });
        } else {
            return newValue;
        }
    } catch (error) {
        console.error("Error merging data:", error);
        return newValue;
    }
}

// Function to restore data from file
function restoreData(file: File): void {
    const reader = new FileReader();
    const restoreSuccessMessage = document.getElementById("restore-success-message") as HTMLSpanElement | null;
    const restoreErrorMessage = document.getElementById("restore-error-message") as HTMLSpanElement | null;

    if (restoreSuccessMessage) {
        restoreSuccessMessage.textContent = '';
    }
    if (restoreErrorMessage) {
        restoreErrorMessage.textContent = '';
    }

    reader.onload = function(event) {
        try {
            const fileContent = event.target?.result as string;
            if (fileContent) {
                // Parse the file content as JSON
                const parsedContent = JSON.parse(fileContent);

                // Iterate over the localStorage keys and update values
                if (parsedContent.localStorage) {
                    Object.keys(parsedContent.localStorage).forEach(key => {
                        localStorage.setItem(key, parsedContent.localStorage[key]);
                    });
                }

                const fileInputContainer = document.getElementById("file-input-container") as HTMLDivElement;
                if (fileInputContainer && fileInputContainer.style.display === 'block') {
                    fileInputContainer.style.display = 'none';
                }
                saveRestoreHistory(file.name);
                displayRestoreHistory();
                if (restoreSuccessMessage) {
                    restoreSuccessMessage.textContent = 'Data restored successfully.';
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }
              
            }
        } catch (error) {
            console.error("Error restoring data:", error);
            if (restoreErrorMessage) {
                restoreErrorMessage.textContent = 'Error restoring data. Please try again.';
            }
        }
    };

    reader.onerror = function() {
        if (restoreErrorMessage) {
            restoreErrorMessage.textContent = 'Error reading file. Please ensure it is a valid JSON file.';
        }
    };

    reader.readAsText(file);
}

// Event listener for the restore button
const restoreBtn = document.getElementById("restore-btn") as HTMLButtonElement;
restoreBtn.addEventListener('click', () => {
    const fileInputContainer = document.getElementById("file-input-container") as HTMLDivElement;
    if (fileInputContainer) {
        fileInputContainer.style.display = fileInputContainer.style.display === 'none' ? 'block' : 'none';
    }
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput?.files?.length) {
        const file = fileInput.files[0];
        restoreData(file);
    } else {
        const restoreErrorMessage = document.getElementById("restore-error-message") as HTMLSpanElement | null;
        if (restoreErrorMessage) {
            restoreErrorMessage.textContent = 'Please upload a file to restore.';
        }
    }
});



// Handle file input change event
const fileInput = document.getElementById("file-input") as HTMLInputElement;
fileInput.addEventListener('change', function() {
    const fileName = fileInput.files?.[0]?.name || 'No file chosen';
    const fileNameSpan = document.getElementById("file-name") as HTMLSpanElement;
    if (fileNameSpan) {
        fileNameSpan.textContent = fileName;
    }
    // Call disappearmessage when file is selected
    disappearmessage();
});


// Function to display file area
function displayFileArea(): void {
    const restoreSuccessMessage = document.getElementById("restore-success-message") as HTMLSpanElement | null;
    const fileInputContainer = document.getElementById("file-input-container") as HTMLDivElement;
    if (fileInputContainer) {
        if (fileInputContainer.style.display === 'none') {
            fileInputContainer.style.display = 'block';
            if (restoreSuccessMessage) {
                restoreSuccessMessage.textContent = '';
            }
        }
    }
}

// Event listener for the backup button
const backupBtn = document.getElementById("backup-btn") as HTMLButtonElement;
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
// Function to hide the error message
function disappearmessage(): void {
    const restoreErrorMessage = document.getElementById("restore-error-message") as HTMLSpanElement | null;
    if (restoreErrorMessage) {
        restoreErrorMessage.style.display = 'none';
    }
}

// Event listener for clear backup history button
const clearBackupHistoryBtn = document.getElementById("clear-backup-history") as HTMLButtonElement;
clearBackupHistoryBtn.addEventListener('click', clearBackupHistory);

// Event listener for clear restore history button
const clearRestoreHistoryBtn = document.getElementById("clear-restore-history") as HTMLButtonElement;
clearRestoreHistoryBtn.addEventListener('click', clearRestoreHistory);

// Display history on page load
document.addEventListener('DOMContentLoaded', () => {
    displayBackupHistory();
    displayRestoreHistory();
    loadUserProfile();
});
