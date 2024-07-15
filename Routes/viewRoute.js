const express = require('express');
const viewController = require('../Controllers/viewController');
const authController = require('../Controllers/authController');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).render('base');
});
router.get('/overview', authController.isLoggedIn, viewController.getOverView);
router.get('/doctor/:id', authController.isLoggedIn, viewController.getDoctor);
router.get('/blogdetails/:id', authController.isLoggedIn, viewController.getBlogsDetails);
router.get('/login', viewController.getLoginForm);
router.get('/forgot-password', viewController.getForgotPasswordForm);
router.get('/reset-password/:token', viewController.getResetPasswordForm);
router.route('/Account').get(authController.protect, viewController.getAccount);
router.route('/admin').get(authController.isLoggedIn,authController.restictTo('Admin'),viewController.getAdmin);
router.route('/medicine').get(authController.isLoggedIn, viewController.getMedicine);
router.route('/blogs').get(authController.isLoggedIn, viewController.getBlogs);
router.route('/medicines/:id').get(authController.isLoggedIn, viewController.getMedicineDetails);
router.route('/managedoctor').get(authController.isLoggedIn, viewController.getManageDoctors);
router.route('/doctorreviews').get(authController.isLoggedIn, viewController.getDoctorReviews);
router.route('/addmedicine').get(authController.isLoggedIn, viewController.getAddMedicinePage);
router.route('/vieworder').get(authController.isLoggedIn, viewController.getOrders);
router.route('/signup').get(viewController.getSignUp);

router.route('/dashboard-doctor').get(authController.isLoggedIn,authController.restictTo('Doctor'), viewController.getDoctorDashboard);

router.route('/doctorinfo').get(authController.isLoggedIn, viewController.getDoctorInfo);
router.route('/getBookings').get(authController.isLoggedIn, viewController.getDoctorBookings);
router.route('/addBlog').get(authController.isLoggedIn, viewController.getAddBlog);
router.route('/patientHistory').get(authController.isLoggedIn, viewController.getAddPatientHistory);
router.route('/booking').get(authController.isLoggedIn, viewController.getBookinsPage);
router.get('/search-results', authController.isLoggedIn, viewController.getSearchResults);
router.get('/doctorapplication',authController.isLoggedIn,viewController.getDoctorApplicationForm)
router.get('/doctorlogin',viewController.getDoctorLogin)
router.get('/adminlogin',viewController.getAdminLogin)
module.exports = router;
