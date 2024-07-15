document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('formDoctorReview');

    if (reviewForm) {
        reviewForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const review = document.getElementById('doctorReviewField').value;
            const rating = document.getElementById('doctorRatingField').value;
            const doctorId = window.location.pathname.split('/')[2]; // Extract doctorId from URL

            try {
                const res = await axios({
                    method: 'POST',
                    url: `/api/finalv/doctors/${doctorId}/reviews`,
                    data: {
                        review,
                        rating
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (res.data.status === 'success') {
                    Toastify({
                        text: "Review submitted successfully!",
                        duration: 3000,
                        close: true,
                        gravity: "top", // `top`, `bottom`, `center`
                        position: "center", // `left`, `center`, `right`
                        backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)",
                    }).showToast();
                    window.location.reload(); // Reload the page to show the new review
                } else {
                    Toastify({
                        text: "Failed to submit review.",
                        duration: 3000,
                        close: true,
                        gravity: "top", // `top`, `bottom`, `center`
                        position: "center", // `left`, `center`, `right`
                        backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
                    }).showToast();
                }
            } catch (err) {
                console.error(err);
                Toastify({
                    text: "An error occurred. Please try again.",
                    duration: 3000,
                    close: true,
                    gravity: "top", // `top`, `bottom`, `center`
                    position: "center", // `left`, `center`, `right`
                    backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
                }).showToast();
            }
        });
    }
});
