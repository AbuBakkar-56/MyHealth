const express = require('express');
const blogReviewController = require('./../Controllers/blogReviewController');
const authController = require('./../Controllers/authController');
const Router = express.Router({ mergeParams: true });

Router.route('/')
    .post(authController.protect, authController.restictTo('User'), blogReviewController.getUserBlogIds, blogReviewController.createReview)
    .get(blogReviewController.getAllReviews);
Router.route('/:id')
    .get(blogReviewController.getReview)
    .patch(blogReviewController.updateReview)
    .delete(blogReviewController.deleteReview);

module.exports = Router;
