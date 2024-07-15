const mongoose = require('mongoose');
const Doctors = require('./../Model/doctorModel');
const apiFeatures=require('./../utils/apiFeatures')
const { findByIdAndUpdate, findByIdAndDelete } = require('../Model/userModel');
exports.createDoctor = async (req, res, next) => {
    try {
        const doctor = await Doctors.create(req.body);
        if (!doctor) {
            return res.status(400).json({
                status: 'error',
                message: 'Unable to create doctor'
            });
        }
        res.status(201).json({
            status: 'success',
            message: 'Doctor created successfully',
            data: {
                doctor
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

exports.updateDoctor = async (req, res, next) => {
    try {
        const doctor = await Doctors.findByIdAndUpdate(req.params.id, req.body);
        if (!doctor) {
            return res.status(404).json({
                status: 'error',
                message: 'Doctor not found'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Doctor updated successfully',
            data: {
                doctor
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

exports.deleteDoctor = async (req, res, next) => {
    try {
        // Determine the ID to use for the deletion
        const doctorId = req.params.id || req.body.id;

        if (!doctorId) {
            return res.status(400).json({
                status: 'error',
                message: 'Doctor ID not provided'
            });
        }

        // Attempt to find and delete the doctor by ID
        const doctor = await Doctors.findByIdAndDelete(doctorId);
        if (!doctor) {
            return res.status(404).json({
                status: 'error',
                message: 'Doctor not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Doctor deleted successfully'
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

exports.getDoctor = async (req, res, next) => {
    try {
        const doctorId = req.params.id || req.body.id;
        
        if (!doctorId) {
            return res.status(400).json({
                status: 'error',
                message: 'Doctor ID is required'
            });
        }

        const doctor = await Doctors.findById(doctorId).populate('reviews').populate('bookings');
        
        if (!doctor) {
            return res.status(404).json({
                status: 'error',
                message: 'Doctor not found'
            });
        }

        return res.status(200).json({
            status: 'success',
            data: {
                doctor,
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: err.message
        });
    }
};

exports.getAllDoctors = async (req, res, next) => {
    try {
        const features=new apiFeatures(Doctors.find(),req.query).sort().filter().limitFields().paginate()
        const doctors=await features.query;
        console.log(doctors)
        res.status(200).json({
            status: 'success',
            data: {
                doctors
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
//-134.34,90.324
//distance/center/:latlang/unit/:unit
exports.getDoctorsWithin = async (req, res, next) => {
    try {
        let { distance, latlang, unit } = req.params;
        console.log(latlang)
        if (!latlang) {
            return res.status(400).json({
                status: 'failed',
                message: 'Latitude and longitude are required'
            });
        }
        const latlangArr = latlang.split(',');
        const lat=latlangArr[0]
        const lang=latlangArr[1]
        if (!lat || !lang || isNaN(lat) || isNaN(lang)) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid latitude or longitude'
            });
        }

        let radius = unit === 'mi' ? distance / 3950 : distance / 6378;

        const doctors = await Doctors.find({
            sittingLocations: { $geoWithin: { $centerSphere: [[lat * 1, lang * 1], radius] } }
        });

        if (!doctors || doctors.length === 0) {
            return res.status(404).json({
                status: 'failed',
                message: 'Unable to find doctors nearby'
            });
        }

        res.status(200).json({
            status: 'success',
            numresults:doctors.length,
            data: { doctors }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};
exports.getDistances=async(req,res,next)=>{
    const {latlang}=req.params;
    const latlangArr=latlang.split(',')
    const lat=latlangArr[0]
    const lang=latlangArr[1]
    console.log(lat,lang)
        try{
        const distances=await Doctors.aggregate([
            {
                $geoNear:{
                    near:{type:"Point",coordinates:[lat*1,lang*1]},
                    distanceField:"distance"
                },
                
            },
            {
                $addFields:{
                    distanceInKm:{$divide:["$distance",1000]}
                }
            },
    ])
    res.status(200).json({
        status:'success',
        data:{distances}
    })
    }catch(err){
        console.log(err)
        res.status(500).json({
            status:'failed',
            message:'Internal server error'
        })
    }
}