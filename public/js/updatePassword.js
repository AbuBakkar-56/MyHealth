const updatePassword = async (currentPassword, password, confirmPassword) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: "http://127.0.0.1:7000/api/finalv/users/updatePassword",
            data: {
                currentPassword,
                password,
                confirmPassword
            }
        });
        if (res.data.status === 'success') {
            Toastify({
                text: "Password Updated Successfully",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)",
            }).showToast();
            setTimeout(() => {
                // window.location.assign('/overview');
                window.location.href = '/overview';
            }, 1500);
        }
        console.log(res);
    } catch (err) {
        console.log(err);
        Toastify({
            text: "An error occurred while updating the password. Please try again.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
        }).showToast();
    }
}

const updatePasswordForm = document.getElementById('Password__Update__Form');
if (updatePasswordForm) {
    updatePasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const currentPassword = document.getElementById('current_password_field').value;
        const password = document.getElementById('new_password_field').value;
        const confirmPassword = document.getElementById('confirm_password_field').value;
        updatePassword(currentPassword, password, confirmPassword);
    });
}
