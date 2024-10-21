document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const user = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        location: document.getElementById('location').value,
        contacts: document.getElementById('contacts').value,
        title: document.getElementById('title').value,
        description: document.getElementById('description').value
    };

    fetch('https://my-project-1-5mxp.onrender.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        console.log('User added:', data);
        loadUsers();
    })
    .catch(error => console.error('Error:', error));
});

function loadUsers() {
    fetch('https://my-project-1-5mxp.onrender.com/users')
    .then(response => response.json())
    .then(data => {
        const userList = document.getElementById('userList');
        userList.innerHTML = '<h3>User List</h3>';
        data.forEach(user => {
            userList.innerHTML += `<div>
                <strong>${user.name}</strong>
                <p>Email: ${user.email}</p>
                <p>Location: ${user.location}</p>
                <p>Contacts: ${user.contacts}</p>
                <p>Title: ${user.title}</p>
                <p>Description: ${user.description}</p>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </div>`;
        });
    });
}

function deleteUser(id) {
    fetch(`https://my-project-1-5mxp.onrender.com/users/${id}`, {
        method: 'DELETE'
    })
    .then(() => loadUsers())
    .catch(error => console.error('Error:', error));
}

// Load users on page load
document.addEventListener('DOMContentLoaded', loadUsers);
