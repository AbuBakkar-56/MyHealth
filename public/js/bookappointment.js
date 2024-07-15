document.addEventListener('DOMContentLoaded', async () => {
    const bookingDaySelect = document.getElementById('bookingDay');
    const doctorId = document.querySelector('input[name="doctorId"]').value;

    bookingDaySelect.addEventListener('change', () => {
        updateBookingTimeSlots(bookingDaySelect.value);
    });

    const getBookings = async (doctorId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios({
                    method: 'GET',
                    url: `/api/finalv/bookings/${doctorId}`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.status === 'success') {
                    resolve(response.data.data.bookings);
                } else {
                    Toastify({
                        text: 'Failed to fetch bookings',
                        duration: 3000,
                        close: true,
                        gravity: "center", 
                        position: "center", 
                        backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)",
                    }).showToast();
                }
            } catch (err) {
                console.log(err);
                console.log(err.response.data);
                Toastify({
                    text: `Error: ${err.response.data.message}`,
                    duration: 3000,
                    close: true,
                    gravity: "center", 
                    position: "center", 
                    backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)",
                }).showToast();
                reject(err);
            }
        });
    };

    const bookings = await getBookings(doctorId);

    // Function to update the booking slot options
    const updateBookingTimeSlots = (selectedDay) => {
        const bookedSlotsForDay = bookings.filter(booking => booking.bookingDay === selectedDay);
        const bookingTimeSelect = document.getElementById('bookingSlot');
        const bookingTimeOptions = bookingTimeSelect.querySelectorAll('option');
        bookingTimeOptions.forEach(option => {
            option.disabled = bookedSlotsForDay.some(booking => booking.bookingTime === option.value);
        });

        const firstNonBookedSlot = [...bookingTimeOptions].find(option => !option.disabled);

        if (firstNonBookedSlot) {
            firstNonBookedSlot.selected = true;
        } else {
            bookingTimeSelect.value = '';
        }
    };

    // Initial update of booking time slots
    updateBookingTimeSlots(bookingDaySelect.value);

    const bookAppointmentApi = async (bookingDay, bookingTime, doctorId) => {
        try {
            const res = await axios({
                method: 'POST',
                url: `/api/finalv/doctors/${doctorId}/bookings`,
                data: {
                    bookingDay,
                    bookingTime,
                    doctorId
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Ensure the token is correctly stored
                }
            });
            console.log(res);
            if (res.data.status === 'success') {
                Toastify({
                    text: 'Appointment booked successfully',
                    duration: 3000,
                    close: true,
                    gravity: "center", 
                    position: "center", 
                    backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)",
                }).showToast();
                window.location.reload();
            } else {
                Toastify({
                    text: 'Failed to book appointment',
                    duration: 3000,
                    close: true,
                    gravity: "center", 
                    position: "center", 
                    backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)",
                }).showToast();
            }
        } catch (err) {
            console.log(err);
            console.log(err.response.data);
            Toastify({
                text: `Error booking appointment: ${err.response.data.message}`,
                duration: 3000,
                close: true,
                gravity: "center", 
                position: "center", 
                backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)",
            }).showToast();
        }
    };

    const bookDoctorAppointmentForm = document.getElementById('bookDoctorAppointmentForm');
    bookDoctorAppointmentForm.addEventListener('submit', e => {
        e.preventDefault();
        const bookingDay = document.getElementById('bookingDay').value;
        const bookingTime = document.getElementById('bookingSlot').value;
        bookAppointmentApi(bookingDay, bookingTime, doctorId);
    });
});
