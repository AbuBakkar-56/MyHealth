function bookingConfirmationEmail(booking) {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>Booking Confirmation</h2>
            <p>Dear ${booking.user.name},</p>
            <p>We are pleased to inform you that your booking with Dr. ${booking.doctor.name} has been successfully created. Here are the details of your appointment:</p>
            <ul>
                <li><strong>Date:</strong> ${booking.bookingDay}</li>
                <li><strong>Time:</strong> ${booking.bookingTime}</li>
            </ul>
            <p>If you need to cancel or reschedule your appointment, please contact us at least 24 hours in advance.</p>
            <p>Thank you for choosing our services. We look forward to seeing you.</p>
            <p>Best regards,</p>
            <p>Your Healthcare Team</p>
        </div>
    `;
}
module.exports = {
    bookingConfirmationEmail
};
