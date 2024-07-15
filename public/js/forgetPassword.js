document.getElementById('forgotPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;

    try {
        const res = await axios.post('/api/finalv/users/forgetPassword', { email });
        Toastify({
            text: 'Reset link sent to your email',
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)"
        }).showToast();
        console.log(res.data.resetUrl); // For testing purposes
    } catch (err) {
        console.error(err);
        Toastify({
            text: 'Error sending reset link',
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            backgroundColor: "linear-gradient(90deg, #e52d27, #b31217)"
        }).showToast();
    }
});
