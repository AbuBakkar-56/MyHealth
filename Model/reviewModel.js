const mongoose = require('mongoose');
const Doctors = require('./../Model/doctorModel')
const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true,
        maxLength: 100
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    doctor: {
        type: mongoose.Schema.ObjectId,
        ref: "Doctors"
    }
})
// reviewSchema.index({user:1,doctor:1},{unique:true})

reviewSchema.pre('find', function (next) {
    this.populate({
        path: 'user',
        select: 'name email'
    })
    next()
})
//calculating avg ratings on doctor
reviewSchema.statics.CalclAvgRatings = async function (doctorId) {
    try {
        const stats = await this.aggregate([
            {
                $match: { doctor: doctorId }
            },
            {
                $group: {
                    _id: "$doctor",
                    nRatings: { $sum: 1 },
                    avgRatings: { $avg: "$rating" }
                }
            },
        ]);
        if (stats.length > 0) {
            await Doctors.findByIdAndUpdate(doctorId, {
                ratingQuantity: stats[0].nRatings,
                ratingsAvg: stats[0].avgRatings
            });
        } else {
            await Doctors.findByIdAndUpdate(doctorId, {
                ratingQuantity: 0,
                ratingsAvg: 4.5
            });
        }
    } catch (error) {
        console.error("Error updating doctor ratings:", error);
    }
};
reviewSchema.post('save', async function () {
    try {
        await this.constructor.CalclAvgRatings(this.doctor);
    } catch (error) {
        console.error("Error updating doctor ratings:", error);
    }
});

const review = mongoose.model('review', reviewSchema);
module.exports = review;