var _a;
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
        backupDiv.innerHTML = "<p>".concat(backup.timestamp, ": <a href=\"").concat(backup.fileName, "\" download>").concat(backup.fileName, "</a></p>");
        historyContainer.appendChild(backupDiv);
    });
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
    var fileName = "backup-".concat(new Date().toISOString(), ".json");
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
// Initial display of backup history on page load
document.addEventListener("DOMContentLoaded", function () {
    loadUserProfile();
    displayBackupHistory();
});
