const deleteDoctorApi = async (doctorId) => {
    try {
        const res = await axios({
            method: "DELETE",
            url: `http://127.0.0.1:7000/api/finalv/doctors/${doctorId}`,
            data: {
                doctorId
            }
        });
        if(res.data.status === 'success'){
            Toastify({
                text: "Doctor Deleted",
                duration: 3000,
                close: true,
                gravity: "center", // `top`, `bottom`, `center`
                position: "center", // `left`, `center`, `right`
                backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)",
            }).showToast();
            window.location.reload(true);
        }
    } catch (err) {
        Toastify({
            text: `Error: ${err.response.data.message}`,
            duration: 3000,
            close: true,
            gravity: "center", // `top`, `bottom`, `center`
            position: "center", // `left`, `center`, `right`
            backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
        }).showToast();
    }
}

const deleteBtnForm = document.getElementById('doctorDeleteBtn');
console.log(deleteBtnForm);
deleteBtnForm.addEventListener('click', e => {
    e.preventDefault();
    const doctorId = document.getElementById('deleteDoctorId').value;
    deleteDoctorApi(doctorId);
});
