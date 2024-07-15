const Bookings = require('../Model/bookingModel');
const Doctors = require('../Model/doctorModel');
const Users = require('../Model/userModel');
const { bookingConfirmationEmail } = require('../utils/emailTemplates')
const sendEmail = require('../utils/Email')

exports.getDoctorUserId = (req, res, next) => {
    if (!req.body.user) {
        req.body.user = req.user.id;
    }
    if (!req.body.doctor) {
        req.body.doctor = req.params.doctorId;
    }
    next();
};


exports.getDoctorBookings = async (req, res) => {
    try {

        const doctorId = req.params.doctorId;
        const bookings = await Bookings.find({
            doctor: doctorId,
            status: 'PENDING'
        });

        res.status(200).json({
            status: 'success',
            results: bookings.length,
            data: {
                bookings
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: error.message
        });
    }
}

exports.createBooking = async (req, res, next) => {
    try {
        const { bookingDay, bookingTime, user, doctor } = req.body;

        if (!bookingDay || !bookingTime || !user || !doctor) {
            return res.status(400).json({
                status: 'error',
                message: 'All booking details are required'
            });
        }

        const doctorExists = await Doctors.findById(doctor);
        if (!doctorExists) {
            return res.status(404).json({
                status: 'error',
                message: 'Doctor not found'
            });
        }

        const newBooking = await Bookings.create({
            user,
            doctor,
            bookingDay,
            bookingTime
        });

        const userDocument = await Users.findById(user);
        const email = bookingConfirmationEmail({
            user: userDocument,
            doctor: doctorExists,
            bookingDay,
            bookingTime
        });
        await sendEmail({
            email: userDocument.email,
            subject: 'Booking Confirmation',
            message: email
        });


        res.status(201).json({
            status: 'success',
            data: {
                booking: newBooking
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: err.message
        });
    }
};
