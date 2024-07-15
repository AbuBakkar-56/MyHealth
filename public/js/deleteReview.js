document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-review');
    console.log(deleteButtons);
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const reviewId = e.target.getAttribute('data-id');
            try {
                const res = await axios({
                    method: 'DELETE',
                    url: `/api/finalv/reviews/${reviewId}`
                });

                if (res.data.status === 'success') {
                    Toastify({
                        text: "Review deleted successfully!",
                        duration: 3000,
                        close: true,
                        gravity: "center", // `top`, `bottom`, `center`
                        position: "center", // `left`, `center`, `right`
                        backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)",
                    }).showToast();
                    window.location.reload(); // Reload the page to show the updated list of reviews
                } else {
                    Toastify({
                        text: "Failed to delete review.",
                        duration: 3000,
                        close: true,
                        gravity: "center", // `top`, `bottom`, `center`
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
                    gravity: "center", // `top`, `bottom`, `center`
                    position: "center", // `left`, `center`, `right`
                    backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
                }).showToast();
            }
        });
    });
});
