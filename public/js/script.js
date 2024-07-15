const logOut = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:7000/api/finalv/users/logOut'
        });
        if (res.data.status === 'success') {
            Toastify({
                text: "Logout successful!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)",
            }).showToast();
            setTimeout(() => {
                // window.location.assign('/');
                window.location.href = '/';
            }, 1500);
        }
    } catch (err) {
        console.log(err);
        Toastify({
            text: "An error occurred while logging out.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
        }).showToast();
    }
}

const btnLogOut = document.getElementById('btn-logout--btn');
if (btnLogOut) {
    btnLogOut.addEventListener('click', async () => {
        await logOut();
    });
    console.log('Button Exists');
} else {
    console.log('Button not found');
}
