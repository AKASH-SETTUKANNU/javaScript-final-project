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
var _a, _b;
// Get menu elements
var menu = document.querySelector('menu');
var menuIcon = document.querySelector('#menu-icon');
var addEventArea = document.getElementById("event-add-block");
var notificationArea = document.getElementById("notification-display");
var logoutArea = document.getElementById("profile-edit-area");
// Function to toggle menu display
function menubarDisplay() {
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
        addEventArea.style.display = 'none';
        notificationArea.style.display = 'none';
        logoutArea.style.display = 'none';
    }
    else {
        menu.style.display = 'none';
    }
}
// Function to toggle add event display
function addEvent() {
    window.location.href = "../adminEvents/events.html";
}
// Function to toggle notification display
function displayNotification() {
    if (notificationArea.style.display === 'none' || notificationArea.style.display === '') {
        notificationArea.style.display = 'block';
        addEventArea.style.display = 'none';
        logoutArea.style.display = 'none';
    }
    else {
        notificationArea.style.display = 'none';
    }
}
// Function to toggle logout display
function displayLogout() {
    if (logoutArea.style.display === 'none' || logoutArea.style.display === '') {
        logoutArea.style.display = 'flex';
        addEventArea.style.display = 'none';
        notificationArea.style.display = 'none';
    }
    else {
        logoutArea.style.display = 'none';
    }
}
// Load and display user profile details
function loadUserProfile() {
    var allUsersJson = JSON.parse(localStorage.getItem("users") || "[]");
    var loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (loggedInUserEmail) {
        var user = allUsersJson.find(function (user) { return user.userEmail === loggedInUserEmail; });
        var profileName = document.getElementById("profile-name");
        var dateOfBirth = document.getElementById("profile-dateOfBirth");
        if (user) {
            if (profileName && dateOfBirth) {
                profileName.innerText = user.userName;
                dateOfBirth.innerText = user.userBirthDate;
            }
            else {
                console.error("Profile elements not found.");
            }
        }
        else {
            console.error("User not found in localStorage.");
        }
    }
    else {
        console.error("Logged in user email not found.");
    }
}
// Function to display backup history
function displayBackupHistory() {
    var historyContainer = document.querySelector('.displaBackUpHistory');
    var backupHistory = JSON.parse(localStorage.getItem('backupHistory') || "[]");
    historyContainer.innerHTML = '<h2>Backup History</h2>';
    backupHistory.forEach(function (backup) {
        var backupDiv = document.createElement('div');
        backupDiv.className = 'backup-item';
        backupDiv.innerHTML = "<p>Time: ".concat(backup.timestamp, " File: <a href=\"").concat(backup.fileName, "\" download>").concat(backup.fileName, "</a></p>");
        historyContainer.appendChild(backupDiv);
    });
}
// Function to display restore history
function displayRestoreHistory() {
    var restoreHistoryContainer = document.querySelector('.displayRestoreHistory');
    var restoreHistory = JSON.parse(localStorage.getItem('restoreHistory') || "[]");
    restoreHistoryContainer.innerHTML = '<h2>Restore History</h2>';
    restoreHistory.forEach(function (restore) {
        var restoreDiv = document.createElement('div');
        restoreDiv.className = 'backup-item';
        restoreDiv.innerHTML = "<p>Time: ".concat(restore.timestamp, " Restored File: ").concat(restore.fileName, "</p>");
        restoreHistoryContainer.appendChild(restoreDiv);
    });
}
// Function to merge data (if necessary)
function mergeData(existingValue, newValue) {
    try {
        var existingData = JSON.parse(existingValue);
        var newData = JSON.parse(newValue);
        // Merge the existing and new data. Adjust merging logic as needed.
        // Here, simply merging arrays or objects for demonstration purposes.
        if (Array.isArray(existingData) && Array.isArray(newData)) {
            return JSON.stringify(__spreadArray(__spreadArray([], existingData, true), newData, true));
        }
        else if (typeof existingData === 'object' && typeof newData === 'object') {
            return JSON.stringify(__assign(__assign({}, existingData), newData));
        }
        else {
            return newValue; // No merge needed for non-array, non-object data
        }
    }
    catch (error) {
        console.error("Error merging data:", error);
        return newValue; // Fallback to newValue in case of error
    }
}
// Function to save restore history
function saveRestoreHistory(fileName) {
    var restoreHistory = JSON.parse(localStorage.getItem('restoreHistory') || "[]");
    restoreHistory.push({ timestamp: new Date().toLocaleString(), fileName: fileName });
    localStorage.setItem('restoreHistory', JSON.stringify(restoreHistory));
}
// Function to handle file upload and restore data
function restoreData(file) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var _a;
        try {
            var jsonData = JSON.parse((_a = event.target) === null || _a === void 0 ? void 0 : _a.result);
            if (jsonData.localStorage) {
                // Merge the localStorage data from the file with the existing localStorage
                for (var _i = 0, _b = Object.entries(jsonData.localStorage); _i < _b.length; _i++) {
                    var _c = _b[_i], key = _c[0], value = _c[1];
                    var existingValue = localStorage.getItem(key);
                    if (existingValue) {
                        // If there's already data for this key, merge it if necessary
                        var mergedValue = mergeData(existingValue, value);
                        localStorage.setItem(key, mergedValue);
                    }
                    else {
                        // If no existing data, just set the new value
                        localStorage.setItem(key, value);
                    }
                }
                // Save restore data to localStorage for history
                saveRestoreHistory(file.name);
                // Update the backup and restore history display
                displayBackupHistory();
                displayRestoreHistory();
                alert("Data restored successfully.");
            }
            else {
                alert("Invalid file format.");
            }
        }
        catch (error) {
            console.error("Error reading or parsing file:", error);
            alert("Error reading or parsing file.");
        }
    };
    reader.readAsText(file);
}
// Backup function to include all local storage data
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
    // Get the logged-in user's name and use it in the file name
    var userName = getLoggedInUserName();
    var fileName = userName ? "backup-".concat(userName, "-").concat(new Date().toISOString(), ".json") : "backup-".concat(new Date().toISOString(), ".json");
    var a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    // Save backup data to localStorage for history
    var backupHistory = JSON.parse(localStorage.getItem('backupHistory') || "[]");
    backupHistory.push({ timestamp: new Date().toLocaleString(), fileName: fileName });
    localStorage.setItem('backupHistory', JSON.stringify(backupHistory));
    // Update the backup history display
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
// Add event listener for restore button
(_b = document.getElementById('restore-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    var _a;
    var fileInput = document.getElementById('restore-file');
    if ((_a = fileInput.files) === null || _a === void 0 ? void 0 : _a.length) {
        restoreData(fileInput.files[0]);
    }
    else {
        alert("Please select a file to restore.");
    }
});
// Initial display of backup and restore history on page load
document.addEventListener("DOMContentLoaded", function () {
    loadUserProfile();
    displayBackupHistory();
    displayRestoreHistory();
});
