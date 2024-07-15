const express=require('express');
const authController=require('./../Controllers/authController');
const userController=require('./../Controllers/userController');
const viewController=require('./../Controllers/viewController');
const router=express.Router();
router.route('/signUp').post(authController.signUp);
router.route('/signIn').post(authController.signIn);
router.route('/forgetPassword').post(authController.forgetPassword);
router.route('/resetPassword/:resetToken').patch(authController.resetPassword);
router.route('/updatePassword').patch(authController.protect,authController.updatePassword);
router.route('/').get(authController.protect,authController.restictTo('Admin'),userController.getAllUsers);
router.route('/deleteMe').delete(authController.protect,userController.deleteMe);
router.route('/updateMe').patch(authController.protect,userController.updateMe);
router.route('/updateAccount').patch(authController.protect,userController.uploadUserPhotos,userController.resizeUserPhoto,viewController.updateSettings)
router.route('/logOut').get(async(req,res)=>{
    res.cookie('jwt',' ',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({
        status:'success',
        message:'User loggedout'
    })
})
module.exports=router;