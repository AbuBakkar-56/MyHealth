const addBlogApi = async (author, title, Content) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `http://127.0.0.1:7000/api/finalv/blogs`,
            data: {
                author,
                title,
                Content
            }
        });
        if (res.data.status === 'success') {
            Toastify({
                text: "Blog Added successfully!",
                duration: 3000,
                close: true,
                gravity: "center", // `top`, `bottom`, `center`
                position: "center", // `left`, `center`, `right`
                backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)",
            }).showToast();
        } else {
            Toastify({
                text: `Error: ${res.data.message}`,
                duration: 3000,
                close: true,
                gravity: "center", // `top`, `bottom`, `center`
                position: "center", // `left`, `center`, `right`
                backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)",
            }).showToast();
        }
    } catch (err) {
        console.log(err);
        Toastify({
            text: `Error: ${err.message}`,
            duration: 3000,
            close: true,
            gravity: "center", // `top`, `bottom`, `center`
            position: "center", // `left`, `center`, `right`
            backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)",
        }).showToast();
    }
};

const addBlogForm = document.getElementById('addBlogForm');
addBlogForm.addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('authorName').value;
    const Content = document.getElementById('content').value;
    console.log(title, author, Content);
    addBlogApi(author, title, Content);
});
