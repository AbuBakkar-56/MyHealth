const express=require('express');
const reviewController=require('./../Controllers/reviewController');
const authController=require('./../Controllers/authController')
const router=express.Router({mergeParams:true});
router.route('/')
.post(authController.protect,authController.restictTo('User'),reviewController.getUserDoctorIds,reviewController.createReview)
.get(reviewController.getAllReviews)
router.route('/:id')
.delete(authController.isLoggedIn,reviewController.deleteReview)
.patch(authController.protect,authController.restictTo('Admin'),reviewController.updateReview)
.get(authController.protect,authController.restictTo('Admin'),reviewController.getReview)
module.exports=router;


// authController.protect,authController.restictTo('Admin'),
