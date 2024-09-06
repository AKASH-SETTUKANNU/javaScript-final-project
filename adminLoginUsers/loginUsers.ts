interface User {
    userName: string;
    userEmail: string;
    userPassword: string;
    userRole: string;
    userBirthDate: string;
}

function loadUserProfile() {
    const usersJson = localStorage.getItem("users");
    const allUsersJson: User[] = usersJson ? JSON.parse(usersJson) : [];
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

    if (loggedInUserEmail) {
        const filteredUsers = allUsersJson.filter(user => user.userEmail === loggedInUserEmail);
        const user = filteredUsers.length > 0 ? filteredUsers[0] : undefined;

        const profileName = document.getElementById("profile-name") as HTMLElement;
        const dateOfBirth = document.getElementById("profile-dateOfBirth") as HTMLElement;

        if (user) {
            if (profileName && dateOfBirth) {
                profileName.innerText = user.userName;
                dateOfBirth.innerText = user.userBirthDate || 'N/A';
            } else {
                console.error("Profile elements not found.");
            }
        } else {
            console.error("User not found in localStorage.");
        }
    } else {
        console.error("No logged-in user email found.");
    }
}

const menu = document.querySelector('menu') as HTMLElement;
const menuIcon = document.querySelector('#menu-icon') as HTMLElement;
const addEventArea = document.getElementById("event-add-block") as HTMLElement;
const notificationArea = document.getElementById("notification-display") as HTMLElement;
const logoutArea = document.getElementById("profile-edit-area") as HTMLElement;
const eventAddBtn = document.getElementById("event-add-btn") as HTMLElement;
const notificationBell = document.getElementById("notification-bell") as HTMLElement;
const profileEditIcon = document.getElementById("profile-edit-icon") as HTMLElement;

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

function addEvent() {
    window.location.href = "../events/events.html";
}

function displayNotification() {
    if (notificationArea.style.display === 'none' || notificationArea.style.display === '') {
        notificationArea.style.display = 'block';
        addEventArea.style.display = 'none';
        logoutArea.style.display = 'none';
    } else {
        notificationArea.style.display = 'none';
    }
}

function displayLogout() {
    if (logoutArea.style.display === 'none' || logoutArea.style.display === '') {
        logoutArea.style.display = 'flex';
        addEventArea.style.display = 'none';
        notificationArea.style.display = 'none';
    } else {
        logoutArea.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const userTableBody = document.querySelector('#user-table tbody') as HTMLTableSectionElement;
    const addUserForm = document.getElementById('add-user-form') as HTMLFormElement;
    const newUserName = document.getElementById('new-user-name') as HTMLInputElement;
    const newUserEmail = document.getElementById('new-user-email') as HTMLInputElement;
    const newUserPassword = document.getElementById('new-user-password') as HTMLInputElement;
    const newUserRole = document.getElementById('new-user-role') as HTMLSelectElement;
    const newUserBirthDate = document.getElementById('new-user-birthdate') as HTMLInputElement;
    const submitButton = document.querySelector('#add-user-form button') as HTMLButtonElement;

    let editIndex: number | null = null;

    function displayUsers() {
        const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        userTableBody.innerHTML = '';
        
        users.forEach((user, index) => {
            const userRow = document.createElement('tr');
            userRow.innerHTML = `
                <td>${user.userName }</td>
                <td>${user.userEmail}</td>
                <td>${user.userPassword }</td>
                <td>${user.userRole}</td>
                <td>${user.userBirthDate }</td>
                <td>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-email="${user.userEmail}">Delete</button>
                </td>
            `;
            userTableBody.appendChild(userRow);
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = parseInt((event.target as HTMLButtonElement).getAttribute('data-index') || '0');
                editUser(index);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const email = (event.target as HTMLButtonElement).getAttribute('data-email') || '';
                deleteUser(email);
            });
        });
    }

    function addUser(event: Event) {
        event.preventDefault();

        const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        const newUser: User = {
            userName: newUserName.value.trim(),
            userEmail: newUserEmail.value.trim(),
            userPassword: newUserPassword.value.trim(),
            userRole: newUserRole.value,
            userBirthDate: newUserBirthDate.value
        };

        if (!newUser.userName || !newUser.userEmail || !newUser.userPassword) {
            alert("Please fill in all required fields.");
            return;
        }

        if (editIndex !== null) {
          
            users[editIndex] = newUser;
            editIndex = null;
            submitButton.textContent = 'Add User';
        } else {
           
            users.push(newUser);
        }

        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();
        addUserForm.reset();
    }

    function deleteUser(email: string) {
        let users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        users = users.filter(user => user.userEmail !== email);
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();
    }

    function editUser(index: number) {
        let users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        const user = users[index];

        if (user) {
            newUserName.value = user.userName;
            newUserEmail.value = user.userEmail;
            newUserPassword.value = user.userPassword;
            newUserRole.value = user.userRole;
            newUserBirthDate.value = user.userBirthDate || '';

            editIndex = index;
            submitButton.textContent = 'Update User';
        } else {
            console.error("User not found.");
        }
    }

    addUserForm.addEventListener('submit', addUser);

    displayUsers();
    loadUserProfile();
});
