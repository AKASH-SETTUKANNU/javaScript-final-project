function loadUserProfile() {
    var usersJson = localStorage.getItem("users");
    var allUsersJson = usersJson ? JSON.parse(usersJson) : [];
    var loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (loggedInUserEmail) {
        var filteredUsers = allUsersJson.filter(function (user) { return user.userEmail === loggedInUserEmail; });
        var user = filteredUsers.length > 0 ? filteredUsers[0] : undefined;
        var profileName = document.getElementById("profile-name");
        var dateOfBirth = document.getElementById("profile-dateOfBirth");
        if (user) {
            if (profileName && dateOfBirth) {
                profileName.innerText = user.userName;
                dateOfBirth.innerText = user.userBirthDate || 'N/A';
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
        console.error("No logged-in user email found.");
    }
}
var menu = document.querySelector('menu');
var menuIcon = document.querySelector('#menu-icon');
var addEventArea = document.getElementById("event-add-block");
var notificationArea = document.getElementById("notification-display");
var logoutArea = document.getElementById("profile-edit-area");
var eventAddBtn = document.getElementById("event-add-btn");
var notificationBell = document.getElementById("notification-bell");
var profileEditIcon = document.getElementById("profile-edit-icon");
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
function addEvent() {
    window.location.href = "../events/events.html";
}
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
document.addEventListener('DOMContentLoaded', function () {
    var userTableBody = document.querySelector('#user-table tbody');
    var addUserForm = document.getElementById('add-user-form');
    var newUserName = document.getElementById('new-user-name');
    var newUserEmail = document.getElementById('new-user-email');
    var newUserPassword = document.getElementById('new-user-password');
    var newUserRole = document.getElementById('new-user-role');
    var newUserBirthDate = document.getElementById('new-user-birthdate');
    var submitButton = document.querySelector('#add-user-form button');
    var editIndex = null;
    function displayUsers() {
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        userTableBody.innerHTML = '';
        users.forEach(function (user, index) {
            var userRow = document.createElement('tr');
            userRow.innerHTML = "\n                <td>".concat(user.userName, "</td>\n                <td>").concat(user.userEmail, "</td>\n                <td>").concat(user.userRole, "</td>\n                <td>").concat(user.userBirthDate, "</td>\n                <td>\n                    <button class=\"edit-btn\" data-index=\"").concat(index, "\">Edit</button>\n                    <button class=\"delete-btn\" data-email=\"").concat(user.userEmail, "\">Delete</button>\n                </td>\n            ");
            userTableBody.appendChild(userRow);
        });
        document.querySelectorAll('.edit-btn').forEach(function (button) {
            button.addEventListener('click', function (event) {
                var index = parseInt(event.target.getAttribute('data-index') || '0');
                editUser(index);
            });
        });
        document.querySelectorAll('.delete-btn').forEach(function (button) {
            button.addEventListener('click', function (event) {
                var email = event.target.getAttribute('data-email') || '';
                deleteUser(email);
            });
        });
    }
    function addUser(event) {
        event.preventDefault();
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        var newUserEmailValue = newUserEmail.value.trim();
        // Check if the email already exists
        var emailExists = users.some(function (user) { return user.userEmail === newUserEmailValue; });
        // If editing an existing user, allow updating the same email
        if (editIndex !== null) {
            if (emailExists && users[editIndex].userEmail !== newUserEmailValue) {
                alert("Email already exists. Please use a different email.");
                return;
            }
        }
        else {
            if (emailExists) {
                alert("Email already exists. Please use a different email.");
                return;
            }
        }
        var newUser = {
            userName: newUserName.value.trim(),
            userEmail: newUserEmailValue,
            userPassword: newUserPassword.value.trim(),
            userRole: newUserRole.value,
            userBirthDate: newUserBirthDate.value
        };
        if (!newUser.userName || !newUser.userEmail || !newUser.userPassword) {
            alert("Please fill in all required fields.");
            return;
        }
        if (editIndex !== null) {
            // Update existing user
            users[editIndex] = newUser;
            editIndex = null;
            submitButton.textContent = 'Add User';
        }
        else {
            // Add new user
            users.push(newUser);
        }
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();
        addUserForm.reset();
    }
    function deleteUser(email) {
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        users = users.filter(function (user) { return user.userEmail !== email; });
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();
    }
    function editUser(index) {
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        var user = users[index];
        if (user) {
            newUserName.value = user.userName;
            newUserEmail.value = user.userEmail;
            newUserPassword.value = user.userPassword;
            newUserRole.value = user.userRole;
            newUserBirthDate.value = user.userBirthDate || '';
            editIndex = index;
            submitButton.textContent = 'Update User';
        }
        else {
            console.error("User not found.");
        }
    }
    addUserForm.addEventListener('submit', addUser);
    displayUsers();
    loadUserProfile();
});
