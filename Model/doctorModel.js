const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Doctor must have a name'],
        minLength: [3, 'Doctor name should not be less than 3 characters'],
        maxLength: [25, 'Doctor name should not be greater than 25 characters']
    },
    photo: {
        type: String,
        // required: [true, 'Doctor must have a profile photo']
    },
    Specialization: {
        type: [String],
        required: [true, 'Doctor must have specialization specified']
    },
    waitTime: {
        type: Number,
        required: [true, 'Doctor must have wait time specified']
    },
    Experience: {
        type: Number,
        required: true
    },
    Services: {
        type: [String],
        required: true
    },
    Education: {
        type: [String],
        required: true
    },
    ProfessionalMemberships: {
        type: [String]
    },
    About: {
        type: String,
        required: true
    },
    Fee: {
        type: Number,
        required: true
    },
    ratingsAvg: {
        type: Number,
        default: 4.5,
        min: 0,
        max: 5
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
    AvailabilityDays: {
        type: [String],
        enum:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    },
    availbleSlots:{
        type:[String],
        required:true
    },
    Cities: {
        type: [String],
        required: true
    },
    AvailbleHospitals:{
        type:[String],
        required:true
    },
    professionalStatement:{
        type:String,
        required:true
    },
    sittingLocations: [{
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: [Number],
        address: String,
        description: String
    }],
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
doctorSchema.virtual('roundedRatingsAvg').get(function() {
    return this.ratingsAvg.toFixed(2);
})
doctorSchema.virtual('reviews', {
    ref: "review",
    foreignField: "doctor",
    localField: "_id"
});
doctorSchema.virtual('bookings',{
    ref:'Booking',
    foreignField:"doctor",
    localField:'_id'
})
doctorSchema.index({ sittingLocations: "2d" });
const Doctors = mongoose.model('Doctors', doctorSchema);
module.exports = Doctors;