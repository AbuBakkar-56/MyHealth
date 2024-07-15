const login = async (email, password) => {
    try {
        const res = await axios({
            method: "POST",
            url: "/api/finalv/users/signIn",
            data: {
                email,
                password
            }
        });
        console.log(res);

        // Show a success message
        if (res.data.status === 'success') {
            Toastify({
                text: "Login successful!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)",
            }).showToast();
            setTimeout(() => {
                if (res.data.role === 'Admin') {
                    window.location.href = '/admin';
                } else if (res.data.role === 'Doctor') {
                    window.location.href = '/dashboard-doctor';
                } else {
                    window.location.href = '/overview';
                }
            }, 1500);
        } else {
            // Handle unexpected success response
            Toastify({
                text: res.data.message || "Unexpected response from the server.",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
            }).showToast();
        }
    } catch (err) {
        console.error('Login error:', err);

        let errorMessage = "Something is wrong. Please try again.";
        if (err.response && err.response.data && err.response.data.errors) {
            errorMessage = err.response.data.errors.map(err => err.message).join(' ');
        } else if (err.response && err.response.data && err.response.data.message) {
            errorMessage = err.response.data.message;
        }

        Toastify({
            text: errorMessage,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
        }).showToast();
    }
};

const form = document.querySelector('.form_login');
form.addEventListener('submit', e => {
    e.preventDefault();

    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    login(email, password);
});