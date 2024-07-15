const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    doctor: {
        type: mongoose.Schema.ObjectId,
        ref: 'Doctors',
        required: true
    },
    bookingDay: {
        type: String,
        required: true
    },
    bookingTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'CANCELLED'],
        default: 'PENDING'
    }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
