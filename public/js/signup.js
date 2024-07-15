const signUpapi = async (name, email, password, confirmPassword, role) => {
    try {
        const res = await axios({
            method: 'POST',
            url: "http://127.0.0.1:7000/api/finalv/users/signUp",
            data: {
                name,
                email,
                password,
                confirmPassword,
                role
            }
        });

        if (res.data.status === 'success') {
            Toastify({
                text: res.data.message || "User SignUp Successful",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)",
            }).showToast();
            setTimeout(() => {
                // window.location.assign('/login');
                window.location.href = '/login';
            }, 1500);
        } else {
            Toastify({
                text: res.data.message || "Sign up failed. Please try again.",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
            }).showToast();
        }
    } catch (error) {
        console.error('Error during sign up:', error);

        let errorMessage = "There was an error during sign up. Please try again.";
        if (error.response && error.response.data && error.response.data.errors) {
            errorMessage = error.response.data.errors.map(err => err.message).join(' ');
        } else if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
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

const signUpForm = document.getElementById('signupForm');
if (signUpForm) {
    signUpForm.addEventListener('submit', e => {
        e.preventDefault();

        const name = document.getElementById('signupname').value;
        const email = document.getElementById('signupemail').value;
        const password = document.getElementById('signuppassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const role = document.getElementById('signuprRole').value;

        // Form validation
        let validationErrors = [];

        // Name validation
        const namePattern = /^[a-zA-Z\s]+$/;
            if (name.length < 3) {
                validationErrors.push("Name must be at least 3 characters long.");
            } else if (!namePattern.test(name)) {
                validationErrors.push("Name can only contain letters and spaces.");
            }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            validationErrors.push("Please enter a valid email address.");
        }

        // Password validation
        if (password.length < 6) {
            validationErrors.push("Password must be at least 6 characters long.");
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            validationErrors.push("Passwords do not match.");
        }

        if (validationErrors.length > 0) {
            Toastify({
                text: validationErrors.join(' '),
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
            }).showToast();
            return;
        }

        console.log(name, email, password, confirmPassword, role);
        signUpapi(name, email, password, confirmPassword, role);
    });
}