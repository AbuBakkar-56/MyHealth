const express = require('express');
const blogsController = require('./../Controllers/blogController');
const blogReviewRoute = require('./../Routes/blogReviewRoute');
const Router = express.Router();

Router.use('/:id/blogReview', blogReviewRoute);
Router.route('/').post(blogsController.createBlog).get(blogsController.getAllBlogs);
Router.route('/:id')
    .get(blogsController.getBlog)
    .delete(blogsController.deleteBlog)
    .patch(blogsController.updateBlog);

module.exports = Router;
