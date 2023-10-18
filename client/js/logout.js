const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', async function () {
    try {
        const response = await fetch('http://localhost:5001/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",

        });

        if (response.ok) {
            console.log('logged out');
            // Redirect to login page or perform any other action
        } else {
            throw new Error('Failed to logout');
        }
    } catch (error) {
        console.error(error);
    }
});
