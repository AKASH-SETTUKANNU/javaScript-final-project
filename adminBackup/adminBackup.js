var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
// Function to save backup history
function saveBackupHistory(fileName) {
    var backupHistory = JSON.parse(localStorage.getItem('backupHistory') || "[]");
    var isDuplicate = backupHistory.some(function (entry) { return entry.fileName === fileName; });
    if (!isDuplicate) {
        backupHistory.push({ timestamp: new Date().toLocaleString(), fileName: fileName });
        localStorage.setItem('backupHistory', JSON.stringify(backupHistory));
    }
}
// Function to save restore history
function saveRestoreHistory(fileName) {
    var restoreHistory = JSON.parse(localStorage.getItem('restoreHistory') || "[]");
    var isDuplicate = restoreHistory.some(function (entry) { return entry.fileName === fileName; });
    if (!isDuplicate) {
        restoreHistory.push({ timestamp: new Date().toLocaleString(), fileName: fileName });
        localStorage.setItem('restoreHistory', JSON.stringify(restoreHistory));
    }
}
// Function to display backup history
function displayBackupHistory() {
    var historyContainer = document.querySelector('.displayBackupHistory .backup-history-items');
    var backupHistory = JSON.parse(localStorage.getItem('backupHistory') || "[]");
    if (historyContainer) {
        historyContainer.innerHTML = '';
        backupHistory.forEach(function (backup) {
            var backupDiv = document.createElement('div');
            backupDiv.className = 'backup-item';
            backupDiv.innerHTML = "<p>Time: ".concat(backup.timestamp, " File: <a href=\"").concat(backup.fileName, "\" download>").concat(backup.fileName, "</a></p>");
            historyContainer.appendChild(backupDiv);
        });
    }
}
// Function to display restore history
function displayRestoreHistory() {
    var restoreHistoryContainer = document.querySelector('.displayRestoreHistory .restore-history-items');
    var restoreHistory = JSON.parse(localStorage.getItem('restoreHistory') || "[]");
    if (restoreHistoryContainer) {
        restoreHistoryContainer.innerHTML = '';
        restoreHistory.forEach(function (restore) {
            var restoreDiv = document.createElement('div');
            restoreDiv.className = 'restore-item';
            restoreDiv.innerHTML = "<p>Time: ".concat(restore.timestamp, " Restored File: ").concat(restore.fileName, "</p>");
            restoreHistoryContainer.appendChild(restoreDiv);
        });
    }
}
// Function to clear backup history
function clearBackupHistory() {
    localStorage.removeItem('backupHistory');
    displayBackupHistory(); // Refresh display
}
// Function to clear restore history
function clearRestoreHistory() {
    localStorage.removeItem('restoreHistory');
    displayRestoreHistory(); // Refresh display
}
// Function to handle menu display
function menubarDisplay() {
    var menu = document.querySelector('menu');
    var addEventArea = document.getElementById("event-add-block");
    var notificationArea = document.getElementById("notification-display");
    var logoutArea = document.getElementById("profile-edit-area");
    if (menu) {
        if (menu.style.display === 'none' || menu.style.display === '') {
            menu.style.display = 'block';
            if (addEventArea)
                addEventArea.style.display = 'none';
            if (notificationArea)
                notificationArea.style.display = 'none';
            if (logoutArea)
                logoutArea.style.display = 'none';
        }
        else {
            menu.style.display = 'none';
        }
    }
}
// Function to handle adding events
function addEvent() {
    window.location.href = "../adminEvents/events.html";
}
// Function to display notifications
function displayNotification() {
    var notificationArea = document.getElementById("notification-display");
    if (notificationArea) {
        notificationArea.style.display = (notificationArea.style.display === 'none' || notificationArea.style.display === '') ? 'block' : 'none';
    }
}
// Function to display logout area
function displayLogout() {
    var logoutArea = document.getElementById("profile-edit-area");
    if (logoutArea) {
        logoutArea.style.display = (logoutArea.style.display === 'none' || logoutArea.style.display === '') ? 'flex' : 'none';
    }
}
// Function to load user profile information
function loadUserProfile() {
    var allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
    var loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (loggedInUserEmail) {
        var user = allUsersJson.find(function (user) { return user.userEmail === loggedInUserEmail; });
        var profileName = document.getElementById("profile-name");
        var dateOfBirth = document.getElementById("profile-dateOfBirth");
        if (user && profileName && dateOfBirth) {
            profileName.innerText = user.userName;
            dateOfBirth.innerText = user.userBirthDate;
        }
        else {
            console.error("Profile elements or user data not found.");
        }
    }
    else {
        console.error("Logged in user email not found.");
    }
}
// Function to merge data
function mergeData(existingValue, newValue) {
    try {
        var existingData = JSON.parse(existingValue);
        var newData = JSON.parse(newValue);
        if (Array.isArray(existingData) && Array.isArray(newData)) {
            return JSON.stringify(__spreadArray(__spreadArray([], existingData, true), newData, true));
        }
        else if (typeof existingData === 'object' && typeof newData === 'object') {
            return JSON.stringify(__assign(__assign({}, existingData), newData));
        }
        else {
            return newValue;
        }
    }
    catch (error) {
        console.error("Error merging data:", error);
        return newValue;
    }
}
// Function to restore data from file
function restoreData(file) {
    var reader = new FileReader();
    var restoreSuccessMessage = document.getElementById("restore-success-message");
    var restoreErrorMessage = document.getElementById("restore-error-message");
    if (restoreSuccessMessage) {
        restoreSuccessMessage.textContent = '';
    }
    if (restoreErrorMessage) {
        restoreErrorMessage.textContent = '';
    }
    reader.onload = function (event) {
        var _a;
        try {
            var fileContent = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            if (fileContent) {
                // Parse the file content as JSON
                var parsedContent_1 = JSON.parse(fileContent);
                // Iterate over the localStorage keys and update values
                if (parsedContent_1.localStorage) {
                    Object.keys(parsedContent_1.localStorage).forEach(function (key) {
                        localStorage.setItem(key, parsedContent_1.localStorage[key]);
                    });
                }
                var fileInputContainer = document.getElementById("file-input-container");
                if (fileInputContainer && fileInputContainer.style.display === 'block') {
                    fileInputContainer.style.display = 'none';
                }
                saveRestoreHistory(file.name);
                displayRestoreHistory();
                if (restoreSuccessMessage) {
                    restoreSuccessMessage.textContent = 'Data restored successfully.';
                    setTimeout(function () {
                        window.location.reload();
                    }, 3000);
                }
            }
        }
        catch (error) {
            console.error("Error restoring data:", error);
            if (restoreErrorMessage) {
                restoreErrorMessage.textContent = 'Error restoring data. Please try again.';
            }
        }
    };
    reader.onerror = function () {
        if (restoreErrorMessage) {
            restoreErrorMessage.textContent = 'Error reading file. Please ensure it is a valid JSON file.';
        }
    };
    reader.readAsText(file);
}
// Event listener for the restore button
var restoreBtn = document.getElementById("restore-btn");
restoreBtn.addEventListener('click', function () {
    var _a;
    var fileInputContainer = document.getElementById("file-input-container");
    if (fileInputContainer) {
        fileInputContainer.style.display = fileInputContainer.style.display === 'none' ? 'block' : 'none';
    }
    var fileInput = document.getElementById("file-input");
    if ((_a = fileInput === null || fileInput === void 0 ? void 0 : fileInput.files) === null || _a === void 0 ? void 0 : _a.length) {
        var file = fileInput.files[0];
        restoreData(file);
    }
    else {
        var restoreErrorMessage = document.getElementById("restore-error-message");
        if (restoreErrorMessage) {
            restoreErrorMessage.textContent = 'Please upload a file to restore.';
        }
    }
});
// Handle file input change event
var fileInput = document.getElementById("file-input");
fileInput.addEventListener('change', function () {
    var _a, _b;
    var fileName = ((_b = (_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.name) || 'No file chosen';
    var fileNameSpan = document.getElementById("file-name");
    if (fileNameSpan) {
        fileNameSpan.textContent = fileName;
    }
    // Call disappearmessage when file is selected
    disappearmessage();
});
// Function to display file area
function displayFileArea() {
    var restoreSuccessMessage = document.getElementById("restore-success-message");
    var fileInputContainer = document.getElementById("file-input-container");
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
var backupBtn = document.getElementById("backup-btn");
(_a = document.getElementById('backup-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var allStorageData = {};
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key) {
            allStorageData[key] = localStorage.getItem(key);
        }
    }
    var jsonData = JSON.stringify({
        localStorage: allStorageData
    });
    var blob = new Blob([jsonData], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var userName = getLoggedInUserName();
    var fileName = userName ? "backup-".concat(userName, "-").concat(new Date().toISOString(), ".json") : "backup-".concat(new Date().toISOString(), ".json");
    var a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    saveBackupHistory(fileName);
    displayBackupHistory();
});
// Function to get logged-in user's name
function getLoggedInUserName() {
    var allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
    var loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (loggedInUserEmail) {
        var user = allUsersJson.find(function (user) { return user.userEmail === loggedInUserEmail; });
        if (user) {
            return user.userName;
        }
        else {
            console.error("User not found in localStorage.");
        }
    }
    else {
        console.error("Logged in user email not found.");
    }
    return null;
}
// Function to hide the error message
function disappearmessage() {
    var restoreErrorMessage = document.getElementById("restore-error-message");
    if (restoreErrorMessage) {
        restoreErrorMessage.style.display = 'none';
    }
}
// Event listener for clear backup history button
var clearBackupHistoryBtn = document.getElementById("clear-backup-history");
clearBackupHistoryBtn.addEventListener('click', clearBackupHistory);
// Event listener for clear restore history button
var clearRestoreHistoryBtn = document.getElementById("clear-restore-history");
clearRestoreHistoryBtn.addEventListener('click', clearRestoreHistory);
// Display history on page load
document.addEventListener('DOMContentLoaded', function () {
    displayBackupHistory();
    displayRestoreHistory();
    loadUserProfile();
});
