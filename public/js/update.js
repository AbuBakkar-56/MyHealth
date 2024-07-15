const updateSettings = async (name, email) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: 'http://127.0.0.1:7000/api/finalv/users/updateAccount',
            data: {
                name,
                email
            }
        });
        console.log(res.data.status);
        if (res.data.status === 'success') {
            Toastify({
                text: "Data Updated Successfully",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)",
            }).showToast();
            setTimeout(() => {
                window.location.reload(true);
            }, 1500);
        }
    } catch (err) {
        console.log(err);
        Toastify({
            text: "An error occurred while updating data. Please try again.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
        }).showToast();
    }
};

const updateForm = document.getElementById('Updadte__Form');
if (updateForm) {
    updateForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name_update_field').value;
        const email = document.getElementById('email_update_field').value;
        updateSettings(name, email);
    });
}
