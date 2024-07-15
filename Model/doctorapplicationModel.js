const mongoose = require('mongoose');

const registerDoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Doctor must have a name'],
        minLength: [3, 'Doctor name should not be less than 3 characters'],
        maxLength: [25, 'Doctor name should not be greater than 25 characters']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'user must have email '],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
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
    }
})
const registerDoctorModel=new mongoose.model('registerDoctor',registerDoctorSchema);
module.exports=registerDoctorModel