document.addEventListener('DOMContentLoaded', () => {
    const findDoctorApi = async (doctorId) => {
        try {
            const res = await axios({
                method: 'GET',
                url: `/api/finalv/doctors/${doctorId}`
            });
            console.log(res)
            if (res.data.status === 'success') {
                const doctor = res.data.data.doctor;
                const doctorBookingsDiv = document.getElementById('doctorBookings');
                
                // Render doctor bookings
                const bookingsHtml = doctor.bookings.map(booking => `
                    <div class="card mt-3">
                        <div class="card-body">
                            <h5 class="card-title">Booking</h5>
                            <p class="card-text">User ID: ${booking.user}</p>
                            <p class="card-text">Booking Day: ${booking.bookingDay}</p>
                            <p class="card-text">Booking Time: ${booking.bookingTime}</p>
                        </div>
                    </div>
                `).join('');

                doctorBookingsDiv.innerHTML = bookingsHtml;
            } else {
                document.getElementById('doctorBookings').innerHTML = `<p>Doctor not found</p>`;
            }
        } catch (err) {
            console.log(err.response.data);
            document.getElementById('doctorBookings').innerHTML = `<p>Server error</p>`;
        }
    };

    const findDoctorBtn = document.getElementById('enterIdFormBtn');
    console.log(findDoctorBtn)
    findDoctorBtn.addEventListener('click', e => {
        e.preventDefault();
        const doctorId = document.getElementById('doctorEnteredInputId').value;
        findDoctorApi(doctorId);
    });
});
