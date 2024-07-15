document.addEventListener('DOMContentLoaded', () => {
    const searchDoctorForm = document.getElementById('customSearchForm');

    if (searchDoctorForm) {
        searchDoctorForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const city = document.getElementById('DoctorCityInput').value;
            const specialization = document.getElementById('DoctorsSpecializationInput').value;

            if (city && specialization) {
                try {
                    const response = await axios.get(`/api/finalv/doctors`, {
                        params: {
                            Cities: city,
                            Specialization: specialization
                        }
                    });

                    if (response.data.status === 'success') {
                        const doctors = response.data.data.doctors;
                        if (doctors.length > 0) {
                            // Redirect to a route to render the results
                            window.location.href = `/search-results?city=${encodeURIComponent(city)}&specialization=${encodeURIComponent(specialization)}`;
                        } else {
                            Toastify({
                                text: "No doctors found.",
                                duration: 3000,
                                close: true,
                                gravity: "top",
                                position: "center",
                                backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
                            }).showToast();
                        }
                    } else {
                        Toastify({
                            text: "Failed to fetch doctors.",
                            duration: 3000,
                            close: true,
                            gravity: "top",
                            position: "center",
                            backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
                        }).showToast();
                    }
                } catch (err) {
                    console.error(err);
                    Toastify({
                        text: "An error occurred while searching. Please try again.",
                        duration: 3000,
                        close: true,
                        gravity: "top",
                        position: "center",
                        backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
                    }).showToast();
                }
            } else {
                Toastify({
                    text: "Please fill out both fields.",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "center",
                    backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
                }).showToast();
            }
        });
    }
});
