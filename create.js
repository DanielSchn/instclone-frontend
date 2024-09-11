let users = [];

const userSelect = document.getElementById('user');
users.forEach(user => {
    const option = document.createElement('option');
    option.value = user.id;
    option.textContent = user.name;
    userSelect.appendChild(option);
});

function submitPost() {
    const formData = new FormData(document.getElementById('postForm'));

    fetch(`${url}/create-post/`, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Post erfolgreich erstellt');
            setTimeout(() => {
                window.location.href='index.html';
            }, 1000);
            
        } else {
            console.error('Fehler beim Erstellen des Posts: ' + data.error);
        }
    })
    .catch(error => console.error('Fehler:', error));
}


async function fetchUser() {
    fetch(`${url}/get-users/`)
    .then(response => response.json())
    .then(data => {
        const userSelect = document.getElementById('user');
        data.users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            userSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Fehler beim Abrufen der Benutzer:', error));
  }