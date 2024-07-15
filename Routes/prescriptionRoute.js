const express=require('express');
const prescriptionController=require('./../Controllers/prescriptionController');
const authController=require('./../Controllers/authController')
const Router=express.Router();
Router.route('/')
.post(authController.isLoggedIn,prescriptionController.createPrescription)
.get(authController.isLoggedIn,prescriptionController.getPrescription)
module.exports=Router