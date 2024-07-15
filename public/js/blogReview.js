const blogReviewForm = document.getElementById('blogReviewForm');

blogReviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const comment = document.getElementById('blogReviewComment').value;
    const rating = document.getElementById('blogReviewRating').value;
    const blogId = blogReviewForm.getAttribute('data-blog-id');  // Get the blog ID from the data attribute

    console.log(comment, rating);

    try {
        const response = await axios.post(`/api/finalv/blogs/${blogId}/blogReview`, {
            comment,
            rating
        });
        console.log(response.data);
        Toastify({
            text: "Review submitted successfully!",
            duration: 3000,
            close: true,
            gravity: "center", // `top`, `bottom`, `center`
            position: "center", // `left`, `center`, `right`
            backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)",
        }).showToast();
        // Optionally, you can reset the form or redirect the user
        blogReviewForm.reset();
    } catch (error) {
        console.error('There was an error submitting the review:', error);
        Toastify({
            text: "There was an error submitting your review. Please try again.",
            duration: 3000,
            close: true,
            gravity: "center", // `top`, `bottom`, `center`
            position: "center", // `left`, `center`, `right`
            backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)",
        }).showToast();
    }
});

console.log(blogReviewForm);
