const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');
const router = express.Router({ mergeParams: true });
// router.post('/finalv/doctors/:doctorId/bookings', authController.isLoggedIn, bookingController.getDoctorUserId, bookingController.createBooking);
router.route('/').post(authController.isLoggedIn,bookingController.getDoctorUserId,bookingController.createBooking)
router.route('/:doctorId').get(bookingController.getDoctorBookings);
module.exports = router;
