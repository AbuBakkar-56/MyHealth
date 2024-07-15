const express=require('express');
const router=express.Router();
const doctorController=require('./../Controllers/doctorController')
const authController=require('./../Controllers/authController');
const reviewRouter=require('./../Routes/reviewRoute');
const bookingRouter=require('./../Routes/bookingRoute')
const { Admin } = require('mongodb');
router.use('/:doctorId/reviews',reviewRouter);
router.use('/:doctorId/bookings',bookingRouter)
router.route('/').post(doctorController.createDoctor).get(doctorController.getAllDoctors)
router.route('/:id').get(doctorController.getDoctor)
.patch(authController.protect,doctorController.updateDoctor)
.delete(doctorController.deleteDoctor)
router.route('/docotrs-within/:distance/center/:latlang/unit/:unit').get(doctorController.getDoctorsWithin)
router.route('/distance/center/:latlang').get(doctorController.getDistances)
module.exports=router;
//cretae Doctor and delete Doctor are editited