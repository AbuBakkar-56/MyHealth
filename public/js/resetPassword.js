document.getElementById('resetPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const token = window.location.pathname.split('/').pop();

    try {
        const res = await axios.patch(`/api/finalv/users/resetPassword/${token}`, { password, confirmPassword });
        Toastify({
            text: 'Password reset successful',
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)"
        }).showToast();
        setTimeout(() => {
            window.location.href = '/login';
        }, 3000);
    } catch (err) {
        console.error(err);
        Toastify({
            text: 'Error resetting password',
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            backgroundColor: "linear-gradient(90deg, #e52d27, #b31217)"
        }).showToast();
    }
});
