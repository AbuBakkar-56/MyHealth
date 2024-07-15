const express=require('express');
const Router=express.Router();
const doctorApplicationController=require('./../Controllers/doctorApplicationController')
const authController=require('./../Controllers/authController')
Router.route('/').post(doctorApplicationController.createDoctorApplication)
module.exports=Router